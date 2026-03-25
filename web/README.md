# Al-Amal Center Storefront

This folder contains the customer-facing Next.js storefront for Al-Amal Center.

## Setup

1. Copy `.env.local.example` to `.env.local`.
2. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the same Supabase project used by the mobile app and admin panel.

## Run locally

```bash
cd web
npm install
npm run dev
```

## Useful scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint
