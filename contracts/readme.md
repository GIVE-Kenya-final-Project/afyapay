# AfyaPay Smart Contracts Deployment & Usage Guide

## Overview

AfyaPay is a blockchain-powered healthcare financing platform built on Stellar and Soroban smart contracts. The platform enables hospitals to tokenize approved insurance claims and access immediate liquidity through investors.

---

# Smart Contract Deployment

## Deploy Contract

```bash
stellar contract deploy \
  --source hospital \
  --network testnet \
  --wasm target/wasm32v1-none/release/<contract-name>.wasm
```

---

# Accounts Used

The following funded accounts were used during development:

* `hospital`
* `insurer`
* `investor`

> Note: All contracts were deployed using the `hospital` account.

---

# Deployed Contracts

The deployed smart contracts are:

* `claim-registry`
* `claim-settlement`
* `tokenization`
* `registration`

---

# Claim Registry Contract

## Create Claim

```bash
stellar contract invoke \
  --id <registry-id> \
  --source hospital \
  --network testnet \
  -- create_claim \
  --hospital_wallet GA123... \
  --insurer_wallet GB456... \
  --claim_amount 1000
```

---

## Get Claim

```bash
stellar contract invoke \
  --id <registry-id> \
  --source hospital \
  --network testnet \
  -- get_claim \
  --claim_id 2
```

---

## Approve Claim

```bash
stellar contract invoke \
  --id <registry-id> \
  --source hospital \
  --network testnet \
  -- approve_claim \
  --claim_id 2
```

---

## Reject Claim

```bash
stellar contract invoke \
  --id <registry-id> \
  --source hospital \
  --network testnet \
  -- reject_claim \
  --claim_id 3
```

---

# Tokenization Contract

## Tokenize Approved Claim

```bash
stellar contract invoke \
  --id <tokenization-id> \
  --source hospital \
  --network testnet \
  -- tokenize_claim \
  --claim_id 1 \
  --owner hospital
```

---

## Confirm Token Creation

```bash
stellar contract invoke \
  --id <tokenization-id> \
  --source hospital \
  --network testnet \
  -- get_token \
  --token_id 1
```

---

## Transfer Token to New Owner

```bash
stellar contract invoke \
  --id <tokenization-id> \
  --source hospital \
  --network testnet \
  -- transfer_token \
  --token_id 1 \
  --new_owner GINVESTOR123...
```

---

# Claim Settlement Contract

## Settle Claim

```bash
stellar contract invoke \
  --id <settlement-id> \
  --source insurer \
  --network testnet \
  -- settle_claim \
  --token_id 1 \
  --claim_id 1 \
  --payer <insurer-address> \
  --payee <investor-address> \
  --amount 1000
```

---

## Get Settlement Details

```bash
stellar contract invoke \
  --id <settlement-id> \
  --source hospital \
  --network testnet \
  -- get_settlement \
  --token_id 1
```

---

# Registration Contract

The registration contract manages platform participants.

## Supported Roles

* `Hospital`
* `Insurer`
* `Investor`

---

## Register User

```bash
stellar contract invoke \
  --id <contract-id> \
  --source <admin-keypair> \
  --network testnet \
  -- register_user \
  --caller <admin-address> \
  --user <wallet-address> \
  --role Hospital \
  --name "City Hospital"
```

---

# Developer Information

**Contract Developer:** Brenda Karimi
**Email:** [karimibrenda012@gmail.com](mailto:karimibrenda012@gmail.com)

CLAIM_REGISTRY_ID=CATPMOQE37253R4VOMXGSLEPIF7UDBVZFP5RPVHO6WJZBTOCC37KH2RS
TOKENIZATION_ID=CBG7E7DCPMA4UCZTPBEH7LTIBAV5JDX3HUXXJJT3AEZFAV2GF5SK5354
SETTLEMENT_ID=CBFW5MEROWWTFLY2FP6I7M7PRWIY56COW2HAQYORZFU3QVQOTSCQZI3G
REGISTRATION_ID:CDFX5H3FDAJTP5EHD4KLHYXXI4VVGOIXR66K6L4YEUHVWKUW5BQQ3RUF