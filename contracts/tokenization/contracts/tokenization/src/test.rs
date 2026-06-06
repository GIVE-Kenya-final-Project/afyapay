extern crate std;

use soroban_sdk::{
    testutils::Address as _,
    Address,
    Env,
};

use crate::{
    ClaimTokenizationContract,
    ClaimTokenizationContractClient,
};

#[test]
fn test_tokenize_claim() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(
        ClaimTokenizationContract,
        (),
    );

    let client = ClaimTokenizationContractClient::new(
        &env,
        &contract_id,
    );

    let owner = Address::generate(&env);

    let token_id = client.tokenize_claim(
        &1,
        &owner,
    );

    assert_eq!(token_id, 1);

    let token = client.get_token(&token_id);

    assert_eq!(token.token_id, 1);
    assert_eq!(token.claim_id, 1);
    assert_eq!(token.owner, owner);
}

#[test]
fn test_get_token_owner() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(
        ClaimTokenizationContract,
        (),
    );

    let client = ClaimTokenizationContractClient::new(
        &env,
        &contract_id,
    );

    let owner = Address::generate(&env);

    let token_id = client.tokenize_claim(
        &1,
        &owner,
    );

    let retrieved_owner =
        client.get_token_owner(&token_id);

    assert_eq!(
        retrieved_owner,
        owner
    );
}

#[test]
fn test_transfer_token() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(
        ClaimTokenizationContract,
        (),
    );

    let client = ClaimTokenizationContractClient::new(
        &env,
        &contract_id,
    );

    let original_owner =
        Address::generate(&env);

    let new_owner =
        Address::generate(&env);

    let token_id = client.tokenize_claim(
        &1,
        &original_owner,
    );

    client.transfer_token(
        &token_id,
        &new_owner,
    );

    let owner =
        client.get_token_owner(&token_id);

    assert_eq!(
        owner,
        new_owner
    );
}

#[test]
fn test_multiple_tokens() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register(
        ClaimTokenizationContract,
        (),
    );

    let client = ClaimTokenizationContractClient::new(
        &env,
        &contract_id,
    );

    let owner1 =
        Address::generate(&env);

    let owner2 =
        Address::generate(&env);

    let token1 =
        client.tokenize_claim(
            &101,
            &owner1,
        );

    let token2 =
        client.tokenize_claim(
            &102,
            &owner2,
        );

    assert_eq!(token1, 1);
    assert_eq!(token2, 2);

    let t1 = client.get_token(&token1);
    let t2 = client.get_token(&token2);

    assert_eq!(t1.claim_id, 101);
    assert_eq!(t2.claim_id, 102);
}