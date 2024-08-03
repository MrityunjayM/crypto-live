Clone Repo: 

```bash
git clone https://github.com/MrityunjayM/crypto-live.git
```
## Getting Started

First, install the packages:

```bash
npm install
```

Then, run development server:

> Note: copy content of `.env.sample` to `.env` or `.env.local` and set it's values first

```bash
npm run dev
```

Or if you have docker installed (with compose plugin) simply run:

```bash
docker compose up -d --build
```

Open browser nad paste http://localhost:3000,

> Note: Development server runs on port `3000` by default it can be changed by setting env PORT={any port number}

**This app is built using [CoinGeko Public API](https://docs.coingecko.com/v3.0.1/reference/coins-markets).**
