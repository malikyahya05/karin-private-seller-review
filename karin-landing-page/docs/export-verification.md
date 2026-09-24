# Portable export verification

Prepared 24 September 2026.

- Standard Next.js 16.3.4 production build and TypeScript validation passed.
- Production server returned the landing page, privacy page, robots file, hero photograph and local font successfully.
- Malformed JSON and invalid phone submissions returned HTTP 400.
- A valid submission with an unconfigured backend returned HTTP 503 without reporting success.
- A cross-origin submission returned HTTP 403.
- The portable request-origin check handles the host and port used by the browser during local development.
- PostgreSQL persistence and external notification delivery need an integration test against the owner’s configured database and CRM before public traffic. No external database, email service or CRM was connected in these export checks.
- The original Site’s visual QA and D1 save test remain documented separately in qa-notes.md; that is not a PostgreSQL integration test.
- The archive includes source, local assets, package-lock.json, environment example, database setup and original-source backup. It excludes installed dependencies, build output, Git history, runtime credentials and stored leads.
- The published private Site was not changed by this export.
