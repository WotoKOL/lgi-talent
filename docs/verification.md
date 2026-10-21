# Verification notes

## Website and responsive checks

`npm run typecheck`, `npm run lint`, and `npm run build` pass. The production build generates the marketing pages as server-rendered HTML and renders `/contact` on demand. Production dependencies have no reported security advisories at the time of this check.

Browser checks cover the homepage, both service pages, work gallery, about page, and contact flow. The 390px mobile viewport has no horizontal overflow on the six main pages; the homepage also fits a 320px viewport. Verified mobile menu open/close and focus, the brand/creator service tabs, work audience and online/offline filters, FAQ expansion, and brand and creator form submissions using synthetic information. Both submissions produced the expected email draft without sending an external message.

All nine page routes return HTTP 200 and contain English language metadata, one H1, unique titles, descriptions, self-referencing canonicals, and valid Organization JSON-LD. All ten distinct internal linked routes and 53 referenced local image sources are valid. `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, and `/icon.svg` respond successfully with the expected content types. Local previews correctly remain noindex until the real public origin is configured.

## Contact interaction

The contact component and API passed ESLint and TypeScript checks. Direct API checks used synthetic information and mocked delivery; no external inquiries were sent.

Verified behavior:

- Valid brand and creator inquiries return a correctly addressed email draft when no webhook is configured, including the submitted fields.
- Both audiences require full name, valid email, and privacy consent. Brands require company and one of the document’s 23 product categories; creators require an HTTP(S) channel URL.
- Invalid channel protocols, embedded URL credentials, honeypot values, malformed JSON, incorrect content types, and bodies over 16 KiB are rejected.
- Configured webhook acceptance returns delivery confirmation; upstream failures return meaningful errors.

The interaction implementation was also reviewed: editing an inquiry clears an older email draft and the changed field’s validation error; keyed audience fields prevent company data appearing as a WhatsApp value. The privacy policy opens in a separate tab so the visitor can review it without leaving a completed form.

## Before production launch

Set the actual `NEXT_PUBLIC_SITE_URL`, rebuild, and inspect canonical URLs, `/robots.txt`, `/sitemap.xml`, and social metadata on the deployed origin. Verify the configured delivery receiver end to end with an approved test inquiry. Review legal text and approve source-based content before making the site public.
