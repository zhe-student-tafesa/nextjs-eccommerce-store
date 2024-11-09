Ecommerce site from an admin dashboard, to payment processing, to account management, and so much more. 
Use Next.js, Stripe, Tailwind, Prisma, and TypeScript.

![1-tech](https://github.com/user-attachments/assets/17bef1b3-9ee3-462f-979f-6fbd7696f405)

![2-authentication](https://github.com/user-attachments/assets/572155fe-8326-4307-b549-28925b9e45b9)

![3-product-CRUD](https://github.com/user-attachments/assets/202f7055-a721-4622-b5ec-890b2a4a281a)

![4-admin-add-product](https://github.com/user-attachments/assets/7acecf51-97ee-49e6-83c0-687831c8e891)

![5-customer-view-products](https://github.com/user-attachments/assets/415e88f6-e9bb-49a8-9e68-8d19cff5866b)

![6-Stripe-purchase](https://github.com/user-attachments/assets/39e49152-791f-4c8b-88bd-591c1510750d)

![7-Stripe-cli-webhook](https://github.com/user-attachments/assets/9b6f243f-ba88-4c1f-aec4-13660717b8f2)

![8-Stripe-dashboard](https://github.com/user-attachments/assets/b7e8cede-a763-4fcb-9e31-2c96afc7afe7)

![09-after-success-auto-send-receipt](https://github.com/user-attachments/assets/ffe1b258-afc8-4662-8cbd-1783e7ba1505)

![9-after-success-auto-update-users-and-orders-database](https://github.com/user-attachments/assets/99ba304d-bc60-4138-bfef-c0d4cb1988f7)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## usefull link
https://ui.shadcn.com/docs/components/card
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add table 
npx shadcn@latest add label 
npx shadcn@latest add input
npx shadcn@latest add textarea
npm i zod: form validation
npx shadcn@latest add dropdown-menu
npm i @stripe/react-stripe-js

## wait for a web hook from Stripe
## then create a customer and an order.
## Your pairing code is: eases-agile-redeem-proven
## The Stripe CLI is configured for your account with account id acct_1P8IW3RuHai09Ek9
## C:\diploma\software>stripe listen --forward-to  localhost:3000/webhooks/stripe
> Ready! You are using Stripe API Version [2024-04-10]. Your webhook signing secret is in env.STRIPE_WEBHOOK_SECRET

# add scripts in package.json
# so we can start up a server that allows us to view our emails, 3001, And copy .env to ./node_modules/react-email
# in new terminal run: npm run email
# Unix: cp .env ./node_modules/react-email && email dev --dir src/email --port 3001
# Windows: copy .env .\\node_modules\\react-email\\ && email dev --dir src/email --port 3001

# card: 4242 4242 4242 4242
# email: frank.zhang.sa.au@gmail.com

https://github.com/stripe/stripe-cli/releases/tag/v1.21.11
STRIPE CLI:
1. cmd, stripe.exe
2. stripe login
3.  stripe listen --forward-to localhost:3000/webhooks/stripe
