# Karin Kilburn — Private Seller Review landing page

A complete, editable Next.js project for GitHub, Vercel or a Node.js host. The design, copy, imagery, local fonts, responsive layouts, lead form, privacy page and SEO metadata are included.

## What to upload to GitHub

Unzip this archive. Upload **the contents of `karin-landing-page/`** to your repository root, so `package.json` and `app/` are at the top level. Include `.gitignore` and `.env.example`. Do not upload `node_modules`, `.next`, `.env.local`, database credentials or real lead data.

`reference/original-sites-source.zip` preserves the original published Cloudflare/Sites source at commit `b5bdb3a8a2eba84e32124f8a77bb895dd0cdbf4c`. It is a reference backup, not the Vercel project. The project at the archive root is the portable version to deploy.

## Run locally

Use Node.js 22.13 or later and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On Windows, copy `.env.example` to `.env.local` using your file manager. Open http://localhost:3000. You can view and edit the design without a database. The form reports an error until its database is configured; it never pretends an unsaved inquiry succeeded.

```sh
npm run typecheck
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository and select the **Next.js** framework preset. Use the repository root containing `package.json`.
3. Use Node.js 22.x or newer. The included `vercel.json` selects `npm run build`; leave the output directory at the Next.js default.
4. Add the environment variables below in Vercel Project Settings. Add secrets to the appropriate Production/Preview environments, never to source control.
5. Connect a PostgreSQL database, run the included schema once, and deploy.
6. Set `NEXT_PUBLIC_SITE_URL` to the final custom domain or Vercel URL and redeploy. Test a clearly identified inquiry and confirm it appears in the database and the configured CRM.

The portable project has no ChatGPT sign-in dependency. **A Vercel deployment can be publicly accessible.** Use Vercel Deployment Protection while reviewing if required. `noindex` prevents intended search indexing; it is not access control.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Full canonical origin, such as `https://your-domain.com`, with no trailing slash. Set before building. |
| `NEXT_PUBLIC_SITE_INDEXABLE` | Keep `false` during review. Set `true` only on the final public production deployment after the launch checks below. Set before building. |
| `DATABASE_URL` | Required for inquiries. Your PostgreSQL connection string; use the provider's pooled URL for serverless hosting. Preserve its required TLS parameters. |
| `RATE_LIMIT_SALT` | Required for inquiries; random server-side secret, at least 32 characters, used to hash daily network identifiers. |
| `LEAD_WEBHOOK_URL` | Optional HTTPS CRM or notification endpoint. Without it, leads save but no email/text notification is sent. |
| `LEAD_WEBHOOK_SECRET` | Optional bearer token sent only to that webhook. |

Generate a rate-limit secret locally:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`NEXT_PUBLIC_` values are embedded during the build. Redeploy after changing them. Never put a database password or webhook secret in a `NEXT_PUBLIC_` variable.

## Database setup and lead handling

Create a PostgreSQL database through your preferred provider, including a provider connected through Vercel Marketplace. Set `DATABASE_URL` in `.env.local`, then run:

```sh
npm run db:setup
```

Alternatively, run `db/schema.sql` in your provider's SQL editor. The setup is idempotent and does not insert sample leads. For Supabase or similar services, use a private server database connection and do not expose this table through a public client API.

The portable API uses PostgreSQL instead of the original Cloudflare D1 binding. It preserves required field validation, the hidden spam field, campaign attribution, request-ID deduplication, database-backed rate limiting, and save-before-notify behavior. SQL values are parameterized. Concurrent submissions for the same daily IP hash are serialized in a transaction.

There is no public endpoint for reading leads. Inspect `seller_reviews` through your database provider's authorized console. `created_at` is Unix time in milliseconds. `notification_status` is `not_configured`, `pending`, `sent` or `failed`. A saved lead is retained even if its webhook fails. There is no background retry worker; review pending/failed notifications and retry through your CRM as needed, using the inquiry UUID to deduplicate downstream.

On Vercel, rate limiting uses its trusted forwarded-IP header. On another Node.js host, the conservative default groups requests under one shared identifier; configure a trusted reverse proxy and adjust the documented IP selection in `app/api/review/route.ts` before sending public traffic.

No existing leads, database credentials or original hosting access tokens are included in this archive. The original private Site and this exported app use separate databases.

## Edit the website

| Change | File |
| --- | --- |
| Landing-page copy, sections, testimonials | `app/page.tsx` |
| Colors, typography, spacing and responsive layouts | `app/globals.css` |
| Contact links and service configuration | `lib/site.ts` |
| Form fields and success/error messages | `components/site/lead-form.tsx` |
| Form validation | `lib/review-schema.ts` |
| Submission storage and webhook | `app/api/review/route.ts` |
| Database connection and table | `db/index.ts`, `db/schema.sql` |
| Page title, description and social metadata | `app/layout.tsx` |
| Robots and sitemap | `app/robots.ts`, `app/sitemap.ts` |
| Photography and fonts | `public/images/`, `public/fonts/` |
| Privacy copy | `app/privacy/page.tsx` |

`npm run format` formats the source for editing. No proprietary editor is needed.

## Before public advertising

- Connect and test the database and Karin's chosen CRM/inbox notification.
- Obtain reuse permission for the photography or replace it with approved licensed assets. The hero is a real illustrative Southlake property, not Karin's listing. Source and rights notes are in `docs/asset-ledger.md`. Including a photo in this archive does not grant a reuse license.
- Replace the clearly marked temporary testimonial spaces with approved exact quotes, or remove that subsection.
- Replace the general TREC IABS information link with Karin's completed current brokerage disclosure.
- Review the privacy copy against the services actually connected.
- Set the final canonical URL and enable indexing only for the final public production page.
- Connect conversion tracking to a successful saved request, not a button click. `seller_review_submitted` is emitted without personal data. No analytics vendor is installed by default.

The real portrait and staging image are sourced references pending final approval. Do not imply that the staging example is a $1M+ sale. Fonts and third-party packages retain their respective licenses; source/provenance notes are included.

## Research and verification

- `docs/research-and-handoff.md`: original funnel research and launch recommendations. Its D1 notes describe the original Site; this README describes the PostgreSQL export.
- `docs/asset-ledger.md`: image and font provenance.
- `docs/qa-notes.md`: original visual/form checks.
- `docs/export-verification.md`: checks performed on this portable export.

Official references used for this export:

- https://nextjs.org/docs/app/getting-started/installation
- https://nextjs.org/docs/app/getting-started/deploying
- https://nextjs.org/docs/app/guides/environment-variables
- https://vercel.com/docs/frameworks/full-stack/nextjs
- https://vercel.com/docs/postgres
- https://vercel.com/docs/headers/request-headers
- https://github.com/porsager/postgres
