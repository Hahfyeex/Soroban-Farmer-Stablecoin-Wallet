#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, Symbol, symbol_short};

#[contracttype]
#[derive(Clone)]
pub struct WalletInfo {
    pub owner: Address,
    pub balance: i128,
    pub total_received: i128,
    pub total_sent: i128,
}

const WALLET: Symbol = symbol_short!("WALLET");

#[contract]
pub struct FarmerWalletContract;

#[contractimpl]
impl FarmerWalletContract {
    /// Initialize wallet for a farmer
    pub fn initialize(env: Env, owner: Address) {
        owner.require_auth();
        let info = WalletInfo {
            owner: owner.clone(),
            balance: 0,
            total_received: 0,
            total_sent: 0,
        };
        env.storage().instance().set(&WALLET, &info);
    }

    /// Deposit stablecoins into the wallet
    pub fn deposit(env: Env, from: Address, token: Address, amount: i128) {
        from.require_auth();
        assert!(amount > 0, "Amount must be positive");

        let token_client = token::Client::new(&env, &token);
        let contract_addr = env.current_contract_address();
        token_client.transfer(&from, &contract_addr, &amount);

        let mut info: WalletInfo = env.storage().instance().get(&WALLET).unwrap();
        info.balance += amount;
        info.total_received += amount;
        env.storage().instance().set(&WALLET, &info);

        env.events().publish((symbol_short!("deposit"),), (from, amount));
    }

    /// Withdraw stablecoins from the wallet
    pub fn withdraw(env: Env, token: Address, amount: i128) {
        let info: WalletInfo = env.storage().instance().get(&WALLET).unwrap();
        info.owner.require_auth();
        assert!(amount > 0 && amount <= info.balance, "Invalid amount");

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&env.current_contract_address(), &info.owner, &amount);

        let mut info: WalletInfo = env.storage().instance().get(&WALLET).unwrap();
        info.balance -= amount;
        info.total_sent += amount;
        env.storage().instance().set(&WALLET, &info);

        env.events().publish((symbol_short!("withdraw"),), amount);
    }

    /// Send payment to another address (produce payment)
    pub fn send(env: Env, to: Address, token: Address, amount: i128) {
        let info: WalletInfo = env.storage().instance().get(&WALLET).unwrap();
        info.owner.require_auth();
        assert!(amount > 0 && amount <= info.balance, "Invalid amount");

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&env.current_contract_address(), &to, &amount);

        let mut info: WalletInfo = env.storage().instance().get(&WALLET).unwrap();
        info.balance -= amount;
        info.total_sent += amount;
        env.storage().instance().set(&WALLET, &info);

        env.events().publish((symbol_short!("send"),), (to, amount));
    }

    /// Get wallet info
    pub fn get_info(env: Env) -> WalletInfo {
        env.storage().instance().get(&WALLET).unwrap()
    }
}
