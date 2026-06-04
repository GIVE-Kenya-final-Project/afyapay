# AfyaPay

## Overview

AfyaPay is a healthcare claim financing platform built on the Stellar Soroban blockchain.

The platform enables hospitals to submit insurance claims, insurers to review and approve claims, and investors to provide liquidity by purchasing tokenized claims. Once an insurer settles a claim, payment is automatically routed to the current token holder.

This creates a transparent, auditable, and efficient financing ecosystem for healthcare providers.

---

## Problem Statement

Healthcare providers often experience delays in receiving payments from insurance companies. These delays can affect cash flow and limit the ability of hospitals to deliver services efficiently.

AfyaPay addresses this challenge by:

- Digitizing the insurance claims process
- Tokenizing approved claims
- Allowing investors to finance claims
- Automating settlement using smart contracts
- Providing full transparency through blockchain records

---

## Solution Workflow

```text
Hospital Creates Invoice
        ↓
Hospital Submits Claim
        ↓
Insurer Reviews Claim
        ↓
Claim Approved
        ↓
Claim Token Created
        ↓
Investor Purchases Token
        ↓
Hospital Receives Liquidity
        ↓
Insurer Settles Claim
        ↓
Investor Receives Settlement
```

---

## Key Features

### Hospital Portal

- Patient Management
- Invoice Creation
- Claim Submission
- Claim Tracking
- Tokenized Claim Monitoring

### Insurer Portal

- Claims Review
- Claim Approval
- Claim Rejection
- Settlement Processing
- Settlement Monitoring

### Investor Portal

- Marketplace for Approved Claims
- Purchase Claim Tokens
- Portfolio Management
- Settlement Tracking

### Blockchain Transparency Dashboard

- Claim IDs
- Token IDs
- Settlement Records
- Ownership History
- Transaction Hashes
- Wallet Addresses

---

## System Architecture

```text
┌─────────────────────┐
│      Frontend       │
│   React + Vite TS   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│      Backend        │
│ Express + Prisma    │
│ + PostgreSQL        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Stellar Integration │
│     Services        │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Soroban Contracts   │
│ Claim Registry      │
│ Tokenization        │
│ Settlement          │
└─────────────────────┘
```

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication

### Blockchain

- Stellar
- Soroban Smart Contracts
- Stellar SDK

---

## Repository Structure

```text
afyapay/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── README.md
│
├── backend/
│   ├── src/
│   ├── prisma/
│   └── README.md
│
├── contracts/
│   ├── claim-registry/
│   ├── claim-tokenization/
│   ├── settlement/
│   └── README.md
│
├── docs/
│
├── diagrams/
│
├── .github/
│
└── README.md
```

---

## Core Smart Contracts

### Claim Registry Contract

Responsible for:

- Creating claims
- Updating claim status
- Approving claims
- Rejecting claims
- Retrieving claim information

### Claim Tokenization Contract

Responsible for:

- Tokenizing approved claims
- Assigning ownership
- Transferring ownership
- Tracking ownership history

### Settlement Contract

Responsible for:

- Settlement verification
- Payment execution
- Settlement recording
- Settlement tracking

---

## User Roles

### Hospital

- Register patients
- Create invoices
- Submit claims
- Track claim status
- List approved claim assets

### Insurer

- Review claims
- Approve claims
- Reject claims
- Execute settlements

### Investor

- Browse available claim assets
- Purchase claim tokens
- Track investments
- Receive settlements

### Administrator

- Platform management
- User oversight
- Monitoring and auditing

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd afyapay
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Smart Contract Setup

```bash
cd contracts
# Follow contracts README
```

Refer to the README files inside each project folder for detailed setup instructions.

---

## Development Workflow

Create a feature branch:

```bash
git checkout -b feature/<feature-name>
```

Commit changes:

```bash
git add .
git commit -m "feat: description"
```

Push branch:

```bash
git push origin feature/<feature-name>
```

Open a Pull Request for review.

---

## Project Roadmap

### Phase 1

- Project setup
- Database design
- Stellar environment setup

### Phase 2

- Claim Registry Contract
- Tokenization Contract
- Settlement Contract

### Phase 3

- Backend APIs
- Authentication
- Stellar Integration Services

### Phase 4

- Hospital Dashboard
- Insurer Dashboard
- Investor Dashboard

### Phase 5

- Marketplace Integration
- Settlement Automation
- Blockchain Explorer

### Phase 6

- End-to-End Testing
- Deployment
- Production Launch

---

## Expected Outcome

AfyaPay will provide:

- Faster healthcare claim financing
- Improved hospital liquidity
- Transparent claim ownership
- Automated settlements
- Full blockchain auditability

---

## Contributors

- Frontend Team
- Backend Team
- Smart Contracts Team
- Stellar Integration Team
- Project Management Team