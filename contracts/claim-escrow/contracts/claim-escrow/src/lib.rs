#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    contracttype,
    Address,
    Env,
};

#[derive(Clone)]
#[contracttype]
pub enum DataKey {

    Balance(Address),      // insurer balance

    Locked(u64),           // claim_id locked amount
}

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {

    // INSURER DEPOSIT FUNDS
    pub fn deposit(
        env: Env,
        insurer: Address,
        amount: i128,
    ) {

        insurer.require_auth();

        let mut balance: i128 = env.storage()
            .persistent()
            .get(&DataKey::Balance(insurer.clone()))
            .unwrap_or(0);

        balance += amount;

        env.storage()
            .persistent()
            .set(&DataKey::Balance(insurer), &balance);
    }

    // LOCK FUNDS FOR CLAIM
    pub fn lock_funds(
        env: Env,
        insurer: Address,
        claim_id: u64,
        amount: i128,
    ) {

        insurer.require_auth();

        let mut balance: i128 = env.storage()
            .persistent()
            .get(&DataKey::Balance(insurer.clone()))
            .unwrap_or(0);

        if balance < amount {
            panic!("Insufficient funds");
        }

        balance -= amount;

        env.storage()
            .persistent()
            .set(&DataKey::Balance(insurer.clone()), &balance);

        env.storage()
            .persistent()
            .set(&DataKey::Locked(claim_id), &amount);
    }

    // RELEASE PAYMENT
    pub fn release(
        env: Env,
        claim_id: u64,
        payee: Address,
    ) -> i128 {

        payee.require_auth();

        let amount: i128 = env.storage()
            .persistent()
            .get(&DataKey::Locked(claim_id))
            .unwrap_or(0);

        if amount == 0 {
            panic!("No locked funds");
        }

        env.storage()
            .persistent()
            .remove(&DataKey::Locked(claim_id));

        amount
    }

    // GET LOCKED AMOUNT
    pub fn get_locked(
        env: Env,
        claim_id: u64,
    ) -> i128 {

        env.storage()
            .persistent()
            .get(&DataKey::Locked(claim_id))
            .unwrap_or(0)
    }
}
#[cfg(test)]
mod test;