import { SorobanRpc, Networks, TransactionBuilder, BASE_FEE, StrKey } from '@stellar/stellar-sdk';

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

export function isValidAddress(address) {
  return typeof address === 'string' && StrKey.isValidEd25519PublicKey(address);
}

/**
 * Submit a signed transaction, rejecting anything that isn't a
 * non-empty XDR string before it reaches the RPC layer.
 */
export async function submitSignedTx(signedXdr) {
  if (typeof signedXdr !== 'string' || signedXdr.trim().length === 0) {
    const err = new Error('signedXdr is required');
    err.status = 400;
    throw err;
  }
  return rpc.sendTransaction(signedXdr);
}
