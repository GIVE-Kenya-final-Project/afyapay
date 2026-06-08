# AfyaPay Backend Architecture

## Backend Structure

```bash id="m7y4pq"
backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── stellar.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── claimController.js
│   │   ├── tokenController.js
│   │   └── settlementController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── claimRoutes.js
│   │   ├── tokenRoutes.js
│   │   └── settlementRoutes.js
│   │
│   ├── services/
│   │   ├── stellarService.js
│   │   ├── claimService.js
│   │   ├── tokenService.js
│   │   └── settlementService.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# Backend Overview

The AfyaPay backend is built using:

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **PostgreSQL**
* **Stellar SDK**
* **Soroban Smart Contracts**

The backend acts as the bridge between the frontend application, database, and Stellar blockchain smart contracts.

---

# API Endpoints

## Authentication Routes

```bash id="d6v10j"
/api/auth/register
/api/auth/login
```

---

## Patient & Invoice Routes

```bash id="7drrz5"
/api/patients
/api/invoices
```

---

## Claim Routes

```bash id="w4nl6r"
/api/claims
/api/claims/:id
/api/claims/:id/approve
/api/claims/:id/reject
```

---

## Token Routes

```bash id="z7m9pt"
/api/tokens
/api/tokens/:id
```

---

## Marketplace Routes

```bash id="b3mcex"
/api/marketplace
/api/marketplace/purchase
```

---

## Settlement Routes

```bash id="jv1s4q"
/api/settlements
```

---

# Backend Workflow

The backend integrates business logic with Stellar smart contracts to automate healthcare claim financing.

## Process Flow

```text id="n6g7yx"
Hospital creates invoice
        ↓
Hospital submits claim
        ↓
Backend calls create_claim()
        ↓
Insurer approves claim
        ↓
Backend calls tokenize_claim()
        ↓
Investor purchases token
        ↓
Backend calls transfer_claim_token()
        ↓
Insurer settles claim
        ↓
Backend calls settle_claim()
        ↓
Investor receives payment
```

---

# Core Backend Responsibilities

## Authentication & Authorization

* User registration and login
* JWT authentication
* Role-based access control

## Claim Management

* Create and manage healthcare insurance claims
* Approve or reject claims
* Synchronize claims with blockchain contracts

## Tokenization

* Tokenize approved claims
* Track token ownership
* Enable token transfers

## Marketplace Operations

* Allow investors to purchase tokenized claims
* Record investment transactions

## Settlement Processing

* Handle insurer settlement operations
* Trigger blockchain settlement smart contracts
* Update payment records

---

# Stellar Blockchain Integration

The backend communicates with Soroban smart contracts using the Stellar SDK.

Main smart contract interactions include:

* `create_claim()`
* `approve_claim()`
* `reject_claim()`
* `tokenize_claim()`
* `transfer_claim_token()`
* `settle_claim()`

---

# Environment Variables

PORT=5000

DATABASE_URL="postgresql://neondb_owner:npg_jGbiupc25QmW@ep-noisy-shadow-ap6oobxy-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

JWT_SECRET=afyapay-super-secret-key

STELLAR_NETWORK=testnet

STELLAR_NETWORK=testnet

hospital-address=SB5FEKCBBFL2E6QBSW37KM6DOQ3F2DTRIYW7NGAQZJMRK2RQHEZGFN4C
insurer-address=SAH4DX6CBCJEQWD3KFYGYJRXVR56ZRPED6X35QVMKQNS2BHMRK3BVGPK
investor-address=SCHEJIRE7W3CAHOAGVNUWNMBTUDSKLPZT537ZAAR6HNPSEZKIHVRZSVU
```

---

# Developer Information

**Backend Developer:** Brenda Karimi
**Project:** AfyaPay
**Blockchain Network:** Stellar Testnet
