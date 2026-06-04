#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short,
    Address, Env,
};

#[derive(Clone)]
#[contracttype]
pub enum ClaimStatus {
    Pending,
    Approved,
    Rejected,
}

#[derive(Clone)]
#[contracttype]
pub struct Claim {
    pub claim_id: u64,
    pub hospital_wallet: Address,
    pub insurer_wallet: Address,
    pub claim_amount: i128,
    pub status: ClaimStatus,
    pub timestamp: u64,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Claim(u64),
    ClaimCount,
}

#[contract]
pub struct ClaimRegistryContract;

#[contractimpl]
impl ClaimRegistryContract {

    // Create Claim
    pub fn create_claim(
        env: Env,
        hospital_wallet: Address,
        insurer_wallet: Address,
        claim_amount: i128,
    ) -> u64 {

        hospital_wallet.require_auth();

        let mut count: u64 = env
            .storage()
            .persistent()
            .get(&DataKey::ClaimCount)
            .unwrap_or(0);

        count += 1;

        let ledger_timestamp = env.ledger().timestamp();

        let claim = Claim {
            claim_id: count,
            hospital_wallet,
            insurer_wallet,
            claim_amount,
            status: ClaimStatus::Pending,
            timestamp: ledger_timestamp,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Claim(count), &claim);

        env.storage()
            .persistent()
            .set(&DataKey::ClaimCount, &count);

        env.events().publish(
            (symbol_short!("CREATED"), count),
            claim_amount,
        );

        count
    }

    // Retrieve Claim
    pub fn get_claim(env: Env, claim_id: u64) -> Claim {

        env.storage()
            .persistent()
            .get(&DataKey::Claim(claim_id))
            .unwrap()
    }

    // Approve Claim
    pub fn approve_claim(
        env: Env,
        claim_id: u64,
    ) {

        let mut claim: Claim = env.storage()
            .persistent()
            .get(&DataKey::Claim(claim_id))
            .unwrap();

        claim.insurer_wallet.require_auth();

        claim.status = ClaimStatus::Approved;

        env.storage()
            .persistent()
            .set(&DataKey::Claim(claim_id), &claim);

        env.events().publish(
            (symbol_short!("APPROVED"), claim_id),
            true,
        );
    }

    // Reject Claim
    pub fn reject_claim(
        env: Env,
        claim_id: u64,
    ) {

        let mut claim: Claim = env.storage()
            .persistent()
            .get(&DataKey::Claim(claim_id))
            .unwrap();

        claim.insurer_wallet.require_auth();

        claim.status = ClaimStatus::Rejected;

        env.storage()
            .persistent()
            .set(&DataKey::Claim(claim_id), &claim);

        env.events().publish(
            (symbol_short!("REJECTED"), claim_id),
            true,
        );
    }

    // Update Claim Status
    pub fn update_claim_status(
        env: Env,
        claim_id: u64,
        status: ClaimStatus,
    ) {

        let mut claim: Claim = env.storage()
            .persistent()
            .get(&DataKey::Claim(claim_id))
            .unwrap();

        claim.insurer_wallet.require_auth();

        claim.status = status;

        env.storage()
            .persistent()
            .set(&DataKey::Claim(claim_id), &claim);

        env.events().publish(
            (symbol_short!("UPDATED"), claim_id),
            true,
        );
    }
}
mod test;