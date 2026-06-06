#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Env};

fn create_env() -> Env {
    Env::default()
}

#[test]
fn test_init_and_register() {
    let env = create_env();

    let admin = Address::generate(&env);
    let hospital = Address::generate(&env);

    RegistrationContract::init(env.clone(), admin.clone());

    RegistrationContract::register_user(
        env.clone(),
        admin.clone(),
        hospital.clone(),
        Role::Hospital,
        soroban_sdk::String::from_str(&env, "City Hospital"),
    );

    let user = RegistrationContract::get_user(env.clone(), hospital.clone());

    assert!(matches!(user.role, Role::Hospital));
    assert_eq!(user.name, soroban_sdk::String::from_str(&env, "City Hospital"));
    assert!(user.is_active);
}

#[test]
#[should_panic(expected = "unauthorized")]
fn test_only_admin_can_register() {
    let env = create_env();

    let admin = Address::generate(&env);
    let attacker = Address::generate(&env);
    let hospital = Address::generate(&env);

    RegistrationContract::init(env.clone(), admin.clone());

    RegistrationContract::register_user(
        env.clone(),
        attacker, // not admin
        hospital,
        Role::Hospital,
        soroban_sdk::String::from_str(&env, "Fake Hospital"),
    );
}

#[test]
fn test_deactivate_user() {
    let env = create_env();

    let admin = Address::generate(&env);
    let insurer = Address::generate(&env);

    RegistrationContract::init(env.clone(), admin.clone());

    RegistrationContract::register_user(
        env.clone(),
        admin.clone(),
        insurer.clone(),
        Role::Insurer,
        soroban_sdk::String::from_str(&env, "National Insurance"),
    );

    RegistrationContract::deactivate_user(env.clone(), admin.clone(), insurer.clone());

    let user = RegistrationContract::get_user(env.clone(), insurer.clone());

    assert!(!user.is_active);
}