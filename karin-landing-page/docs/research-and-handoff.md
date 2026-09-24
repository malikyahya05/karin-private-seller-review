# Karin Kilburn — Private Seller Review

Prepared 23 September 2026. This is a private review version, not a public advertising destination.

## The funnel decision

Audience: homeowners considering selling a $1M+ home in Southlake and surrounding DFW luxury markets.

One offer: Private Home Value & Selling Strategy Review. Every primary CTA points to the same on-page form. Text Karin is the secondary action. The opening section identifies the location, property tier, review and next action. The immediate strategy strip makes the decision process visible: understand the property and competition, plan preparation, then consider pricing and next steps. Five review components give substance to that promise. The final section explains what the homeowner does next.

This is a design hypothesis to test, not a verified promise of improved conversion or search ranking.

## References studied

- Google Ads, Optimize your ads and landing pages: https://support.google.com/google-ads/answer/6238826/optimize-your-ads-and-landing-pages — supports close alignment between the ad, keyword and destination. Applied as consistent Southlake / $1M+ / private review messaging.
- Briggs Freeman Sotheby's seller page: https://www.briggsfreeman.com/sellers/ — presents a tailored marketing plan and property presentation. Applied as a specific review sequence, without using its network claims or performance claims.
- Compass Concierge: https://www.compass.com/concierge/ — presents preparation, before/after evidence, how it works and a direct inquiry. Applied as property examples and a tangible process; no financial offer, claims or statistics have been transferred to Karin.
- Allie Beth Allman marketing partners: https://www.alliebeth.com/Marketing-Partners — reviewed search-indexed positioning; the full page could not be retrieved. No claims from that source are used on Karin's page.
- Existing Lovable reference: https://karinkilburn.lovable.app — visually inspected its split hero and serif typography. Revised hierarchy brings the CTA and strategic overview closer to the top.
- Existing Bolt reference: https://luxury-real-estate-s-u2e3.bolt.host — visually inspected; the new page uses solid text surfaces instead of body copy over photography.
- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide — descriptive metadata, clear headings, crawlable text and meaningful alt text. Google does not guarantee ranking or index inclusion.

## Content provenance

- The offer, core copy, exact quote, service areas and credential limits come from the user's brief and the three supplied PDFs.
- Karin's own Linktree verifies 817.291.4860, REALTOR branding, Home Staging Expert wording and the property transformation links: https://linktr.ee/teamkilburn
- Her KW profile verifies identity and brokerage: https://teamkilburn.kw.com/agent/karin-kilburn/579558
- 2420 Durango Ridge Drive tour, linked by Karin: https://www.youtube.com/watch?v=e1ecj15Kd4I
- 2916 Durango Place tour, linked by Karin: https://www.youtube.com/watch?v=nKKLnFUBojY
- No transaction counts, sales volumes, ratings, awards, guaranteed values or invented client quotations are displayed.
- The client-experiences areas are explicitly temporary, awaiting Karin's approved exact quotes and attribution.

## Lead handling

POST /api/review validates and saves inquiries in the Site's private D1 database, seller_reviews. There is no public endpoint to retrieve leads. Required fields are name, phone and property address. Email, value, timeline and message support qualification without making every field compulsory. Unknown value defaults to Not sure; unspecified timing to Just exploring.

The form uses error states that preserve input, a honeypot, a daily hashed network identifier, a per-hour limit and a request UUID for retry deduplication. Success is shown only after storage succeeds. A saved request emits seller_review_submitted to window.dataLayer without personal data. No analytics or advertising service is connected.

The database retains the campaign source fields supplied in the URL (utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, gbraid, wbraid).

Optional HTTPS CRM/notification handoff is implemented with LEAD_WEBHOOK_URL and optional LEAD_WEBHOOK_SECRET. Neither is configured. Until connected, requests are stored and are NOT emailed/texted to Karin. The database records notification_status; failed notifications do not lose the underlying lead.

## Before public advertising

1. Connect Karin's authorized CRM/inbox to the HTTPS handoff and verify receipt using a clearly identified test inquiry.
2. Replace the clearly marked testimonial spaces with 2–3 approved exact quotations or remove those spaces.
3. Confirm usage rights for photography and Karin's approval of the wording and credentials. See the asset ledger.
4. Supply Karin's completed current Information About Brokerage Services document. Her KW site linked an IABS URL that returned 404 during research; this preview links TREC's information page, not a completed Karin-specific form. Official sources: https://www.trec.texas.gov/forms/information-about-brokerage-services and https://www.trec.texas.gov/forms/consumer-protection-notice
5. Publish to the approved public domain, set the canonical origin and indexable flag in lib/site.ts; the metadata, robots and sitemap follow that flag. This private review version deliberately uses noindex and disallows crawlers.
6. Configure the actual Google Ads conversion tag after the saved-request event and test attribution. A button click or form opening must not be counted as a completed lead. A text-link click is only an intent event, not a confirmed conversation.

## Measurement recommendation

Evaluate qualified seller inquiries and booked reviews, not total form fills alone. Compare search term, area, estimated value, timeline, completed inquiry, review booked, attendance and subsequent listing opportunity. The page does not claim a measured conversion rate; none exists yet.
