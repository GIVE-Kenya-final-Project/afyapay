#![cfg(test)]

use super::*;

use soroban_sdk::{
    testutils::Address as _,
    Address,
    Env,
};
use crate::{EscrowContract, SettlementContract};
#[test]
fn test_full_settlement() {

    let env = Env::default();
    env.mock_all_auths();

    let escrow_id =
        env.register(EscrowContract, ());

    let escrow =
        EscrowContractClient::new(&env, &escrow_id);

    let settlement_id =
        env.register(SettlementContract, ());

    let settlement =
        ClaimSettlementContractClient::new(
            &env,
            &settlement_id,
        );

    let insurer = Address::generate(&env);
    let payee = Address::generate(&env);

    // fund escrow
    escrow.deposit(&insurer, &10_000);

    escrow.lock_funds(&insurer, &1, &5_000);

    // simulate settlement logic
    let amount = escrow.release(&1, &payee);

    assert_eq!(amount, 5_000);
}
#[test]
fn test_partial_settlement_flow() {

    let env = Env::default();
    env.mock_all_auths();

    let escrow_id =
        env.register(EscrowContract, ());

    let escrow =
        EscrowContractClient::new(&env, &escrow_id);

    let insurer = Address::generate(&env);
    let payee = Address::generate(&env);

    escrow.deposit(&insurer, &10_000);

    // first partial payout
    escrow.lock_funds(&insurer, &1, &3_000);

    let first = escrow.release(&1, &payee);
    assert_eq!(first, 3_000);

    // second partial payout
    escrow.lock_funds(&insurer, &2, &2_000);

    let second = escrow.release(&2, &payee);
    assert_eq!(second, 2_000);
}
#[test]
#[should_panic]
fn test_settlement_without_funds() {

    let env = Env::default();
    env.mock_all_auths();

    let escrow_id =
        env.register(EscrowContract, ());

    let escrow =
        EscrowContractClient::new(&env, &escrow_id);

    let payee = Address::generate(&env);

    // no deposit → should fail
    escrow.release(&1, &payee);
}