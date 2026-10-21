# LGI brand website

An English-language, responsive website for Linking Global Influencers, built with Next.js App Router, React, TypeScript, and Motion. Pages render through the Next.js server stack, with interactive navigation, campaign filters, and contact forms on the client.

## Development

Node.js 24 is supported. Use Node.js 20.9 or later.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. For a locked dependency installation, use `npm ci`.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build; run `npm run build` first.

## Deployment configuration

Deploy to a host that supports Next.js and a Node.js server. The contact API requires server execution; a static HTML export is insufficient.

| Variable               | Purpose                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | The actual production origin, including `https://`. Set before building so canonical URLs, Open Graph metadata, robots rules, and the sitemap use the correct domain. |
| `CONTACT_WEBHOOK_URL`  | Optional server-side HTTP(S) endpoint that receives validated contact inquiries as JSON. Keep this value private.                                                     |

The default origin is `http://localhost:3000`, which produces `noindex` metadata and disallows crawling. No production domain has been assumed. Set the confirmed public origin and rebuild before launch; keep staging deployments excluded from search through the hosting configuration.

When `CONTACT_WEBHOOK_URL` is configured, `/api/contact` posts the audience, name, email, message, relevant brand or creator fields, consent, source, and timestamp to that service. Configure the receiver to handle the inquiry and return a successful HTTP status only after acceptance. Failed delivery produces an error. Inquiries are not stored or logged by this application.

When the endpoint is absent, the form prepares a real email draft addressed to `market@lgi.com`. The visitor must open their email application and send the draft. The website does not claim that the inquiry was sent. A working email application is needed for this fallback.

## Pages and content

Six independent pages: Home (`/`), Brand Services (`/brand-services`), Creators (`/creators`), Campaigns (`/case-studies`), About (`/about`), and Contact (`/contact`). Legal pages are `/privacy`, `/cookies`, and `/terms`.

Content and source artwork come from the supplied [Feishu product document](https://i3h3m6c4zk.feishu.cn/wiki/RZ8DwEehdiVtWRkOvcuc32LpnZd). Downloaded imagery and logos were prepared and optimized locally in `public/images` and `public/logos`; fonts are served locally from `public/fonts`. `scripts/asset-manifest.json` records the prepared assets. The visual reference informed the layout and motion; its images were not reused.

The source document does not provide approved project names and campaign results or a confirmed roster of represented creators. The Campaigns page therefore presents campaign formats, and the creator wall uses topic imagery without inventing creator profiles. Team biographies follow the supplied source. Replace these sections with approved cases and a confirmed roster when available.

Privacy, cookie, and terms copy is a baseline and needs review against the actual operator, delivery service, and business practices before launch. Confirm the public contact details, team claims, and rights to publish source imagery and logos as part of the operator’s content review.

See [verification notes](docs/verification.md) for the checks performed and remaining deployment checks.
