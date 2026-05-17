# Soroban Farmer Stablecoin Wallet

A blockchain-powered financial platform built on Stellar/Soroban for African smallholder farmers.

## Features
- Stablecoin savings wallet
- Produce payment system
- Agricultural savings plans
- Cooperative group wallets
- Smart contract escrow
- Offline-friendly mobile experience

## Stack
- **Contracts**: Rust + Soroban SDK
- **Frontend**: React + Vite (mobile-first)
- **Backend**: Node.js + Express

## Getting Started

### Prerequisites
- Rust + `soroban-cli`
- Node.js 18+

### Contracts
```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/farmer_wallet.wasm --network testnet
```

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
