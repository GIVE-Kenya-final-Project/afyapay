#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    contracttype,
    symbol_short,
    Address,
    Env,
};

#[derive(Clone)]
#[contracttype]
pub struct SettlementRecord {

    pub token_id: u64,

    pub claim_id: u64,

    pub payer: Address,   // insurer

    pub payee: Address,   // token owner

    pub amount: i128,

    pub settled_at: u64,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {

    Settlement(u64),   // token_id → record

    Settled(u64),      // token_id → bool
}

#[contract]
pub struct ClaimSettlementContract;

#[contractimpl]
impl ClaimSettlementContract {

    // SETTLE CLAIM
    pub fn settle_claim(
        env: Env,
        token_id: u64,
        claim_id: u64,
        payer: Address,
        payee: Address,
        amount: i128,
    ) {

        // AUTH CHECK: only payer (insurer) can trigger settlement
        payer.require_auth();

        // prevent double settlement
        if env.storage()
            .persistent()
            .has(&DataKey::Settled(token_id))
        {
            panic!("Claim already settled");
        }

        let record = SettlementRecord {

            token_id,
            claim_id,
            payer: payer.clone(),
            payee: payee.clone(),
            amount,
            settled_at: env.ledger().timestamp(),
        };

        env.storage()
            .persistent()
            .set(&DataKey::Settlement(token_id), &record);

        env.storage()
            .persistent()
            .set(&DataKey::Settled(token_id), &true);

        env.events().publish(
            (symbol_short!("SETTLE"), token_id),
            amount,
        );
    }

    // GET SETTLEMENT
    pub fn get_settlement(
        env: Env,
        token_id: u64,
    ) -> SettlementRecord {

        env.storage()
            .persistent()
            .get(&DataKey::Settlement(token_id))
            .unwrap()
    }

    // CHECK STATUS
    pub fn is_settled(
        env: Env,
        token_id: u64,
    ) -> bool {

        env.storage()
            .persistent()
            .get(&DataKey::Settled(token_id))
            .unwrap_or(false)
    }
}
#[cfg(test)]
mod test;