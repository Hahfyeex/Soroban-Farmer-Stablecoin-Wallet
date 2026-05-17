import { SorobanRpc, Networks, TransactionBuilder, BASE_FEE } from '@stellar/stellar-sdk';

export const rpc = new SorobanRpc.Server(
  process.env.STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org'
);

export const networkPassphrase =
  process.env.NETWORK_PASSPHRASE || Networks.TESTNET;

export const contracts = {
  wallet: process.env.WALLET_CONTRACT_ID,
  savings: process.env.SAVINGS_CONTRACT_ID,
  cooperative: process.env.COOPERATIVE_CONTRACT_ID,
  escrow: process.env.ESCROW_CONTRACT_ID,
};

/**
 * Build a base transaction for a given source account.
 */
export async function buildTx(sourcePublicKey) {
  const account = await rpc.getAccount(sourcePublicKey);
  return new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase,
  });
}
