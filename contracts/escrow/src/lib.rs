#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, token, Address, Env, Symbol, symbol_short};

#[contracttype]
#[derive(Clone, PartialEq)]
pub enum EscrowStatus {
    Pending,
    Released,
    Refunded,
    Disputed,
}

#[contracttype]
#[derive(Clone)]
pub struct EscrowDeal {
    pub buyer: Address,
    pub farmer: Address,
    pub token: Address,
    pub amount: i128,
    pub status: EscrowStatus,
    pub deadline: u64,
}

#[contracttype]
pub enum DataKey {
    Deal(u32),
    DealCount,
}

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    /// Buyer creates an escrow for produce payment
    pub fn create_escrow(
        env: Env,
        buyer: Address,
        farmer: Address,
        token: Address,
        amount: i128,
        deadline: u64,
    ) -> u32 {
        buyer.require_auth();
        assert!(amount > 0, "Amount must be positive");

        let token_client = token::Client::new(&env, &token);
        token_client.transfer(&buyer, &env.current_contract_address(), &amount);

        let count: u32 = env.storage().instance().get(&DataKey::DealCount).unwrap_or(0);
        let deal_id = count + 1;

        let deal = EscrowDeal {
            buyer: buyer.clone(),
            farmer,
            token,
            amount,
            status: EscrowStatus::Pending,
            deadline,
        };

        env.storage().instance().set(&DataKey::Deal(deal_id), &deal);
        env.storage().instance().set(&DataKey::DealCount, &deal_id);

        env.events().publish((symbol_short!("created"),), (deal_id, buyer, amount));
        deal_id
    }

    /// Buyer releases payment to farmer after produce delivery
    pub fn release(env: Env, deal_id: u32) {
        let mut deal: EscrowDeal = env.storage().instance().get(&DataKey::Deal(deal_id)).unwrap();
        deal.buyer.require_auth();
        assert!(deal.status == EscrowStatus::Pending, "Deal not pending");

        let token_client = token::Client::new(&env, &deal.token);
        token_client.transfer(&env.current_contract_address(), &deal.farmer, &deal.amount);

        deal.status = EscrowStatus::Released;
        env.storage().instance().set(&DataKey::Deal(deal_id), &deal);

        env.events().publish((symbol_short!("released"),), deal_id);
    }

    /// Buyer refunds escrow if deadline passed without delivery
    pub fn refund(env: Env, deal_id: u32) {
        let mut deal: EscrowDeal = env.storage().instance().get(&DataKey::Deal(deal_id)).unwrap();
        deal.buyer.require_auth();
        assert!(deal.status == EscrowStatus::Pending, "Deal not pending");
        assert!(env.ledger().timestamp() > deal.deadline, "Deadline not reached");

        let token_client = token::Client::new(&env, &deal.token);
        token_client.transfer(&env.current_contract_address(), &deal.buyer, &deal.amount);

        deal.status = EscrowStatus::Refunded;
        env.storage().instance().set(&DataKey::Deal(deal_id), &deal);

        env.events().publish((symbol_short!("refunded"),), deal_id);
    }

    /// Get escrow deal details
    pub fn get_deal(env: Env, deal_id: u32) -> EscrowDeal {
        env.storage().instance().get(&DataKey::Deal(deal_id)).unwrap()
    }
}
