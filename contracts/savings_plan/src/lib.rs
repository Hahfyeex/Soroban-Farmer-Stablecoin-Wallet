#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, token, vec,
    Address, Env, String, Symbol, Vec, symbol_short,
};

#[contracttype]
#[derive(Clone)]
pub enum SavingsCategory {
    Seeds,
    Fertilizer,
    Equipment,
    Livestock,
    Seasonal,
    Other,
}

#[contracttype]
#[derive(Clone)]
pub struct SavingsPlan {
    pub owner: Address,
    pub name: String,
    pub category: SavingsCategory,
    pub target_amount: i128,
    pub current_amount: i128,
    pub deadline: u64,
    pub is_complete: bool,
}

#[contracttype]
pub enum DataKey {
    Plan(u32),
    PlanCount,
}

#[contract]
pub struct SavingsPlanContract;

#[contractimpl]
impl SavingsPlanContract {
    /// Create a new savings plan
    pub fn create_plan(
        env: Env,
        owner: Address,
        name: String,
        category: SavingsCategory,
        target_amount: i128,
        deadline: u64,
    ) -> u32 {
        owner.require_auth();
        assert!(target_amount > 0, "Target must be positive");

        let count: u32 = env.storage().instance().get(&DataKey::PlanCount).unwrap_or(0);
        let plan_id = count + 1;

        let plan = SavingsPlan {
            owner,
            name,
            category,
            target_amount,
            current_amount: 0,
            deadline,
            is_complete: false,
        };

        env.storage().instance().set(&DataKey::Plan(plan_id), &plan);
        env.storage().instance().set(&DataKey::PlanCount, &plan_id);
        plan_id
    }

    /// Contribute to a savings plan
    pub fn contribute(env: Env, plan_id: u32, from: Address, token: Address, amount: i128) {
        from.require_auth();
        assert!(amount > 0, "Amount must be positive");

        let mut plan: SavingsPlan = env.storage().instance().get(&DataKey::Plan(plan_id)).unwrap();
        assert!(!plan.is_complete, "Plan already complete");

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&from, &env.current_contract_address(), &amount);

        plan.current_amount += amount;
        if plan.current_amount >= plan.target_amount {
            plan.is_complete = true;
            env.events().publish((symbol_short!("goal_met"),), plan_id);
        }

        env.storage().instance().set(&DataKey::Plan(plan_id), &plan);
        env.events().publish((symbol_short!("contrib"),), (plan_id, amount));
    }

    /// Withdraw from a completed or owner-initiated plan
    pub fn withdraw(env: Env, plan_id: u32, token: Address, amount: i128) {
        let mut plan: SavingsPlan = env.storage().instance().get(&DataKey::Plan(plan_id)).unwrap();
        plan.owner.require_auth();
        assert!(amount <= plan.current_amount, "Insufficient savings");

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&env.current_contract_address(), &plan.owner, &amount);

        plan.current_amount -= amount;
        env.storage().instance().set(&DataKey::Plan(plan_id), &plan);
    }

    /// Get plan details
    pub fn get_plan(env: Env, plan_id: u32) -> SavingsPlan {
        env.storage().instance().get(&DataKey::Plan(plan_id)).unwrap()
    }
}
