# LGI brand website

An English-language, responsive website for Linking Global Influencers, built with Next.js App Router, React, TypeScript, and Motion. Pages render through the Next.js server stack, with interactive navigation, campaign filters, and contact forms on the client.

## Development

Use Node.js 20.19+, 22.13+, or 24+, matching the package engine requirement.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. For a locked dependency installation, use `npm ci`.

React debug streaming over the development WebSocket is disabled in `next.config.ts`, so a delayed or interrupted debug connection cannot block initial page hydration. Normal hot reload and Fast Refresh remain enabled.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build; run `npm run build` first.

## Deployment configuration

Deploy to a host that supports Next.js and a Node.js server. The existing dynamic routes require server execution; a static HTML export is insufficient.

| Variable               | Purpose                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | The actual production origin, including `https://`. Set before building so canonical URLs, Open Graph metadata, robots rules, and the sitemap use the correct domain. |
| `CONTACT_WEBHOOK_URL`  | Legacy `/api/contact` webhook only. The website's Forminit form does not call this endpoint or use this variable.                                                     |

The default origin is `http://localhost:3000`, which produces `noindex` metadata and disallows crawling. No production domain has been assumed. Set the confirmed public origin and rebuild before launch; keep staging deployments excluded from search through the hosting configuration.

## Contact submissions — Forminit

Both contact tabs submit through the official `forminit` browser SDK to **one existing form**, `m5lh8nrxrei` (`https://forminit.com/f/m5lh8nrxrei`). This fits the free plan's one-form limit; no additional Forminit form or API key is needed. The ID and shared field mapping are in `src/lib/forminit-contact.ts`. Forminit discovers fields from submitted `fi-*` names, so there is no separate dashboard field builder to configure.

| Website data | Forminit field | Applies to |
| --- | --- | --- |
| Inquiry type | `fi-text-audience` (`brand` / `creator`) | Both |
| First / last name | `fi-sender-firstName` / `fi-sender-lastName` | Both |
| Email | `fi-sender-email` | Both |
| Optional phone | `fi-sender-phone` | Both |
| Plans (required) | `fi-text-message` | Both |
| Company | `fi-sender-company` | Brand |
| Product category | `fi-select-productType` | Brand |
| Optional WhatsApp | `fi-phone-whatsapp` | Creator |
| Channel URL | `fi-url-channelUrl` | Creator |
| Privacy consent | `fi-checkbox-consent` (`yes`) | Both |
| Source / submission time | `fi-text-source` / `fi-text-submittedAt` | Both |
| Hidden spam trap | `_gotcha` | Both |

Each submission includes the same field names. Fields exclusive to the other audience are empty and Forminit ignores them; company and product category are required only for brands, and channel URL only for creators. Plans are required for both audiences, reject empty or whitespace-only input, and allow up to 3,000 characters. Optional fields may remain empty. Non-empty phone and WhatsApp values must include a valid international country code. Curly apostrophes in sender names are normalized for Forminit's name validation.

Review submissions in the existing form's inbox at [app.forminit.com](https://app.forminit.com), using `audience` to distinguish brands from creators. Keep the form in **Public** submission mode for browser submissions. The current free plan allows 100 submissions per month shared by both audiences; new submissions are rejected once the allowance is exhausted. If Authorized domains are configured, include the site's actual host and any intended test hosts; unmatched submissions can land in Spam. Do not set a site-wide `Referrer-Policy: no-referrer` for a domain-restricted form. Any future Content Security Policy must allow `https://forminit.com` in `connect-src`.

Only a successful response with a submission `hashId` clears the form and displays confirmation. Validation, quota, rate-limit, network, or malformed-response failures preserve input and display an error. Nothing is stored by this application; enquiry data is stored by Forminit. The existing `market@lgi.com` links remain available for email contact.

The earlier `/api/contact` route remains available for compatibility with generic webhook consumers, but the website no longer calls it. Its `CONTACT_WEBHOOK_URL` behavior is independent of Forminit: without a webhook it returns an email draft, and with a webhook it forwards validated JSON. Do not set it to the public Forminit endpoint, which expects Forminit field names instead of that JSON format.

## Pages and content

Five public pages: Home (`/`), Brand Services (`/brand-services`), Creators (`/creators`), About (`/about`), and Contact (`/contact`). Legal pages are `/privacy`, `/cookies`, and `/terms`. Case Studies is temporarily disabled through `caseStudiesEnabled` in `src/lib/features.ts`: its menu entries and sitemap URLs are omitted, and the list/detail routes return 404. The implementation and content remain available for a future release.

Content and source artwork come from the supplied [Feishu product document](https://i3h3m6c4zk.feishu.cn/wiki/RZ8DwEehdiVtWRkOvcuc32LpnZd). Downloaded imagery and logos were prepared and optimized locally in `public/images` and `public/logos`; fonts are served locally from `public/fonts`. `scripts/asset-manifest.json` records the prepared assets. The November 6 acceptance revision uses the supplied `官网修改.docx` and `官网修改.zip` for approved imagery and layouts; see [the acceptance change record](docs/acceptance-changes.md).

The Case Studies gallery uses a single-line centered heading and centered subtitle, brand/creator audience switching, format filters, and three columns of 16:9 cards on desktop. All six brand and three creator cards retain their existing images, titles, categories, full descriptions and arrows, and open individual detail pages. Three pages cover documented TCL × NFL, IFA and CES projects; the other six describe collaboration approaches and creator support. Details include section navigation, related stories and audience-specific enquiry buttons. Returning to the list preserves audience and format. See [case content sources](docs/case-studies-content.md). The Home talent section uses the supplied workbook. Team biographies follow the supplied source.

Privacy, cookie, and terms copy is a baseline and needs review against the actual operator, delivery service, and business practices before launch. Confirm the public contact details, team claims, and rights to publish source imagery and logos as part of the operator’s content review.

See [verification notes](docs/verification.md) for the checks performed and remaining deployment checks.
