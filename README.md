This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The site is a static export (`output: "export"`) served from Cloudflare
Workers. There is no CI: **deploys only happen when you run the command**, on
whatever branch you happen to be on. Pushing to `main` deploys nothing.

```bash
npm run whoami        # confirm which Cloudflare account you're logged into
npm run deploy:check  # build + dry run, uploads nothing
npm run deploy        # build + deploy for real
```

`wrangler.jsonc` pins `account_id` to the dedicated "Motion Vitality Pilates"
account. If the login can't reach that account the deploy fails rather than
falling back to another one — that check is deliberate, so don't remove it.

### Redirects

Old Wix URLs are mapped to their new homes in `public/_redirects`, which the
static export copies into `out/`. After deploying, verify every rule still
resolves:

```bash
npm run verify:redirects https://mvp-website.motion-vitality-pilates.workers.dev
```

A rule only fires if no real page occupies that path — a page always wins over
a redirect. That's why retired routes (`/classes`, `/about/polestar`) have
their `page.tsx` renamed to `page.tsx.disabled` rather than left in place.
