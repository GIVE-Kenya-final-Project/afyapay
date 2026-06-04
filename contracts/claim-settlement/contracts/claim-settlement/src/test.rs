extern crate std;

use soroban_sdk::{
    testutils::Address as _,
    Address,
    Env,
};

use crate::{
    ClaimSettlementContract,
    ClaimSettlementContractClient,
};

#[test]
fn test_settle_claim() {
    let env = Env::default();

    let contract_id = env.register(ClaimSettlementContract, ());
    let client = ClaimSettlementContractClient::new(
        &env,
        &contract_id,
    );

    let payer = Address::generate(&env);
    let payee = Address::generate(&env);

    client.settle_claim(
        &1,
        &100,
        &payer,
        &payee,
        &5000,
    );

    let record = client.get_settlement(&1);

    assert_eq!(record.token_id, 1);
    assert_eq!(record.claim_id, 100);
    assert_eq!(record.amount, 5000);
    assert_eq!(record.payer, payer);
    assert_eq!(record.payee, payee);

    let settled = client.is_settled(&1);

    assert!(settled);
}

#[test]
fn test_is_settled_before_settlement() {
    let env = Env::default();

    let contract_id = env.register(ClaimSettlementContract, ());
    let client = ClaimSettlementContractClient::new(
        &env,
        &contract_id,
    );

    assert_eq!(
        client.is_settled(&1),
        false
    );
}

#[test]
#[should_panic(expected = "claim already settled")]
fn test_prevent_double_settlement() {
    let env = Env::default();

    let contract_id = env.register(ClaimSettlementContract, ());
    let client = ClaimSettlementContractClient::new(
        &env,
        &contract_id,
    );

    let payer = Address::generate(&env);
    let payee = Address::generate(&env);

    client.settle_claim(
        &1,
        &100,
        &payer,
        &payee,
        &5000,
    );

    client.settle_claim(
        &1,
        &100,
        &payer,
        &payee,
        &5000,
    );
}

#[test]
#[should_panic(expected = "invalid amount")]
fn test_invalid_amount() {
    let env = Env::default();

    let contract_id = env.register(ClaimSettlementContract, ());
    let client = ClaimSettlementContractClient::new(
        &env,
        &contract_id,
    );

    let payer = Address::generate(&env);
    let payee = Address::generate(&env);

    client.settle_claim(
        &1,
        &100,
        &payer,
        &payee,
        &0,
    );
}