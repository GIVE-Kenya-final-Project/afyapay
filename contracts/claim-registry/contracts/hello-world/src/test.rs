#![cfg(test)]

use super::*;

use soroban_sdk::{
    testutils::Address as _,
    Address,
    Env,
};

#[test]
fn test_create_claim() {

    let env = Env::default();

    env.mock_all_auths();

    let contract_id =
        env.register(ClaimRegistryContract, ());

    let client =
        ClaimRegistryContractClient::new(
            &env,
            &contract_id,
        );

    let hospital =
        Address::generate(&env);

    let insurer =
        Address::generate(&env);

    let claim_id = client.create_claim(
        &hospital,
        &insurer,
        &1000,
    );

    let claim = client.get_claim(&claim_id);

    assert_eq!(claim.claim_amount, 1000);

}
#[test]
fn test_get_claim() {

    let env = Env::default();

    env.mock_all_auths();

    let contract_id =
        env.register(ClaimRegistryContract, ());

    let client =
        ClaimRegistryContractClient::new(
            &env,
            &contract_id,
        );

    let hospital =
        Address::generate(&env);

    let insurer =
        Address::generate(&env);

    let claim_id = client.create_claim(
        &hospital,
        &insurer,
        &5000,
    );

    let claim = client.get_claim(&claim_id);

    assert_eq!(claim.claim_id, claim_id);
    assert_eq!(claim.claim_amount, 5000);

    match claim.status {
        ClaimStatus::Pending => (),
        _ => panic!("Claim should be pending"),
    }
}
#[test]
fn test_approve_claim() {

    let env = Env::default();

    env.mock_all_auths();

    let contract_id =
        env.register(ClaimRegistryContract, ());

    let client =
        ClaimRegistryContractClient::new(
            &env,
            &contract_id,
        );

    let hospital =
        Address::generate(&env);

    let insurer =
        Address::generate(&env);

    let claim_id = client.create_claim(
        &hospital,
        &insurer,
        &7000,
    );

    client.approve_claim(&claim_id);

    let claim = client.get_claim(&claim_id);

    match claim.status {
        ClaimStatus::Approved => (),
        _ => panic!("Claim should be approved"),
    }
}
#[test]
fn test_reject_claim() {

    let env = Env::default();

    env.mock_all_auths();

    let contract_id =
        env.register(ClaimRegistryContract, ());

    let client =
        ClaimRegistryContractClient::new(
            &env,
            &contract_id,
        );

    let hospital =
        Address::generate(&env);

    let insurer =
        Address::generate(&env);

    let claim_id = client.create_claim(
        &hospital,
        &insurer,
        &9000,
    );

    client.reject_claim(&claim_id);

    let claim = client.get_claim(&claim_id);

    match claim.status {
        ClaimStatus::Rejected => (),
        _ => panic!("Claim should be rejected"),
    }
}
#[test]
fn test_update_claim_status() {

    let env = Env::default();

    env.mock_all_auths();

    let contract_id =
        env.register(ClaimRegistryContract, ());

    let client =
        ClaimRegistryContractClient::new(
            &env,
            &contract_id,
        );

    let hospital =
        Address::generate(&env);

    let insurer =
        Address::generate(&env);

    let claim_id = client.create_claim(
        &hospital,
        &insurer,
        &12000,
    );

    client.update_claim_status(
        &claim_id,
        &ClaimStatus::Approved,
    );

    let claim = client.get_claim(&claim_id);

    match claim.status {
        ClaimStatus::Approved => (),
        _ => panic!("Claim status update failed"),
    }
}