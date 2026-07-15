#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    token, Address, Env, Map, Symbol, symbol_short,
};

#[contracttype]
#[derive(Clone)]
pub struct CoopInfo {
    pub admin: Address,
    pub total_pool: i128,
    pub member_count: u32,
}

#[contracttype]
pub enum DataKey {
    Info,
    Member(Address),
    Contribution(Address),
}

#[contract]
pub struct CooperativeContract;

#[contractimpl]
impl CooperativeContract {
    /// Initialize cooperative with an admin
    pub fn initialize(env: Env, admin: Address) {
        assert!(!env.storage().instance().has(&DataKey::Info), "Already initialized");
        admin.require_auth();
        let info = CoopInfo {
            admin,
            total_pool: 0,
            member_count: 0,
        };
        env.storage().instance().set(&DataKey::Info, &info);
    }

    /// Add a member to the cooperative
    pub fn add_member(env: Env, member: Address) {
        let info: CoopInfo = env.storage().instance().get(&DataKey::Info).unwrap();
        info.admin.require_auth();

        let is_member: bool = env.storage().instance().get(&DataKey::Member(member.clone())).unwrap_or(false);
        assert!(!is_member, "Already a member");

        env.storage().instance().set(&DataKey::Member(member.clone()), &true);
        env.storage().instance().set(&DataKey::Contribution(member.clone()), &0i128);

        let mut info: CoopInfo = env.storage().instance().get(&DataKey::Info).unwrap();
        info.member_count += 1;
        env.storage().instance().set(&DataKey::Info, &info);

        env.events().publish((symbol_short!("member"),), member);
    }

    /// Member contributes to the pool
    pub fn contribute(env: Env, member: Address, token: Address, amount: i128) {
        member.require_auth();
        assert!(amount > 0, "Amount must be positive");

        let is_member: bool = env.storage().instance().get(&DataKey::Member(member.clone())).unwrap_or(false);
        assert!(is_member, "Not a member");

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&member, &env.current_contract_address(), &amount);

        let prev: i128 = env.storage().instance().get(&DataKey::Contribution(member.clone())).unwrap_or(0);
        env.storage().instance().set(&DataKey::Contribution(member.clone()), &(prev + amount));

        let mut info: CoopInfo = env.storage().instance().get(&DataKey::Info).unwrap();
        info.total_pool += amount;
        env.storage().instance().set(&DataKey::Info, &info);

        env.events().publish((symbol_short!("contrib"),), (member, amount));
    }

    /// Admin distributes funds to a member
    pub fn distribute(env: Env, to: Address, token: Address, amount: i128) {
        let info: CoopInfo = env.storage().instance().get(&DataKey::Info).unwrap();
        info.admin.require_auth();
        assert!(amount <= info.total_pool, "Insufficient pool");

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&env.current_contract_address(), &to, &amount);

        let mut info: CoopInfo = env.storage().instance().get(&DataKey::Info).unwrap();
        info.total_pool -= amount;
        env.storage().instance().set(&DataKey::Info, &info);

        env.events().publish((symbol_short!("distrib"),), (to, amount));
    }

    /// Get member contribution
    pub fn get_contribution(env: Env, member: Address) -> i128 {
        env.storage().instance().get(&DataKey::Contribution(member)).unwrap_or(0)
    }

    /// Get cooperative info
    pub fn get_info(env: Env) -> CoopInfo {
        env.storage().instance().get(&DataKey::Info).unwrap()
    }
}
