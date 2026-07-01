# Elavivephysio — UI/UX/Security/Performance Diagnostic

_Diagnosis only — no code was changed. Audited the full `src/` tree (55 files, ~5.8k LOC), `next.config.mjs`, `tailwind.config.ts`, `public/`, plus a clean `next lint` and a successful `next build`._

_Environment note: this report reflects static code analysis + build output. Live-browser checks (actual paint, real console output, Lighthouse) were not run — items depending on runtime are marked **(needs browser verification)**._

---

## Summary

| Category | Score | One-liner |
|---|---|---|
| **UI/UX** | **8 / 10** | Cohesive, well-tokenized design system; a few button-style/heading-hierarchy inconsistencies and keyboard-focus gaps hold it back from a 9. |
| **UAT / Functionality** | **8 / 10** | Every route, CTA and nav link resolves correctly and the form validates + shows success; the only gap is that all backends (form, Calendly, WhatsApp number, videos) are intentional placeholders. |
| **Security** | **6 / 10** | No secrets, no XSS, all external links carry `rel="noopener noreferrer"`, no `dangerouslySetInnerHTML` — but **zero security headers** are configured and the Maps iframe is unsandboxed. |
| **Performance** | **9 / 10** | Fully static export, GSAP/heavy sections code-split, `three.js` correctly tree-shaken out, RAF/listeners cleaned up properly, fonts self-hosted with `display=swap`. Excellent. |

**Build health:** `next build` passes cleanly — 20/20 static pages generated, no type errors, no lint errors. First Load JS 102 kB shared, 161–172 kB per page.

---

## Critical Issues (must fix before launch)

### C1 — No security headers anywhere (`next.config.mjs`)
`next.config.mjs` defines `images` and `transpilePackages` but **no `async headers()` block**. The site ships with none of:
- `Content-Security-Policy`
- `X-Frame-Options` (site can be iframed → clickjacking)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Strict-Transport-Security`
- `Permissions-Policy`

For a healthcare site collecting patient names/phone numbers/conditions this is the single most important pre-launch fix. Note a strict CSP will need to allow the Google Maps embed (`https://www.google.com`) and, once wired, Calendly.

### C2 — Contact form collects PHI-adjacent data but has no backend and no transport guarantees (`src/components/ContactForm.tsx:39`)
The inquiry form gathers **name, phone number, and a free-text medical condition** ("what brings you in"), then on submit simply sets `submitted = true` (`ContactForm.tsx:40`) — the data goes nowhere. Before launch this must post to a real, TLS-terminated handler (the TODO names Formspree/Supabase/email). Until then the form is non-functional for its purpose and, worse, could give patients the false impression their sensitive details were transmitted (the success screen says _"Dr. Agarwal's team has received your details"_ — `ContactForm.tsx:75`, which is currently untrue). Treat the medical free-text field as sensitive data when the backend is chosen (consent, retention, encryption).

---

## High Priority Issues (should fix before launch)

### H1 — Google Maps iframe has no `sandbox` attribute (`src/components/ContactBody.tsx:179`)
The embed sets `referrerPolicy`, `loading="lazy"`, `title` and `allowFullScreen` but no `sandbox`. Add a minimal `sandbox="allow-scripts allow-same-origin allow-popups"` (Maps needs scripts + same-origin to function) to constrain the frame. Combined with C1's missing `X-Frame-Options`/`frame-ancestors`, framing posture is currently unconstrained in both directions.

### H2 — Focusable content inside an `aria-hidden` container: closed mobile menu (`src/components/Header.tsx:92-135`)
The mobile overlay wrapper toggles `aria-hidden={!menuOpen}` and `pointer-events-none` when closed, **but the `<Link>`s inside stay in the tab order**. A keyboard user on desktop/tablet (or a screen-reader user) can Tab into the 5 nav links + "Book Appointment" button of a menu that is visually hidden. Fix by also gating `tabIndex={-1}` on the links (and CTA) when `!menuOpen`, or by not rendering them when closed. (The video marquee got this right with `tabIndex={-1}` on duplicates — `VideoTestimonials.tsx:37` — the menu should match.)

### H3 — Keyboard focus ring removed on the services card disclosure button (`src/components/services/ServicesExplorer.tsx:64`)
The full-card toggle button uses `focus-visible:outline-none` with no replacement indicator. A keyboard user tabbing the `/services` explorer gets no visible focus on the primary interactive element of each card. The drawer does reveal via `group-focus-within`, and the separate "Explore full treatment" link keeps its ring, but the disclosure button itself is invisibly focused. Restore a visible `focus-visible` style.

### H4 — Heading hierarchy skips `h1 → h3` on `/services` and `/blog`
- `/services` (`ServicesExplorer.tsx`): `h1` ("Specialised care…" line 231) is followed directly by service-card `h3`s (line 74) with no intervening `h2`. The stats strip uses `<dl>` (no heading), so it's a genuine level skip.
- `/blog` (`BlogListing.tsx`): `h1` ("Move smarter, recover faster" line 40) is followed directly by article-card `h3`s (`ArticleCard.tsx:21`) with no `h2`.

Every other page is correct. Either demote the cards to `h2`, or add a visually-styled `h2` section label ("Our specialties" / "Latest articles").

---

## Medium Priority Issues (fix in first week post-launch)

### M1 — Primary-button color is inconsistent: contact "Send Message" is teal, not coral (`src/components/ContactForm.tsx:203`)
The design rule is coral (`#D85A30`) for primary actions. The form submit uses `btn-primary !bg-teal hover:!bg-[#0c5a46]`, overriding coral to teal. Every other primary CTA on the site is coral. Decide intentionally: either accept teal here (it's a within-card action) and document it, or revert to coral for consistency.

### M2 — CTA-banner primary buttons are a hand-rolled copy of `.btn-primary`, slightly larger and without a focus ring
`FinalCTA.tsx:47`, `CtaBanner.tsx:68`, `AboutCTA.tsx:47`, and `blog/[slug]/page.tsx:108` all repeat the same inline coral-button class (`px-8 py-4`) instead of using `.btn-primary` (`px-7 py-3.5`, `globals.css:82`). Two consequences:
1. Banner CTAs are visibly a size larger than the header/hero primary buttons (minor visual drift).
2. None of these four carry the `focus-visible:outline` that `.btn-primary` provides — so on the teal banner background the keyboard focus indicator falls back to the browser default (low contrast on teal). Consolidate onto `.btn-primary` (or a `btn-primary-lg` variant).

### M3 — Floating WhatsApp button can overlap bottom-right content on mobile (`src/components/WhatsAppButton.tsx:18`)
The FAB is `fixed bottom-5 right-5 z-40 h-14 w-14`. On narrow screens it sits over the bottom-right of every page — including the full-width form **Send Message** button and the footer's bottom-right corner — with no page bottom-padding reserved for it. `aria-label` is present and correct, and its `z-40` sits safely below the header (`z-50`) and modals (menu `z-60`, lightbox `z-80`), so no z-conflict — this is purely an overlap/tap-target concern. Consider adding bottom padding on mobile or nudging the FAB. **(needs browser verification for exact overlap)**

### M4 — Low-contrast placeholder / on-teal small text (WCAG AA)
Computed approximate ratios (sRGB):
- **Form input placeholders** `placeholder:text-muted/60` on white (`ContactForm.tsx:17`) ≈ **~2.3:1** — fails AA. Placeholders are advisory, but the low value hurts legibility; bump toward `muted/80`.
- **"Video coming soon"** `text-white/70` `text-sm` on teal (`VideoTestimonials.tsx:145`) ≈ **~4.0:1** — fails AA for normal text. (Placeholder screen, low real-world impact.)
- **Borderline (passes, barely):** `text-muted` (`#6B6B63`) on `surface` (`#F0F3EF`) ≈ **~4.7:1**, and `text-white/80` on teal ≈ **~4.7:1** — both pass AA but have little headroom; worth watching if the palette shifts. Body `text-muted` on the main `#FAF8F3` background ≈ **~5.0:1** (fine). **(needs browser verification with a contrast tool)**

### M5 — Blog category tabs are an incomplete ARIA tab pattern (`src/components/blog/BlogListing.tsx:51-75`)
`role="tablist"` + `role="tab"` + `aria-selected` are present, but there's no `role="tabpanel"`, no `aria-controls`/`id` wiring to the article grid, and no arrow-key navigation between tabs. Screen readers will announce "tab" and set expectations the markup doesn't meet. Either complete the pattern (tabpanel + keyboard) or drop the ARIA tab roles and treat them as simple filter buttons.

### M6 — No `sitemap.xml` or `robots.txt` (SEO)
No `src/app/sitemap.ts` or `src/app/robots.ts` exist. Metadata is otherwise strong (per-page canonicals, OpenGraph/Twitter, `metadataBase`, keywords), so this is the main SEO gap. Add both before launch; `generateStaticParams` already enumerates blog + service routes to feed a sitemap.

### M7 — `/services` `h1` is invisible without JavaScript (`src/components/services/ClipReveal.tsx:65`)
This ClipReveal variant renders the heading with inline `style={{ clipPath: "inset(0 100% 0 0)" }}` (fully clipped) and only opens it once GSAP runs. If JS fails or is disabled, the `/services` `h1` ("Specialised care for every kind of movement") is present in the DOM (crawlable) but **visually hidden**. The homepage/other ClipReveal (`components/ClipReveal.tsx`) avoids this by starting visible and animating opacity — prefer that approach here.

---

## Low Priority / Nice to Have

- **L1 — Dead code shipping unused heavy dependencies.** `src/components/scenes/` (`HeroCanvas`, `BodyModel`, `HeroFallback`, `heroBodyParts`), `src/lib/store.ts`, and `src/lib/useDeviceCapability.ts` are **not imported by any rendered component** (the 3D hero was retired — see `Hero.tsx:11-14`). Good news: the build confirms `three`/`@react-three/*` are **tree-shaken out of every page bundle** (no runtime cost). But `three` (30 MB) + `@react-three/*` (6.7 MB) + `@react-three/postprocessing` remain in `package.json`/`node_modules`, bloating install/CI time and inviting confusion. Remove the dead files and drop the deps, or document why they're retained.
- **L2 — `WhatsAppButton` is marked `"use client"` but has no state/effects** (`src/components/WhatsAppButton.tsx:1`). It only renders a static `<a>` from a pure `whatsappLink()` call — it can be a server component. Trivial bundle win.
- **L3 — Repeated `bg-coral` CTA class in 4 places** (see M2) is a DRY/maintainability smell independent of the focus-ring issue.
- **L4 — Footer copyright year is baked at build time** (`Footer.tsx:78`, server component using `new Date().getFullYear()`). A static build in Dec will show the old year in Jan. Minor.
- **L5 — No favicon / app icon / web manifest / apple-touch-icon** (`src/app/` has no `icon`, `favicon.ico`, or `manifest.ts`). Browsers will show a default icon.
- **L6 — No custom `loading.tsx` / `error.tsx` / `not-found.tsx`.** The homepage lazy sections use a `SectionSkeleton` (`page.tsx:23`), and `/blog/[slug]` calls `notFound()`, but there are no route-level loading skeletons or a branded 404/500. Since all pages are static/SSG this is low impact.
- **L7 — External runtime image dependency.** `DoctorSpotlight` loads the founder headshot from `https://i.pravatar.cc` at runtime (`data.ts:137`, rendered `unoptimized`). It's clearly flagged as a placeholder and visibly badged in the UI, but it's a third-party request on the homepage until the real portrait lands. **(needs browser verification — will error in the console if pravatar is unreachable)**
- **L8 — Reduced-motion is well handled** but the site relies entirely on JS-driven GSAP reveals for entrance animations; with JS off, most content is fine (starts visible) except the `/services` h1 (M7).

---

## Passed Checks (working correctly)

**Security**
- ✅ No hardcoded secrets/API keys/tokens anywhere in `src/`, `public/`, or config (`grep` for `api_key|secret|token|password|bearer|process.env` → none). No `.env` files committed; `.gitignore` correctly ignores `.env*`.
- ✅ Zero `dangerouslySetInnerHTML` usages.
- ✅ **All 5** `target="_blank"` links carry `rel="noopener noreferrer"` (Hero, FinalCTA, CtaBanner, ContactBody, WhatsAppButton).
- ✅ No user input rendered without React's default escaping; the only user-entered data (form) is never re-rendered as markup.
- ✅ Fonts are self-hosted via `next/font` (Fraunces + Inter) — no runtime request to `fonts.googleapis.com`, no third-party font CSS to integrity-check.
- ✅ Maps iframe sourced only from trusted `google.com`; Calendly is a not-yet-loaded placeholder (no live third-party script on the site today).

**UI/UX**
- ✅ Single source-of-truth design tokens in `tailwind.config.ts` + mirrored CSS vars in `globals.css`; colors/shadows/radii/fonts are used consistently via tokens across all pages.
- ✅ Reusable `.btn-primary` / `.btn-secondary` with proper `hover:scale`, `active:scale`, and `focus-visible:outline` (`globals.css:82-88`).
- ✅ Exactly one `<h1>` per page; homepage uses a proper SEO pattern (real `sr-only` `h1` + `aria-hidden` display headline — `Hero.tsx:58-80`). Hierarchy is correct on `/`, `/about`, `/contact`, `/services/*`, `/blog/[slug]` (skips only on `/services` + `/blog` — H4).
- ✅ Interactive elements have visible hover states throughout; cards use lift/translate, links use underline-grow or color shift.
- ✅ Contact form is genuinely accessible: real `<label htmlFor>` on every field, `aria-invalid`, `aria-describedby` wired to error nodes, `role="status"` success announcement, inline errors that clear on edit (`ContactForm.tsx`).
- ✅ Header transitions transparent → solid on scroll (`Header.tsx:20-25`, threshold 24px) and collapses to a hamburger with a slide-in overlay + body-scroll lock on mobile.
- ✅ Reduced-motion is respected everywhere (global CSS kill-switch + per-component `useReducedMotion` branches in GSAP, particles, marquee, typewriter, testimonials deck).
- ✅ Clean z-index ladder: content `0/1/10` → WhatsApp FAB `40` → header `50` → mobile menu `60` → video lightbox `80`. No conflicts.
- ✅ WhatsApp FAB has a correct `aria-label` and a real `wa.me/<number>?text=<encoded>` link structure (number is a flagged placeholder).

**UAT / Routing** (all verified by reading hrefs/slugs)
- ✅ Every "Book Appointment" CTA points to `/contact#booking` (Header ×2, Hero, FinalCTA, CtaBanner default, ServiceDetail, AboutCTA, blog article aside, Footer).
- ✅ `/contact` has `<section id="booking" className="scroll-mt-24">` (`ContactBody.tsx:71`) — the anchor target exists with scroll offset for the fixed header.
- ✅ All 6 service "Explore" links route to `/services/<slug>`, and all 6 slugs (`spine-back`, `knee-joint`, `shoulder`, `sports-injury`, `post-surgical-rehab`, `neuro-rehab`) have matching sub-pages that pull the correct `SERVICE_DETAILS` entry and canonical.
- ✅ Doctor spotlight "Read full story" → `/about` (`DoctorSpotlight.tsx:106`).
- ✅ Nav (Home/About/Services/Blog/Contact) and logo (→ `/`) all resolve.
- ✅ Empty-form submit shows all three validation errors; valid submit shows the success state.
- ✅ All 40 placeholder TODOs are explicit code comments (and several are surfaced visibly in the UI as badges/monospace notes) — none cause runtime errors; `next build` succeeds.

**Performance**
- ✅ Every page prerenders as static/SSG (20/20). First Load JS is lean (161–172 kB).
- ✅ Below-the-fold homepage sections (`VideoTestimonials`, `Testimonials`) are `next/dynamic` code-split with skeleton fallbacks (`page.tsx:15-21`), keeping them off the critical path while staying SSR-crawlable.
- ✅ `three.js` + R3F confirmed **absent from all bundles** (dead scenes tree-shaken).
- ✅ **No raw `<img>` tags** — all imagery uses `next/image` with `fill` + `sizes` + `alt`; the LCP hero image is `priority`. Dimensions are constrained by aspect-ratio parents → minimal CLS.
- ✅ Hero particle field uses plain Canvas2D (not WebGL), caps DPR at 2, reduces count on small screens, **pauses on tab hidden**, and **cancels `requestAnimationFrame` + disconnects `ResizeObserver` + removes the visibilitychange listener on unmount** (`HeroParticles.tsx:204-208`) — exactly the RAF cleanup asked about. Reduced-motion renders a single static frame with no loop.
- ✅ No memory leaks found in active code: every `useEffect`/listener/RAF/`setTimeout`/`IntersectionObserver`/`ResizeObserver` in Header, VideoTestimonials, Testimonials, ServicesExplorer, Typewriter, useReducedMotion, useDeviceCapability is cleaned up, and all have correct dependency arrays.
- ✅ Fonts load with `display: "swap"` and are self-hosted (no preconnect needed).
- ✅ `public/` is lean — largest asset is `hero-illustration.png` at **167 KB** (well under the 500 KB threshold); other assets are <1 KB SVGs.
- ✅ ESLint (`next/core-web-vitals`) passes with no warnings or errors.

---

## TODOs Found in Codebase

40 `// TODO` markers, all intentional placeholders for client-supplied content/config. None block the build. Grouped:

**Contact / identity (real data needed before launch)**
- `src/lib/data.ts:16,18` — real WhatsApp number & phone (`whatsappNumber: "91XXXXXXXXXX"`, `phoneDisplay: "+91 XXXXX XXXXX"`)
- `src/app/layout.tsx:20` — replace `SITE_URL` canonical/base with real production domain
- `src/components/Footer.tsx:21,27,56,77` — confirm clinic address, replace placeholder address, replace placeholder phone, confirm legal entity/year
- `src/components/ContactBody.tsx:11,109,142,160,172` — Maps embed URL, full street address, real clinic number, real hours, confirm map address

**Integrations to wire**
- `src/components/ContactForm.tsx:39,78,80` — wire form to real backend (Formspree/Supabase/email) — appears 3× incl. a visible on-screen note
- `src/components/CalendlyEmbed.tsx:15,20` — real Calendly URL + replace placeholder `<div>` with the inline widget
- `src/components/FinalCTA.tsx:52`, `src/components/CtaBanner.tsx:74`, `src/components/Hero.tsx:94` — real WhatsApp number

**Media / content**
- `src/lib/data.ts:135,147,154` — real founder portrait (currently pravatar); real video thumbnails + `videoSrc`
- `src/components/DoctorSpotlight.tsx:82` — replace with real portrait (visible badge)
- `src/components/about/FounderProfile.tsx:31,44` — real portrait of Dr. Ajay Agarwal (visible badge)
- `src/components/about/ClinicStory.tsx:44,57` — real clinic photo (visible badge)
- `src/components/Hero.tsx:37` — final brand illustration / clinic photo
- `src/components/VideoTestimonials.tsx:42,129,146` — placeholder thumbnails + real testimonial video files
- `src/components/blog/ArticleBody.tsx:9,15,63` — replace placeholder article body with real MDX/CMS content (intro, closing)
- `src/lib/data.ts:4,520,543` — replace seed blog articles/dates with real content
- `src/components/scenes/HeroFallback.tsx:8` — (dead code) optional pre-rendered 3D hero image

---

### Suggested pre-launch order
1. **C1** security headers → **C2** wire the form backend (+ don't claim receipt until it's real) → **H1** sandbox the Maps iframe.
2. **H2/H3/H4** accessibility (tab-trap in closed menu, restore focus ring, fix heading skips).
3. **M6** sitemap/robots, **M1/M2** button consistency + banner focus rings, **M4** contrast bumps.
4. Fill the 40 TODOs (real number, address, portraits, Calendly, videos, blog content).
5. **L1** delete dead `scenes/`/store/`useDeviceCapability` and drop `three`/R3F deps.
