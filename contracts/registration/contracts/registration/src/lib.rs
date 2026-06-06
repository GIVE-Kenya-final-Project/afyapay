#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, Address, Env, String, Map,
};

#[derive(Clone)]
#[contracttype]
pub enum Role {
    Hospital,
    Insurer,
    Investor,
}

#[derive(Clone)]
#[contracttype]
pub struct User {
    pub role: Role,
    pub name: String,
    pub is_active: bool,
}

const ADMIN: &str = "ADMIN";

#[contract]
pub struct RegistrationContract;

#[contractimpl]
impl RegistrationContract {
    /// Initialize admin (first-time setup)
    pub fn init(env: Env, admin: Address) {
        if env.storage().instance().has(&ADMIN) {
            panic!("already initialized");
        }
        env.storage().instance().set(&ADMIN, &admin);
    }

    fn get_admin(env: &Env) -> Address {
        env.storage()
            .instance()
            .get::<_, Address>(&ADMIN)
            .expect("admin not set")
    }

    fn assert_admin(env: &Env, caller: &Address) {
        let admin = Self::get_admin(env);
        if caller != &admin {
            panic!("unauthorized");
        }
    }

    /// Register a new user with role
    pub fn register_user(
        env: Env,
        caller: Address,
        user: Address,
        role: Role,
        name: String,
    ) {
        Self::assert_admin(&env, &caller);

        let key = user.clone();

        if env.storage().persistent().has(&key) {
            panic!("user already registered");
        }

        let data = User {
            role,
            name,
            is_active: true,
        };

        env.storage().persistent().set(&key, &data);
    }

    /// Get user info
    pub fn get_user(env: Env, user: Address) -> User {
        env.storage()
            .persistent()
            .get(&user)
            .expect("user not found")
    }

    /// Check role
    pub fn get_role(env: Env, user: Address) -> Role {
        Self::get_user(env, user).role
    }

    /// Deactivate user (admin only)
    pub fn deactivate_user(env: Env, caller: Address, user: Address) {
        Self::assert_admin(&env, &caller);

        let mut data: User = env
            .storage()
            .persistent()
            .get(&user)
            .expect("user not found");

        data.is_active = false;
        env.storage().persistent().set(&user, &data);
    }
}