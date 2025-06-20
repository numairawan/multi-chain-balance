# Multi-Chain Balance

A simple JavaScript library to fetch Ethereum wallet balances across multiple chains.

## Installation

```bash
npm install multi-chain-balance
```

## Usage

```javascript
import MultiChainBalance from 'multi-chain-balance';

const balanceChecker = new MultiChainBalance();

// Get balances across all supported chains
const allBalances = await balanceChecker.getBalance('0x123...');

// Get balance for specific chains
const specificBalances = await balanceChecker.getBalance('0x123...', [1, 137]); // ETH Mainnet and Polygon

// Get balance for a single chain
const polygonBalance = await balanceChecker.getBalanceForChain('0x123...', 137);
```

## API Reference

### `getBalance(address, chains?)`
Fetches balances for an Ethereum address across multiple chains.

### `getBalanceForChain(address, chainId)`
Fetches balance for an Ethereum address on a specific chain.

## License

MIT 