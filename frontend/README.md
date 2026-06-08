# AfyaPay Frontend

Next.js frontend for the AfyaPay blockchain-powered healthcare claims financing platform.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The frontend connects to the backend at `http://localhost:5000` (set `NEXT_PUBLIC_API_URL` to override).

## Pages

- `/` — Landing page
- `/register` — Register with Stellar wallet, name, and role (Hospital / Insurer / Investor)
- `/login` — Login with Stellar wallet
- `/hospital` — Submit and track insurance claims
- `/insurer` — Review, approve, or reject pending claims
- `/investor` — Purchase tokenized claim assets
- `/explorer` — View all blockchain claim activity

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- TypeScript

## Developer

**Frontend Developer:** Elissa NGEZAHAYO — elissasimba@gmail.com
