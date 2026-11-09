# Verification notes

The **November 9, 2026 pre-publication revision** below takes precedence over the historical checks in this file. Its source is section 7 of the user's local `官网修改 (1).docx`, including images 57–71, followed by the user's additional Home label and shared CTA instructions. Historical references to a single logo row, the brand description, the statistics introduction, numbered Home section labels, and the old CTA palette describe superseded versions.

## November 9, 2026 pre-publication revision

The complete DOCX revision passed `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` before the latest follow-up changes to Home label numbers and shared CTA styling. The following production browser checks were completed against that DOCX revision:

- Home at 1440px, 390px, and 320px has no horizontal viewport overflow. The brand heading is centered on one line; its former description and the statistics introduction are absent.
- The two original-color brand rows move in opposite directions. Keyboard focus pauses both rows, and reduced motion disables their animation.
- The statistics labels appear above their values. A live intermediate value of `653+` was observed before the figures settled at `8,245+` and `200+`; the accessible text retains the complete final values.
- The audience heading stays on one line, without its former ending punctuation, and the exact new `Connecting global brands and creators to turn influence into lasting impact.` description appears beneath it.
- The Home CTA's softer yellow background, revised typography, and button layout were visually reviewed on desktop and at 320px.
- Creators at 390px uses 14px, weight-600, near-white profile metadata. Cards retain equal 556px heights in that check, and no broken profile images were found.
- Brand Services at 320px exposes `GO GLOBAL` without a following punctuation mark in the accessibility tree.
- Contact at 320px has no horizontal overflow; all mailto links use `linkingglobal@wotokol.com`, and the footer address wraps visibly rather than clipping.

The source and current application files contain no remaining old email address. Targeted lint and whitespace checks also passed for the copy and long-email layout changes. Email delivery and external form-provider account settings were not exercised by these layout checks.

The user's subsequent follow-up removes numeric prefixes from Home section labels and extends the softer yellow CTA typography and pill-button treatment to every shared `CallToAction`. The Creators CTA retains its own copy and `/contact?audience=creator` destination.

The final follow-up passes `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check`. In the production build, Home at 390px exposes `OUR CORE CAPABILITIES` and `BRANDS & CREATORS` without numeric or replacement star prefixes; the existing FAQ and CTA stars remain. Home, About, and Creators were checked at 1440×1000 and 320×568: all six page/viewport combinations use the same pale-yellow gradient, body heading font, olive emphasis, and 100px-radius pill buttons. Each intended heading line occupies one line, the buttons fit, and no page has horizontal viewport overflow. About and Creators desktop/mobile screenshots were visually reviewed. Clicking the About CTA reaches the brand Contact form; clicking the production Creators CTA reaches `/contact?audience=creator` with the creator tab selected. No warning or error logs were captured during the final browser checks. Temporary reduced-motion and viewport overrides were reset afterward. No deployment or Git commit has been made for this revision.

## Earlier publication status and verification history

Current publication status: Case Studies is temporarily hidden at the user's request. Navigation and sitemap omit it, and its list/detail routes return the shared 404 page. The earlier Case Studies verification sections below record the retained implementation before it was hidden.

The hidden-state production check confirms HTTP 404 for the list, its query-string variant, all nine details, and two unknown nested paths. All five remaining public pages return HTTP 200 with no case links; desktop navigation, the mobile menu, and footer omit the entry, and the sitemap contains no case URLs. Hidden routes contain no case content and have noindex metadata. No browser exceptions occur. Lint, the production build (including TypeScript), and whitespace checks pass.

Verified locally on November 6, 2026 for the acceptance revision recorded in [acceptance-changes.md](acceptance-changes.md).

## Pages and layout

The acceptance revision and latest Home refinements pass `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check`.

Browser checks cover Home, Brand Services, Creators, About, Contact Us, and Case Studies at 1440px, 390px, and 320px. All return HTTP 200, all referenced images load, no page errors occur, and none of the six pages has horizontal viewport overflow. Desktop and mobile page screenshots were visually inspected.

Interactive checks confirm:

- Home background animation runs without a visible playback control, as requested in the latest revision. The color brand marquee pauses on hover or keyboard focus and resumes when neither applies.
- Home service cards have equal heights within each audience, scroll with arrow buttons, mouse dragging, and native touch swiping; the brand/creator tabs show the corresponding six services.
- Mobile brand services follow 01–06; desktop retains the approved three-column staggered layout.
- Mobile navigation opens, closes, and reaches Contact Us.
- The two Home audience cards reach For Brands (`/brand-services`) and For Creators (`/creators`) respectively, as requested in the latest revision.

The original acceptance revision preserved the Case Studies gallery and its image files under `public/images/case-formats`. The subsequent reference-layout update is recorded below.

## Home refinement

The refined Home page was checked at 1920×1080, 1440×1000, 1280×720, 390×844, 320×568, and 844×390.

- The Hero fits one viewport, with only the circular arrow at the bottom. The primary buttons and bottom arrow do not overlap, including in the 844×390 landscape viewport.
- The Hero heading uses locally served DM Sans 900 with positive letter spacing; both lines use the same font size and fit within the viewport at all six sizes.
- Brand logos retain their original colors in one seamless looping row, without a white card background. The requested full subtitle is present; the two specified labels and visible playback controls are removed.
- Service cards use a compact portrait layout, a white border, and a black information area. Desktop cards are 340px wide and adapt to the available width on small screens. Arrow controls advance one card at a time; touch scrolling remains available.
- The brand marquee pauses on hover or keyboard focus and resumes afterward. Reduced-motion settings disable animation and allow static horizontal scrolling. The Hero background's playback control was removed in the subsequent talent-section revision.

The production build was additionally checked at 1440×1000 and 390×844: Hero height, heading font and equal line sizes, increased letter spacing, complete brand subtitle, transparent logo band, removed playback buttons, keyboard pause/resume, and absence of horizontal viewport overflow all pass, with no browser page errors. The compact service cards and black background were verified in the preceding refinement.

## Home audience entry cards

The former work cards are now explicit For Brands and For Creators entry points, headed `LET’S BUILD / WHAT’S NEXT.`. The brand card uses the campaign-planning photo and `Turn attention / into impact.` copy; the creator card uses the podcast photo and `Create your way. / Grow with LGI.` copy. Both have a short explanation and a named destination CTA. Each complete card is a single accessible Link, targeting `/brand-services` or `/creators` with no service hash. The previous Case Studies header link is removed. Arrows now sit in the CTA row so the extra copy cannot collide with them; black-and-white photography and the existing entrance/scroll motion remain.

Production checks at 1920×1080, 1440×1000, 1024×768, 768×1024, 700×900, 390×844, 320×568, and 844×390 confirm loaded images, no viewport overflow, no clipped text, and separation between labels, titles, descriptions, CTA text, and arrows. Desktop and mobile screenshots were visually reviewed. Actual image-area, arrow-area, and keyboard activation checks at 1440px/390px/320px reach the corresponding pages with no fragment; reload plus keyboard activation also passes under normal motion. Both links are present in server HTML with JavaScript disabled. No browser exceptions occur. Lint, type checking, the production build, and whitespace checks pass.

## Service carousel interactions

The brand and creator sets were checked at 1920×1080, 1440×1000, 390×844, 320×568, and 2560×1440. All six cards in each set have equal heights; neither the carousel nor the page introduces viewport overflow. The track sizes itself to the tallest card without a fixed minimum height.

Browser interaction checks confirm next/previous movement, disabled controls at each boundary and when all cards fit, accumulated rapid clicks under normal animation, bidirectional mouse dragging, pointer release outside the track, native mobile touch swiping, and reset on audience change. Dragging does not open a service link; ordinary clicks and keyboard Enter still reach the intended page. Re-entering after releasing the mouse outside the track does not accidentally begin dragging.

The full carousel check passed in both development and production builds with no browser page errors. Lint, TypeScript, production build, and diff whitespace checks also pass.

## Refresh initialization

A Chrome session showed delayed client initialization after a Home reload: static content rendered while entrance effects and interactive controls had not attached. JavaScript files returned successfully and no application exception explained the delay. A separate test reproduced indefinite hydration waiting by blocking only the Next development HMR socket while React debug streaming was enabled.

`experimental.reactDebugChannel` is now disabled so initial hydration no longer depends on React debug data delivered through that socket. Normal HMR/Fast Refresh remains enabled. The actual Chrome socket was observed connecting and receiving debug data, so a permanently failed WebSocket is not asserted as the cause of every observed delay.

In installed Chrome 156, three initial-load/reload cycles with a normal connection and three with the HMR socket deliberately closed all initialized entrance animations, switched the audience tab, and scrolled the service cards. The user's existing Chrome tab was also refreshed and successfully switched to Creator services. Lint, type checking, and the production build pass.

At 390px, navigation also opens and closes after a reload while the debug socket is blocked, with no page errors.

## Home talent section

The Hero's top-right play/pause button and its state/styles have been removed. The automatic background animation, reduced-motion behavior, primary collaboration links, and circular down-arrow remain.

Home section 03 is now the reference-style `SOME OF OUR TALENT` carousel. The latest refinement uses the same beige `--paper` background as GOOD TO KNOW, white cards, an uppercase ink-colored heading, 3px deep warm olive-gray card borders (`#4b5042`), light shadows, and borderless `View Profile` buttons with a sage-to-lemon-to-butter-to-apricot-to-blush gradient. All 11 eligible workbook rows were independently checked against the supplied names, follower counts, channel URLs, and embedded-image anchors. UX Tech, Noxy, and ManShed have no embedded photo and are excluded. The subsequent Creators-page roster is recorded below.

The latest palette update was visually checked at 1440px and 390px: its computed background exactly matches the FAQ section (`rgb(245, 244, 238)`), profile buttons have zero border width and five gradient stops, white cards remain distinct, and there is no horizontal viewport overflow or browser exception. The production build passes.

The latest border/entrance update also passes desktop/mobile production checks. Visible card surfaces fade and rise with an 85ms stagger on their first entrance; animating an inner surface preserves the outer card geometry used for carousel scrolling. Later automatic slides and vertical re-entry do not replay the entrance. Reduced-motion settings leave all cards visible without entrance effects, and focusing or clicking the track or arrows immediately reveals the content. A normal reload with the development debug socket blocked still initializes the entrance and controls. Card heights remain equal, profile buttons stay borderless, autoplay advances, and there are no browser errors. Lint, type checking, the production build, and whitespace checks pass.

The entrance-to-autoplay handoff now waits for the last visible card's actual animation finish, then immediately advances one card. Production checks at 1440px, 390px, and after a desktop reload measured 1.6–6.3ms from the final animation finish to the scroll request and 33.0–33.8ms to visible movement. No automatic advance occurs during the entrance; subsequent steps retain the normal interval without replaying the entrance. Hovering through completion pauses the first step and leaving resumes it immediately (12.5ms in the check). Focus or pointer interaction cancels the entrance without adding an automatic step; manual arrows still work. Reduced motion keeps the cards visible and static. These checks report no browser exceptions; lint, type checking, and the production build also pass.

Development and production browser checks cover 1920×1080, 1440×1000, 390×844, 320×568, 844×390, and 3840×1600. All cards have equal heights at each viewport and the page has no horizontal viewport overflow or browser exceptions. Desktop and mobile screenshots were visually reviewed. The unchanged 11 source images previously passed HTTP 200 checks.

The carousel now advances automatically one card at a time, then returns seamlessly to the equivalent position in its central copy. Real-time checks confirm successive single-card steps, the last-to-first transition, hover/focus pause and resume, and reduced-motion autoplay suppression. Loop coordinates retain fractional pixels so narrow-screen snapping does not drift. Both arrow controls remain usable through the first/last transition.

Interaction checks also cover accumulated rapid clicks, bidirectional mouse dragging, prevention of accidental profile opening after dragging, native mobile touch swiping, keyboard arrows/Home/End, and activation of the supplied profile URLs. Buffer copies are excluded from the accessibility tree and tab sequence; pointer activation transfers focus to the equivalent accessible link without scrolling. Profile destinations were intercepted locally during verification. A reload with the development debug socket blocked still initializes entrances and the talent controls. Lint, TypeScript, the production build, and diff whitespace checks pass.

## Creators profile carousel

The original stock-photo network gallery is replaced by `SOME OF OUR CREATORS`. It shares the homepage's carousel, card dimensions, entrance, looping, dragging, touch, keyboard, and pause behavior. Its scoped dark theme uses `#121310` for the section, `#1c1f19` card panels, and 3px off-white `#eceee5` borders. The locally served heading font and borderless gradient profile buttons match Home. No platform/topic filters remain. Each profile adds its full, single-sentence biography from workbook column G, and the heading has a one-sentence section introduction. All 11 eligible profiles, biographies, country values, counts, source channel URLs and existing photo paths were checked against the workbook; three rows without photos remain excluded.

Production browser checks at 1440px and 390px, including a desktop reload, confirm equal card heights, readable unclipped biographies, no viewport overflow, only two arrow controls, and the expected dark/white palette. Screenshots were visually reviewed. The final entrance-to-scroll handoff measured 33.4–34.0ms to visible movement. Hover pause/resume, focus cancellation without an extra advance, manual arrows, reduced motion, and 320px keyboard navigation pass with no browser errors. The shared-component Home regression checks also pass at 1440px/390px and after reload: its original palette, content, immediate first advance, normal subsequent steps, and pause behavior remain. Lint, TypeScript, the production build, and whitespace checks pass.

## Contact flow

Both audiences require first name, last name, valid email, plans, and privacy consent. Plans reject empty or whitespace-only input and allow up to 3,000 characters. Phone is optional. Brands also require a company and one of 23 product categories; creators require a valid HTTP(S) channel URL and can provide WhatsApp.

After making plans required, six focused browser checks passed: each audience rejects empty and whitespace-only plans without making a Forminit request, and accepts valid plans through an intercepted request. Both tabs display the required marker, expose `textarea.required`, and focus the plans field on a validation error. There were no browser exceptions or real Forminit submissions. TypeScript and targeted ESLint checks also passed.

The website now submits directly through the official Forminit browser SDK to the single existing free-plan form `m5lh8nrxrei`. `fi-text-audience` distinguishes brand and creator inquiries. Both paths share the same 14-field schema, including empty values for the other audience's exclusive fields. Forminit ignores these empty values. `src/lib/forminit-contact.ts` defines the mapping, normalizes curly apostrophes in sender names, and translates provider field errors into the existing form errors.

Twenty browser scenarios passed with every Forminit request intercepted and fulfilled locally: brand and creator success payloads and shared ID, required fields, honeypot rejection, provider email/phone/WhatsApp error focus after inputs unlock, rate limiting, quota exhaustion, HTTP 500, missing/empty/non-string hashes, explicit failure despite a hash, malformed JSON, network failure, synchronous duplicate submits, sending-time audience lock, tab switching without stale exclusive fields, rejection of channel URLs containing credentials, and normalization of both left and right curly apostrophes while preserving international phone numbers. Successful submissions clear the form only after receiving a valid `hashId`; failures preserve all input. There were no browser exceptions.

After correcting the form ID to `m5lh8nrxrei`, both audience submission paths were checked again with intercepted browser requests: each posts to the new endpoint with the same 14-field schema and empty non-applicable fields. Both smoke checks passed without browser exceptions. TypeScript and the production build also passed after the ID change.

The corrected Forminit endpoint returned HTTP 200 to a non-submitting OPTIONS request and allowed cross-origin POSTs and the SDK header. No real Forminit POST or notification was sent, so these checks consumed no submission allowance. Actual inbox delivery and account settings (Public mode and any Authorized domains) still need confirmation with the first real submission. The old `/api/contact` webhook/email-draft route remains available for compatibility but is no longer called by the website.

The privacy notice now identifies Forminit as the provider storing enquiries. TypeScript, ESLint, and the production build pass. The Forminit code changes have not been deployed.

## Case Studies reference layout

The gallery uses a white background, a centered 1280px container, a single-line centered heading, a centered subtitle, and three columns of rounded cards with 16:9 covers. The `01 BRAND CASES` label is removed. Brand partnerships / Creator opportunities switching and All / Online / On-site filters are retained; switching audiences resets the format to All, and On-site filters the existing Offline category. All six brand and three creator cards preserve their original images, titles, categories, full descriptions, and arrows. Each card now opens its corresponding detail page; the separate enquiry link continues to reach Contact.

Development and production browser checks cover 1920×1080, 1440×1000, 1024×768, 768×1024, 700×900, 390×844, 320×568, and 844×390. The heading remains on one centered line, the subtitle stays centered, and neither the controls nor the page overflow. Desktop uses three columns, tablets two, and mobile one. Every card's content is compared against the original gallery: brand filters return six / three / three cards and creator filters three / two / one. Audience changes reset the filter, keyboard activation works, all images load, and both audience-specific contact destinations succeed. No text is clipped and no browser exceptions occur. Desktop and mobile screenshots were visually reviewed. Lint, TypeScript, the production build, and diff whitespace checks pass.

## Case study detail pages

All nine gallery cards open unique detail routes. Three pages present the documented TCL × NFL, IFA 2026, and CES 2026 projects; the other six present collaboration approaches or creator support, as confirmed by the user. The original gallery content and audience/format controls remain intact. Source mappings and metric boundaries are recorded in [case-studies-content.md](case-studies-content.md).

The final production build was checked across all nine detail pages at 1920×1080, 1440×1000, 1024×768, 768×1024, 390×844, 320×568, and 844×390 (63 page/viewport combinations). Each route returns HTTP 200 with its expected heading and canonical URL; images load, cover text stays within its bounds, and no page has horizontal viewport overflow or browser exceptions. Desktop and mobile screenshots were visually reviewed.

Browser interactions verify brand/creator filters, distinct card destinations, keyboard activation, return links that restore audience and format, reload persistence, section anchors and active section updates after related-page navigation, related links that preserve the format query, audience-specific contact buttons, the mobile menu, unknown-slug HTTP 404, and all nine sitemap entries. An inherited global scroll-margin rule was overridden within the detail article so chapter anchors use the intended desktop/mobile offsets. Lint, TypeScript, the production build, and `git diff --check` pass.

## Deployment configuration

The production origin remains unconfigured locally. Configure `NEXT_PUBLIC_SITE_URL` before launch so canonical URLs, robots rules, the sitemap, and social metadata point to the live domain. This revision has been verified locally and has not been deployed.
