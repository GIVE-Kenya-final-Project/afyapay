#![cfg(test)]

use super::*;

use soroban_sdk::{
    testutils::Address as _,
    Address,
    Env,
};

#[test]
fn test_settlement_flow() {

    let env = Env::default();
    env.mock_all_auths();

    let contract_id =
        env.register(ClaimSettlementContract, ());

    let client =
        ClaimSettlementContractClient::new(&env, &contract_id);

    let payer = Address::generate(&env);
    let payee = Address::generate(&env);

    client.settle_claim(
        &1,
        &100,
        &payer,
        &payee,
        &5000,
    );

    let record =
        client.get_settlement(&1);

    assert_eq!(record.amount, 5000);
    assert_eq!(record.token_id, 1);

    let status =
        client.is_settled(&1);

    assert!(status);
}