# Karin Kilburn — Private Seller Review landing page

A complete, editable Next.js project for GitHub, Vercel or a Node.js host. The design, copy, imagery, local fonts, responsive layouts, lead form, privacy page and SEO metadata are included.

## What to upload to GitHub

For the Formspree update package, replace the matching files in your existing `karin-landing-page/` folder. Keep the folder structure and upload `package.json` and `package-lock.json` together. This is an update package, not a standalone website; retain the other project files already in GitHub.

Vercel's Root Directory must be the directory containing `package.json`. For the nested repository layout used here, that is `karin-landing-page`. If you have already moved the app to the repository root, upload the replacement files there instead. Do not create a second nested `karin-landing-page/karin-landing-page/` folder. Do not upload `node_modules`, `.next`, `.env.local`, database credentials or real lead data.

`reference/original-sites-source.zip` preserves the original published Cloudflare/Sites source at commit `b5bdb3a8a2eba84e32124f8a77bb895dd0cdbf4c`. It is a reference backup, not the Vercel project. The project at the archive root is the portable version to deploy.

## Run locally

Use Node.js 22.13 or later and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On Windows, copy `.env.example` to `.env.local` using your file manager if you need to configure the site's URL or indexing. Open http://localhost:3000. The seller-review form sends directly to Formspree and does not require a database or a secret API key.

```sh
npm run typecheck
npm run build
npm start
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository and select the **Next.js** framework preset. Use the repository root containing `package.json`.
3. Use Node.js 22.x or newer. The included `vercel.json` selects `npm run build`; leave the output directory at the Next.js default.
4. Keep the Formspree form `mbgdbwkk` active and configure its Email workflow recipient in the Formspree dashboard. No Vercel form-related environment variables are needed for this integration.
5. Deploy. Vercel installs the dependency recorded in `package.json` and `package-lock.json` during its normal build.
6. Set `NEXT_PUBLIC_SITE_URL` to the final custom domain or Vercel URL and redeploy. Submit a clearly identified test inquiry yourself and confirm both the Formspree submission and the notification email.

The portable project has no ChatGPT sign-in dependency. **A Vercel deployment can be publicly accessible.** Use Vercel Deployment Protection while reviewing if required. `noindex` prevents intended search indexing; it is not access control.

## Environment variables

| Variable                                  | Purpose                                                                                                                                   |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                    | Full canonical origin, such as `https://your-domain.com`, with no trailing slash. Set before building.                                    |
| `NEXT_PUBLIC_SITE_INDEXABLE`              | Keep `false` during review. Set `true` only on the final public production deployment after the launch checks below. Set before building. |
| `DATABASE_URL`, `RATE_LIMIT_SALT`         | Used only by the older, separate `/api/review` route. The current Formspree form does not call that route.                                |
| `LEAD_WEBHOOK_URL`, `LEAD_WEBHOOK_SECRET` | Used only by the older route's webhook. They do not control Formspree notifications.                                                      |

`NEXT_PUBLIC_` values are embedded during the build. Redeploy after changing them. Never put a database password or webhook secret in a `NEXT_PUBLIC_` variable.

## Formspree lead handling

The existing React form uses `@formspree/react` and submits to:

```text
https://formspree.io/f/mbgdbwkk
```

It sends name, phone, optional email, property address, estimated value, timeline and optional message. Unselected value/timeline fields use `Not sure` and `Just exploring`. An optional email is the visitor's address, not the notification recipient. A fixed subject identifies seller-review inquiries; `_gotcha` is the hidden spam field. Supported campaign parameters and Google click IDs are included when present in the page URL.

While submitting, the button is disabled and repeated submits are blocked. Provider errors remain visible with the entered details intact. The confirmation and `seller_review_submitted` event occur only when the SDK reports success; this is not proof of inbox delivery. The event contains no personal information. There is no automatic retry that could silently duplicate an inquiry.

The same form also has a standard HTML POST action. Without JavaScript, browser submission uses Formspree's hosted flow; the enhanced custom dropdowns and in-page confirmation require JavaScript. No separate chat widget, file upload or newsletter signup has been added.

### Change the recipient to Karin later

1. Link Karin's email address in the Formspree account and complete email verification.
2. Open this form's **Workflow → Email → Settings** and select her verified linked address.
3. Submit another clearly identified test and have Karin verify receipt.

Keeping form ID `mbgdbwkk` means no website code change is needed when changing that recipient. If you create a different form, update `FORMSPREE_FORM_ID` in `components/site/lead-form.tsx` and redeploy. Email delivery, spam settings, quotas and any domain restrictions are managed in Formspree. Enable only the workflow actions you actually want; this integration does not configure an autoresponse to the seller.

### Older database implementation

`app/api/review/route.ts`, `lib/review-schema.ts`, `db/` and the database setup script are retained for compatibility, but the current form does not use them. New Formspree inquiries are not copied into the older PostgreSQL database or sent to its webhook. Existing database records are unchanged. Instructions in older export documents about mandatory database setup apply to that older route only.

No existing leads, database credentials or original hosting access tokens are included in this archive. The original private Site and this exported app use separate databases.

## Edit the website

| Change                                                | File                                                     |
| ----------------------------------------------------- | -------------------------------------------------------- |
| Landing-page copy, sections, testimonials             | `app/page.tsx`                                           |
| Colors, typography, spacing and responsive layouts    | `app/globals.css`                                        |
| Contact links and service configuration               | `lib/site.ts`                                            |
| Form fields and success/error messages                | `components/site/lead-form.tsx`                          |
| Current form endpoint and validation                  | `components/site/lead-form.tsx`                          |
| Current inquiry inbox and notification recipient      | Formspree dashboard, form `mbgdbwkk`                     |
| Older API and database (not used by the current form) | `app/api/review/route.ts`, `db/`, `lib/review-schema.ts` |
| Page title, description and social metadata           | `app/layout.tsx`                                         |
| Robots and sitemap                                    | `app/robots.ts`, `app/sitemap.ts`                        |
| Photography and fonts                                 | `public/images/`, `public/fonts/`                        |
| Privacy copy                                          | `app/privacy/page.tsx`                                   |

`npm run format` formats the source for editing. No proprietary editor is needed.

## Before public advertising

- Confirm the Formspree form is active and its notification reaches Karin's chosen inbox.
- Obtain reuse permission for the photography or replace it with approved licensed assets. The hero is a real illustrative Southlake property, not Karin's listing. Source and rights notes are in `docs/asset-ledger.md`. Including a photo in this archive does not grant a reuse license.
- Replace the clearly marked temporary testimonial spaces with approved exact quotes, or remove that subsection.
- Replace the general TREC IABS information link with Karin's completed current brokerage disclosure.
- Review the privacy copy against the services actually connected.
- Set the final canonical URL and enable indexing only for the final public production page.
- Connect conversion tracking to a confirmed successful submission, not a button click. `seller_review_submitted` is emitted without personal data. No analytics vendor is installed by default.

The real portrait and staging image are sourced references pending final approval. Do not imply that the staging example is a $1M+ sale. Fonts and third-party packages retain their respective licenses; source/provenance notes are included.

## Research and verification

- `docs/research-and-handoff.md`: original funnel research and launch recommendations. Its D1 notes describe the original Site; this README describes the current Formspree integration.
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
- https://help.formspree.io/articles/working-with-react/the-formspree-react-library
- https://help.formspree.io/articles/building-your-form/special-fields
- https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering
- https://help.formspree.io/articles/form-and-project-settings/changing-a-form-email-address
