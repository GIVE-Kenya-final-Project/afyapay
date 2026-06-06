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
pub struct ClaimToken {
    pub token_id: u64,
    pub claim_id: u64,
    pub owner: Address,
    pub created_at: u64,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Token(u64),
    TokenCount,
}

#[contract]
pub struct ClaimTokenizationContract;

#[contractimpl]
impl ClaimTokenizationContract {

    // Create token from approved claim
    pub fn tokenize_claim(
        env: Env,
        claim_id: u64,
        owner: Address,
    ) -> u64 {

        owner.require_auth();

        let mut count: u64 = env
            .storage()
            .persistent()
            .get(&DataKey::TokenCount)
            .unwrap_or(0);

        count += 1;

        let token = ClaimToken {
            token_id: count,
            claim_id,
            owner: owner.clone(),
            created_at: env.ledger().timestamp(),
        };

        env.storage()
            .persistent()
            .set(&DataKey::Token(count), &token);

        env.storage()
            .persistent()
            .set(&DataKey::TokenCount, &count);

        env.events().publish(
            (symbol_short!("TOKENIZE"), count),
            claim_id,
        );

        count
    }

    // Get token
    pub fn get_token(
        env: Env,
        token_id: u64,
    ) -> ClaimToken {

        env.storage()
            .persistent()
            .get(&DataKey::Token(token_id))
            .unwrap()
    }

    // Transfer ownership
    pub fn transfer_token(
        env: Env,
        token_id: u64,
        new_owner: Address,
    ) {

        let mut token: ClaimToken = env
            .storage()
            .persistent()
            .get(&DataKey::Token(token_id))
            .unwrap();

        token.owner.require_auth();

        token.owner = new_owner.clone();

        env.storage()
            .persistent()
            .set(&DataKey::Token(token_id), &token);

        env.events().publish(
            (symbol_short!("TRANSFER"), token_id),
            new_owner,
        );
    }

    // Current owner
    pub fn get_token_owner(
        env: Env,
        token_id: u64,
    ) -> Address {

        let token: ClaimToken = env
            .storage()
            .persistent()
            .get(&DataKey::Token(token_id))
            .unwrap();

        token.owner
    }
}

#[cfg(test)]
mod test;