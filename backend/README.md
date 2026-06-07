My structure
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
The Endpoints

/api/auth/register
/api/auth/login

/api/patients
/api/invoices

/api/claims
/api/claims/:id
/api/claims/:id/approve
/api/claims/:id/reject

/api/tokens
/api/tokens/:id

/api/marketplace
/api/marketplace/purchase

/api/settlements

backend flow 
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

the registration endpoint -http://localhost:5000/api/auth/register with the body; {
  "wallet":"address of user to be registered",
  "role":"Hospital",
  "name":"Nairobi Hospital"
} returns; {
    "success": true,
    "data": ""
}
the get api - http://localhost:5000/api/auth/users/adress of user registered returns: {
    "success": true,
    "data": ""
}