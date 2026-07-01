# Elavivephysio — SEO Diagnostic Report

_Diagnosis only — no code was changed. Audited on 2026-07-01 against the Next.js App Router codebase in `src/`._

Pages audited: `/`, `/about`, `/services`, `/services/spine-back`, `/services/knee-joint`, `/services/shoulder`, `/services/sports-injury`, `/services/post-surgical-rehab`, `/services/neuro-rehab`, `/contact`, `/blog`, `/blog/[slug]` (6 seed articles).

---

## SEO Health Score: **6 / 10**

The metadata foundation is genuinely strong — every page exports unique, keyword-aware, Jaipur-localised titles/descriptions with per-page canonicals, and headings/text are crawlable. But the site is missing three things Google effectively expects at launch (a sitemap, a robots.txt, and any JSON-LD structured data — critical for a local medical clinic), the Open Graph/Twitter tags only exist on the homepage, and the service and blog pages are thin/duplicate enough that they will struggle to rank. Fixable, but not launch-ready for search.

---

## Critical SEO Issues (will actively hurt rankings — fix before launch)

### C1. No sitemap at all
No `app/sitemap.ts`, no `public/sitemap.xml`. Google has no machine-readable index of the ~19 URLs on this site. For a brand-new domain with no inbound links, this materially slows discovery and indexing of the service and blog sub-pages.
- **Fix location:** add `src/app/sitemap.ts` (Next.js generates `/sitemap.xml` automatically). Enumerate static routes + `SERVICES` slugs + `BLOG_ARTICLES` slugs from `src/lib/data.ts`.

### C2. No robots.txt
No `public/robots.txt` and no `app/robots.ts`. There is no directive telling crawlers what to crawl, and — more importantly — no `Sitemap:` reference for search engines to find the sitemap. (Note: page-level `robots: { index: true, follow: true }` is set in `layout.tsx:57`, so pages *are* indexable — but the site-level file is still expected.)
- **Fix location:** add `src/app/robots.ts` (emits `/robots.txt`) with a `sitemap` field pointing at the eventual production URL.

### C3. Zero structured data (JSON-LD) — biggest local-SEO miss
A repo-wide search for `application/ld+json`, `LocalBusiness`, `MedicalBusiness`, `@context`, and `schema.org` returns **nothing**. For a physiotherapy clinic competing in Jaipur local search / Google Maps / rich results, the absence of a `MedicalBusiness`/`Physiotherapy` schema (with name, address, phone, hours, geo) is the single highest-value missing item. Also missing: `MedicalClinic`/`Physician` for Dr. Agarwal, `BreadcrumbList`, `Article` for blog posts, and `FAQPage` opportunities. See the **Structured Data Recommendations** section below.

### C4. Blog article bodies are 100% duplicate, placeholder content
`src/components/blog/ArticleBody.tsx` renders the **same hard-coded dummy text on every one of the 6 article pages** — the body ignores `article` except for interpolating the title on line 17. Every `/blog/<slug>` page therefore serves identical body copy ("This is placeholder content for …", the same h2/h3/list/blockquote). This is textbook duplicate/thin content: Google will likely index one and ignore the rest, or flag the section as low quality. The listing excerpts in `data.ts` are unique, but the article pages themselves are not.
- **Fix location:** `src/components/blog/ArticleBody.tsx` (currently flagged TODO in its own header comment).

### C5. Contact page is not connected to a real address, phone, or map location
NAP (Name/Address/Phone) is entirely placeholder, which undermines local ranking and will produce inconsistent citations:
- Phone is literally `+91 XXXXX XXXXX` / `tel:+91XXXXXXXXXX` (`src/lib/data.ts:18-20`).
- WhatsApp number is `91XXXXXXXXXX` (`data.ts:18`).
- Google Maps embed is centred on generic "Jaipur, Rajasthan", not the clinic (`ContactBody.tsx:12-13`, marked TODO).
- Address differs by page: Footer says "C-Scheme, Jaipur, Rajasthan" (`Footer.tsx:28`) while Contact cards say only "Jaipur, Rajasthan" (`ContactBody.tsx:108`).

Until real, consistent NAP exists, LocalBusiness schema and Google Business Profile alignment cannot be trusted. **This blocks C3's local schema from being accurate.**

---

## High Priority SEO Issues (significant ranking opportunity being missed)

### H1. Open Graph & Twitter tags exist only on the homepage
`openGraph` and `twitter` are defined once in `src/app/layout.tsx:42-56` (type `website`, homepage URL/title/description). Because no child page overrides `openGraph`, **every** page inherits the homepage's OG title, description, and — critically — the homepage `url`. So `/services/knee-joint`, `/about`, each blog post, etc. all advertise `og:url = https://www.elavivephysio.com` and the homepage's OG title when shared. Effects:
- `og:url` is wrong on every non-home page (should be the page's own canonical).
- `og:title` / `og:description` don't match the page content on shares.
- Blog posts have no `og:type: article`, no `article:published_time`, no author.
- No `og:image` / `twitter:image` is set anywhere, and there is no OG image asset in `/public`, so social shares render with no image card.
- **Fix:** add per-page `openGraph` (and `article` metadata for blog) in each page's metadata export; add a default `openGraph.images` in `layout.tsx`.

### H2. Service sub-pages are thin content (< 300 words)
Each `/services/<slug>` page (rendered by `ServiceDetail.tsx`) has only ~150–230 words of *unique* body copy: `headline` + `outcome` + one `description` paragraph (~55–60 words) + a conditions list + 4 short approach bullets. Everything else is boilerplate shared verbatim across all six pages — the "What we treat"/"Our approach"/"What to expect" section labels, the identical 3-step `SERVICE_JOURNEY` text (`data.ts:501-517`), and the CTA. These pages target competitive local keywords ("back pain treatment Jaipur", "frozen shoulder treatment Jaipur") but don't have the depth to rank against established clinics.
- **Fix:** expand each service page's unique prose to 500+ words (symptoms, causes, treatment specifics, expected timelines, FAQs).

### H3. Target keyword missing from the visible H1 on most pages
The H1s are crawlable (good — see H-structure below) but several don't contain the page's target keyword, weakening on-page relevance:

| Page | Target keyword | H1 text | Keyword in H1? |
|------|----------------|---------|----------------|
| `/` | physiotherapy clinic Jaipur | "Elavive Physio — Spine & Knee Clinic in Jaipur. Advanced physiotherapy for spine, knee, sports injuries, and post-surgical recovery." | ✅ (contains "Jaipur" + "physiotherapy") |
| `/about` | physiotherapist Jaipur | "We treat the cause. Not just the pain." | ❌ |
| `/services` | physiotherapy services Jaipur | "Specialised care for every kind of movement" | ❌ |
| `/services/spine-back` | back pain treatment Jaipur | "Relief from back pain that actually lasts" | ⚠️ ("back pain" yes, "Jaipur" no) |
| `/services/knee-joint` | knee pain physiotherapy Jaipur | "Get back to walking, climbing, living" | ❌ |
| `/services/shoulder` | frozen shoulder treatment Jaipur | "Frozen shoulder, rotator cuff, impingement — we treat them all" | ⚠️ ("frozen shoulder" yes, "Jaipur" no) |
| `/services/sports-injury` | sports injury physiotherapy Jaipur | "Back on the field, faster than you expected" | ❌ |
| `/services/post-surgical-rehab` | post surgical rehabilitation Jaipur | "Recovery after surgery, done right" | ⚠️ (partial, no "Jaipur") |
| `/services/neuro-rehab` | neurological rehabilitation Jaipur | "Rebuilding movement after neurological injury" | ⚠️ ("neurological" yes, no "Jaipur") |
| `/contact` | book physiotherapy appointment Jaipur | "Let's get you moving again" | ❌ |
| `/blog` | — | "Move smarter, recover faster" | n/a |

The marketing headlines are good for humans; the fix is not to sacrifice them but to ensure the keyword appears in the H2 immediately below and in the first body paragraph (see H4). At minimum, work "Jaipur" and the condition term into each service page's first paragraph.

### H4. Target keyword often missing from the first paragraph of body copy
- `/about`: first paragraph (`AboutHero.tsx:42-45`) says "Founded in Jaipur … spine and knee rehabilitation" — contains "Jaipur" but not "physiotherapist". OK-ish.
- `/services`: intro (`ServicesExplorer.tsx:239-242`) does not contain "physiotherapy services Jaipur".
- `/contact`: intro (`ContactBody.tsx:63-65`) "Book an appointment, ask a question…" — no "physiotherapy" / "Jaipur".
- Service pages: the `description` paragraph mentions the condition but generally **not "Jaipur"** (only the seoTitle/seoDescription carry the city). Since body copy is what Google reads for topical relevance, the city keyword should appear in the visible lead paragraph, not just the `<title>`.

### H5. Homepage description exceeds 160 chars (truncation risk)
`layout.tsx:29-30` — **165 chars**. Google will truncate the tail ("Book your appointment today.") in the SERP. Trim to ≤160.

### H6. Several titles exceed ~60 chars (SERP truncation)
Measured rendered `<title>` lengths:

| Page | Title chars | Status |
|------|-------------|--------|
| `/about` | 66 | ❌ too long |
| `/blog` | 67 | ❌ too long |
| `/services/shoulder` | 82 | ❌ too long |
| `/services/neuro-rehab` | 76 | ❌ too long |
| Blog: "After ACL Surgery…" | 79 | ❌ too long |
| Blog: "Is Your Office Chair…" | 88 | ❌ too long |
| Blog: "5 Morning Habits…" | 70 | ❌ too long |
| Blog: "What to Expect…" | 65 | ❌ too long |
| Blog: "Why Painkillers…" | 61 | ⚠️ borderline |
| Blog: "How to Return to Running…" | 61 | ⚠️ borderline |

All 6 blog titles overflow once the `%s | Elavive Physio` template suffix (`layout.tsx:27`) is appended. Consider a shorter template (e.g. `%s | Elavive`) for blog, or trim the source titles. Shoulder/neuro service titles pack two clauses + brand and should be shortened.

---

## Medium Priority (best practices not followed)

- **M1. Two descriptions are slightly under 140 chars:** `/services/spine-back` (137) and `/services/shoulder` (131). Minor — pad with a benefit phrase to land in the 140–160 sweet spot.
- **M2. `/services` title is short (49 chars).** Room to add a differentiator (e.g. "…| Spine, Knee & Sports | Elavive Physio") while staying ≤60.
- **M3. Hero decorative image has empty alt but so does the LCP image.** `Hero.tsx:40` uses `alt=""` (correct, it's decorative) — but it's also the `priority` LCP image. Acceptable for SEO since the real content is text; no action strictly needed, noted for completeness.
- **M4. Blog `date` values are human strings** ("24 June 2026") with no machine-readable `<time datetime>` or `article:published_time`. Add ISO dates for `Article` schema and freshness signals.
- **M5. No `lastModified` / change-frequency data** available for the sitemap (blog dates are display-only strings). Consider structured publish dates in `data.ts`.
- **M6. `metadataBase` is a placeholder domain** (`https://www.elavivephysio.com`, `layout.tsx:21`, TODO). Canonicals and OG URLs will be wrong until the real production domain is set. Verify before launch.
- **M7. Duplicated `id="founder"`** exists on both `DoctorSpotlight` (homepage, `DoctorSpotlight.tsx:57`) and `FounderProfile` (about page, `FounderProfile.tsx:26`). Not a ranking issue (different pages), but avoid if any cross-page anchor linking is added.

---

## Passed SEO Checks ✅

- **Every audited page exports a unique `metadata` object** with a unique `title` and `description` — including the dynamic blog route via `generateMetadata` (`blog/[slug]/page.tsx:17-33`).
- **Per-page canonicals** are set on every page via `alternates.canonical` (relative paths resolve against `metadataBase`). Homepage canonical set in `layout.tsx:58`.
- **`metadataBase` is configured** (`layout.tsx:24`), so relative canonicals/OG URLs resolve correctly.
- **Title template** (`%s | Elavive Physio`) is set with correct use of `absolute` overrides on pages that already include the brand (services/contact/blog) to avoid double-branding.
- **`lang="en"` is set** on `<html>` (`layout.tsx:73`).
- **Exactly one `<h1>` per page**, and all H1s are **crawlable**. The homepage's real H1 is a text node inside an `sr-only-seo` element (`Hero.tsx:58-62`) — visually hidden via clip/position (`globals.css:69-79`) but **not** `aria-hidden` and present in the DOM, so crawlers and screen readers read it. The visible display headline is a separate `aria-hidden` `<p>`. This is a legitimate pattern, correctly implemented.
- **Animation wrappers keep text crawlable.** `BlurText` (`BlurText.tsx:77-92`) and `ClipReveal` (`ClipReveal.tsx:71-75`) render real text nodes inside real heading elements — confirmed the SEO/accessibility comments match the implementation. No headings are hidden behind canvas/aria-hidden-only layers.
- **Logical heading hierarchy** on content pages: h1 → h2 (section) → h3 (cards), verified in `ServiceDetail.tsx`, `WhyChooseUs.tsx`, `ServicesGrid.tsx`, `ContactBody.tsx`, blog article page.
- **All internal navigation uses Next.js `<Link>`** — Header, Footer, cards, CTAs. A repo grep for `<a href="/…` (raw internal anchors) returns none. Raw `<a>` is used only for `tel:`/WhatsApp external links, which is correct.
- **404 handling exists at the route level:** `blog/[slug]/page.tsx:42` calls `notFound()` for unknown slugs. (But see Missing: no custom `not-found.tsx` — falls back to Next's default.)
- **SEO-friendly slugs:** all service slugs (`spine-back`, `knee-joint`, `post-surgical-rehab`, etc.) and blog slugs are lowercase, hyphenated, and descriptive.
- **Blog posts are statically pre-rendered** via `generateStaticParams` (`blog/[slug]/page.tsx:13-15`) — good for crawlability and performance.
- **Doctor images have descriptive, keyword-relevant alt text:** `DoctorSpotlight.tsx:73` ("Dr. Ajay Agarwal (PT), founder of Elavivephysio") and `FounderProfile.tsx:36` ("Dr. Ajay Agarwal, Founder & Director of Elavive Physio"). Decorative images correctly use `alt=""` (`Hero.tsx:40`, `VideoTestimonials.tsx:45`).
- **No redirect chains.** No `redirects()` in `next.config.mjs` and no `redirect()` calls in app code — nothing that could chain.
- **Blog article body has proper heading structure** (h2/h3), paragraph breaks, lists, blockquote — good *typographic* hierarchy (the problem is that it's duplicate placeholder text, C4, not the structure).
- **`reactStrictMode: true`** and clean image `remotePatterns` config in `next.config.mjs`.

---

## Missing But Recommended

| Item | Status | Recommendation |
|------|--------|----------------|
| `app/sitemap.ts` | ❌ Missing | **Critical (C1).** Generate from static routes + service + blog slugs. |
| `app/robots.ts` or `public/robots.txt` | ❌ Missing | **Critical (C2).** Include `Sitemap:` reference. |
| JSON-LD structured data | ❌ Missing everywhere | **Critical (C3).** See next section. |
| Custom `app/not-found.tsx` | ❌ Missing | Add a branded 404 with links back to key pages (helps UX + internal linking; Next serves a bare default today). |
| OG image asset (`/public/og-*.png`) + `openGraph.images` | ❌ Missing | Add a 1200×630 branded image; without it social shares have no card image (H1). |
| Per-page `openGraph`/`twitter` overrides | ❌ Only on homepage | Add to each page + `article` metadata for blog (H1). |
| `app/manifest.ts` / `manifest.json` + favicons | ❌ Missing | Add a web manifest and favicon set (PWA/branding; minor SEO/UX signal). |
| Real NAP + Google Maps embed of actual location | ❌ Placeholder | **Critical (C5)** — blocks accurate LocalBusiness schema. |
| ISO publish dates for blog | ❌ Display strings only | Needed for `Article` schema + sitemap `lastModified` (M4). |

---

## Structured Data Recommendations (what JSON-LD schemas to add and where)

All of the below are currently **absent** and should be added as `<script type="application/ld+json">` (a small server component rendered inside each relevant page/layout).

1. **`MedicalBusiness` / `Physiotherapy` (or `MedicalClinic`) — sitewide, ideally in `layout.tsx` or on `/` and `/contact`.** Highest priority for local ranking and Google Maps/knowledge panel. Include:
   - `name` ("Elavive Physio — Spine & Knee Clinic"), `url`, `logo`, `image`
   - `address` (`PostalAddress` with street/city Jaipur/region Rajasthan/postal code/country IN) — **requires real address (C5)**
   - `telephone` — **requires real phone (C5)**
   - `geo` (`GeoCoordinates`) — from the real map pin
   - `openingHoursSpecification` (Mon–Sat 09:00–19:00 per `ContactBody.tsx:157`)
   - `priceRange`, `aggregateRating` (4.9★ from `STATS` in `data.ts:40`), `medicalSpecialty: "Physiotherapy"`
   - `sameAs` (Google Business Profile, social links once available)

2. **`Physician` / `Person` for Dr. Ajay Agarwal — on `/about` (and referenced from the clinic schema as `employee`/`founder`).** Name, `jobTitle`, `qualifications` (from `FounderProfile.tsx:6-7` credentials), `alumniOf`, `memberOf`.

3. **`MedicalWebPage` + `MedicalCondition`/`MedicalTherapy` — on each `/services/<slug>` page.** Ties each service page to the conditions it treats (data already in `SERVICE_DETAILS[...].conditions`), strengthening topical relevance for condition + city queries.

4. **`BreadcrumbList` — on `/services/<slug>` and `/blog/<slug>`.** Home → Services → Spine & Back, etc. Enables breadcrumb rich results and reinforces site hierarchy.

5. **`Article` / `BlogPosting` — on each `/blog/<slug>` page.** `headline`, `description` (excerpt), `author` (Person: Dr. Ajay Agarwal), `datePublished`/`dateModified` (needs ISO dates, M4), `image`, `publisher`. Note: pair this with fixing the duplicate body (C4) — marking up duplicate placeholder text as `Article` will not help.

6. **`FAQPage` — opportunity on service pages and/or contact.** If a short FAQ is added per condition, this can win FAQ rich results for "how long does frozen shoulder take to heal" style queries.

7. **`WebSite` + `SearchAction` (optional) — sitewide.** Minor; enables sitelinks search box eligibility if/when on-site search exists.

---

## Local SEO Checklist Status

| Check | Status | Detail |
|-------|--------|--------|
| "Jaipur" in title of every key page | ✅ **Pass (key pages)** | Home, About, Services, Contact, and all 6 service pages include "Jaipur" in the `<title>`. |
| "Jaipur" in `/blog` and article titles | ⚠️ Partial | `/blog` listing title omits Jaipur; individual article titles are topical, not local — acceptable for blog. |
| Clinic name consistency | ❌ **Inconsistent** | Three variants in use: "Elavive Physio" (metadata, most components), "Elavivephysio" (logo `Header.tsx:52`, `Footer.tsx:18`, alt text `DoctorSpotlight.tsx:73`), and "Elavive Physio — Spine & Knee Clinic" (`data.ts:9`). Pick one canonical business name and use it verbatim everywhere (especially in NAP + schema) for citation consistency. |
| LocalBusiness JSON-LD (name/address/phone/hours) | ❌ **Missing** | None present anywhere (C3). Directly impacts Google local pack + Maps. Highest-value local fix. |
| Google Maps embed on contact page | ⚠️ Present but generic | `ContactBody.tsx:179-186` embeds a map, but centred on "Jaipur, Rajasthan" generically, not the clinic address (TODO, `ContactBody.tsx:11-13`). |
| NAP consistency (Name/Address/Phone) | ❌ **Fails — placeholder + inconsistent** | Phone is `+91 XXXXX XXXXX` placeholder (`data.ts:19`); WhatsApp `91XXXXXXXXXX`; address differs between Footer ("C-Scheme, Jaipur, Rajasthan") and Contact cards ("Jaipur, Rajasthan"); name varies (see above). No real, consistent NAP exists yet. |
| Opening hours published | ✅ Present (needs schema) | Mon–Sat 9:00–19:00, Sun by appointment (`ContactBody.tsx:157-159`) — but marked TODO to confirm, and not in schema. |
| Region/locale signals | ✅ Pass | `locale: "en_IN"` (`layout.tsx:44`), `lang="en"`, Rajasthan referenced in About description. |

**Local SEO bottom line:** the *content* is well-localised (Jaipur in titles, region references, hours), but the *machine-readable* local layer — LocalBusiness schema, a real geocoded map, and consistent real NAP — is entirely missing. These are the items that actually drive Google local pack and Maps ranking, and they're also the ones gated on the clinic supplying real contact details.

---

## Top 7 Fixes, Ranked

1. **Add `MedicalBusiness`/LocalBusiness JSON-LD** (needs real NAP first) — C3, C5.
2. **Add `app/sitemap.ts` and `app/robots.ts`** — C1, C2.
3. **Replace duplicate blog placeholder body with unique per-article content** — C4.
4. **Add per-page Open Graph/Twitter (incl. `article` type + an OG image)** — H1.
5. **Expand service sub-pages past 300–500 words and work city+condition keyword into the H2/first paragraph** — H2, H3, H4.
6. **Trim over-length titles/descriptions** (Home desc 165, About 66, Blog 67, Shoulder 82, Neuro 76, all blog titles) — H5, H6.
7. **Add custom `not-found.tsx`, favicons/manifest, and set the real production domain in `metadataBase`** — Missing/M6.
