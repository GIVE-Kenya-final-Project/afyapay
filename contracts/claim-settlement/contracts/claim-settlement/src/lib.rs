#![no_std]

use soroban_sdk::{
    contract,
    contractimpl,
    Address,
    Env,
    symbol_short,
    Vec,
    IntoVal,
};

#[contract]
pub struct SettlementContract;

impl SettlementContract {

    pub fn settle_claim(
        env: Env,
        escrow: Address,
        token_id: u64,
        claim_id: u64,
        insurer: Address,
        payee: Address,
        amount: i128,
        is_final: bool,
    ) -> i128 {

        insurer.require_auth();

        let mut args = Vec::new(&env);
        args.push_back(claim_id.into_val(&env));
        args.push_back(payee.clone().into_val(&env));

        let released: i128 = env.invoke_contract::<i128>(
            &escrow,
            &symbol_short!("release"),
            args,
        );

        if released < amount {
            panic!("Insufficient escrow funds");
        }

        if is_final {
            env.storage().persistent().set(&claim_id, &true);
        }

        amount
    }
}
#[cfg(test)]
mod test;