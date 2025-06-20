class MultiChainBalance {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || 'http://multi-chain-balance.numairawan.com';
  }

  /**
   * Get balance for an Ethereum address across multiple chains
   * @param {string} address - Ethereum address to check balances for
   * @param {number[]} [chains] - Optional array of chain IDs to check. If not provided, checks all supported chains
   * @returns {Promise<{totalBalance: number, balances: Array<{chain: string, chainId: number, balance: string}>>}
   * @throws {Error} If the address is invalid or API request fails
   */
  async getBalance(address, chains = []) {
    if (!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
      throw new Error('Invalid Ethereum address');
    }

    const queryParams = new URLSearchParams({
      address: address,
    });

    if (chains.length > 0) {
      queryParams.append('chains', chains.join(','));
    }

    try {
      const response = await fetch(`${this.baseUrl}?${queryParams.toString()}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch balances');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch balances: ${error.message}`);
    }
  }

  /**
   * Get balance for an Ethereum address on a specific chain
   * @param {string} address - Ethereum address to check balance for
   * @param {number} chainId - Chain ID to check balance on
   * @returns {Promise<{chain: string, chainId: number, balance: string} | null>}
   * @throws {Error} If the address is invalid or API request fails
   */
  async getBalanceForChain(address, chainId) {
    const result = await this.getBalance(address, [chainId]);
    return result.balances[0] || null;
  }
}

// Export for CommonJS
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MultiChainBalance;
}

// Export for ES modules
export default MultiChainBalance; 