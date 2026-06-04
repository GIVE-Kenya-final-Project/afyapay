#![cfg(test)]

use super::*;

use soroban_sdk::{
    testutils::Address as _,
    Address,
    Env,
};

#[test]
fn test_deposit() {

    let env = Env::default();
    env.mock_all_auths();

    let contract_id =
        env.register(EscrowContract, ());

    let client =
        EscrowContractClient::new(&env, &contract_id);

    let insurer = Address::generate(&env);

    client.deposit(&insurer, &10_000);

    let locked = client.get_locked(&1);

    assert_eq!(locked, 0);
}
#[test]
fn test_lock_and_release() {

    let env = Env::default();
    env.mock_all_auths();

    let contract_id =
        env.register(EscrowContract, ());

    let client =
        EscrowContractClient::new(&env, &contract_id);

    let insurer = Address::generate(&env);
    let payee = Address::generate(&env);

    client.deposit(&insurer, &10_000);

    client.lock_funds(&insurer, &1, &5_000);

    let locked = client.get_locked(&1);

    assert_eq!(locked, 5_000);

    let released =
        client.release(&1, &payee);

    assert_eq!(released, 5_000);
}
#[test]
#[should_panic]
fn test_lock_insufficient_funds() {

    let env = Env::default();
    env.mock_all_auths();

    let contract_id =
        env.register(EscrowContract, ());

    let client =
        EscrowContractClient::new(&env, &contract_id);

    let insurer = Address::generate(&env);

    client.deposit(&insurer, &1_000);

    // should panic
    client.lock_funds(&insurer, &1, &5_000);
}