# Elavivephysio — Mobile Friendliness Audit

**Method:** Static analysis of the responsive Tailwind classes across every page
and component, simulating rendering at **375px** (iPhone SE — primary target),
**390px** (iPhone 14), **414px** (iPhone Plus), **768px** (iPad), and **1024px**
(desktop minimum). No code was changed — this is diagnosis only.

**Scope covered:** `layout.tsx`, `globals.css`, `tailwind.config.ts`, homepage
(`Header`, `Hero`, `HeroParticles`, `TrustBar`, `ServicesGrid`, `WhyChooseUs`,
`DoctorSpotlight`, `VideoTestimonials`, `Testimonials`, `FinalCTA`, `Footer`,
`WhatsAppButton`), `/about` (7 sections), `/services` + `ServicesExplorer` + 6
service detail pages (`ServiceDetail`), `/contact` (`ContactBody`, `ContactForm`,
`CalendlyEmbed`), `/blog` + article pages (`BlogListing`, `ArticleCard`,
`ArticleBody`), and shared `CtaBanner` / `BlurText`.

---

## Mobile Health Score (out of 10)

### **7.5 / 10 — Good, with fixable touch-target and typography gaps**

This is a genuinely well-built responsive site. Almost every grid collapses
correctly, the horizontal services rail becomes a vertical stack on mobile,
images sit in aspect-ratio boxes (near-zero CLS), the particle field reduces its
count on phones, and forms use correct input types and autocomplete. The site
does **not** have broken/overflowing layouts at 375px.

Points are deducted for: (1) a hero headline larger than the recommended mobile
size, (2) a cluster of **sub-44px touch targets** (blog filter chips, inline
text links, footer links), and (3) reliance on a global `overflow-x: hidden`
that hides — rather than prevents — any overflow.

**Per-breakpoint summary**

| Width | Verdict | Notes |
|-------|---------|-------|
| 375px | ✅ Works | Hero headline (41.6px) is large but copy is short ("Move better." / "Live fully.") so it does not wrap awkwardly or overflow. Touch-target issues are the main concern. |
| 390px | ✅ Works | Same as 375, marginally more breathing room. |
| 414px | ✅ Works | Comfortable. |
| 768px | ✅ Works | Grids move to 2-col; services rail is still vertical (`md:flex-row` triggers at 768, so the horizontal rail + drag actually begins here — see notes). |
| 1024px| ✅ Works | Full desktop layout. |

---

## Critical Mobile Issues
*(broken layouts, overflowing content, untappable elements)*

**No hard-broken layouts were found.** There is nothing that overflows the
viewport, overlaps illegibly, or is completely untappable at 375px. The items
below are the closest things to "critical" and should be treated as the
highest-priority polish:

1. **Global `overflow-x: hidden` on `<body>` masks overflow rather than
   preventing it** — `globals.css:26`. Any element that *does* exceed the
   viewport width will be silently clipped (content cut off) instead of
   producing a scrollbar you'd notice in testing. This is a safety net that can
   hide real bugs. It is not itself a break, but it means visual testing on a
   real device is essential — a clipped element won't announce itself.

2. **Hero display headline is larger than the mobile recommendation** —
   `Hero.tsx:70`, `text-[2.6rem]` = **41.6px** at 375px (the brief recommends
   `text-3xl`/30px or smaller for a mobile hero). It does **not** overflow today
   *only because* the copy is two very short lines ("Move better." / "Live
   fully."). If the client ever edits `HERO.headlineLine1/2` in `data.ts:29-30`
   to something longer, it will wrap poorly or clip. Fragile by content.

3. **Blog category filter chips are below the minimum tap size** —
   `BlogListing.tsx:65`, `px-4 py-2 text-sm` → **~36px tall**. These are the
   primary interactive control on the blog index and sit in a horizontally
   scrollable row, making small mistaps likely on a phone.

---

## Touch Target Failures
*(Apple HIG minimum is 44×44px — every element below that, with computed size)*

| Element | File / line | Classes | Computed size | Shown on mobile? |
|---------|-------------|---------|---------------|------------------|
| Blog filter chips ("All", categories) | `BlogListing.tsx:65` | `px-4 py-2 text-sm` | **~36px tall** | ✅ Yes |
| Footer nav links (About/Services/Blog/Contact) | `Footer.tsx:39` | `text-sm`, no padding | **~20px tall** | ✅ Yes |
| Footer phone + "Book an appointment" links | `Footer.tsx:57,65` | `text-sm`, no padding | **~20px tall** | ✅ Yes |
| "Explore full treatment" link (services rail) | `ServicesExplorer.tsx:110` | `text-sm` inside a 64px bar | **~20px tall** target | ✅ Yes |
| "Read full story" (Doctor spotlight) | `DoctorSpotlight.tsx:104` | `text-sm` inline | **~20px tall** | ✅ Yes |
| "All Services" back link (service detail) | `ServiceDetail.tsx:50` | `text-sm` inline | **~20px tall** | ✅ Yes |
| "Back to all articles" (blog article) | `blog/[slug]/page.tsx:53` | `text-sm` inline | **~20px tall** | ✅ Yes |
| Video lightbox close button | `VideoTestimonials.tsx:122` | `h-10 w-10` | **40px** | ✅ Yes (when a video is opened) |
| Header "Book Appointment" pill | `Header.tsx:72` | `!px-5 !py-2.5 text-sm` | **~40px tall** | ⚠️ Only ≥640px (tablet) — undersized on iPad touch |

### Touch targets that PASS ✅
| Element | Size | Notes |
|---------|------|-------|
| Hamburger button (`Header.tsx:83`) | **44×44** (`h-11 w-11`) | Exactly meets minimum |
| Mobile menu nav links (`Header.tsx:129`) | **~56px tall** (`px-4 py-3.5 text-lg`) | Excellent |
| Mobile menu close (`Header.tsx:117`) | **44×44** | ✅ |
| Mobile menu "Book Appointment" (`Header.tsx:141`) | **48px** (`btn-primary w-full`) | Full-width ✅ |
| Floating WhatsApp button (`WhatsAppButton.tsx:18`) | **56×56** (`h-14 w-14`) | Meets the 56px recommendation exactly ✅ |
| Primary/secondary buttons (`.btn-primary`/`.btn-secondary`) | **48px** (`py-3.5 text-sm`) | ✅ |
| Hero WhatsApp/Call icon buttons (`Hero.tsx:100,108`) | **~48×52** (`btn-secondary !px-4`) | ✅ |
| CTA banner buttons (`FinalCTA`/`CtaBanner`/`AboutCTA`) | **52px** (`px-8 py-4`) | ✅ |
| Contact form inputs / select / textarea (`ContactForm.tsx:17`) | **48px** (`px-4 py-3`) | ✅ |
| Contact form submit (`ContactForm.tsx:203`) | **48px, full-width** (`w-full sm:w-auto`) | ✅ |
| Certifications accordion headers (`Certifications.tsx:119`) | **~60px tall** (`px-5 py-5`) | ✅ |
| Homepage service cards (`ServicesGrid.tsx:51,88`) | Entire card is one `<Link>` | ✅ Whole card tappable, not just "Explore →" |
| Blog article cards (`ArticleCard.tsx:12`) | Entire card is one `<Link>` | ✅ |
| Testimonial carousel arrows (`Testimonials.tsx:190,214`) | **44×44** (`h-11 w-11`) | ✅ (desktop-only control — see below) |
| Video testimonial thumbnails (`VideoTestimonials.tsx:34`) | `w-64/w-72 aspect-[3/4]` | Large ✅ |

---

## Typography Issues on Mobile

1. **Hero headline 41.6px on mobile** (`Hero.tsx:70`, `text-[2.6rem]`) — above
   the recommended `text-3xl` (30px). Works today only because the copy is
   short; **no responsive step-down exists between `text-[2.6rem]` and
   `sm:text-6xl`** so any longer headline would break. *Recommend a
   `text-3xl`/`text-4xl` mobile size.*

2. **Secondary page heroes use `text-4xl` (36px) at mobile** — About
   (`AboutHero.tsx:36`), Contact (`ContactBody.tsx:61`), Blog
   (`BlogListing.tsx:42`), Services (`ServicesExplorer.tsx:233`), Service detail
   (`ServiceDetail.tsx:69`). These wrap naturally on spaces and don't overflow
   at 375px, but 36px is a large starting size — headlines like "Specialised
   care for every kind of movement" consume significant vertical space. Not
   broken, but on the heavy side for a 375px screen.

3. **No `break-words` / `overflow-wrap` anywhere** — currently harmless because
   there are no long unbroken strings (all credentials, institution names, and
   copy contain spaces, e.g. "Johns Hopkins University" wraps fine at
   `Certifications.tsx:60`). ⚠️ Risk: the long credential string in
   `FounderProfile.tsx:6-7` ("BPT, MPT (Neurology), MHA, MIAFT, MJPN, COMT, CKT
   (USA), CDNT, CSCIS (Hyderabad)") only wraps because of the commas/spaces — if
   a future email address or URL is dropped into body copy it would overflow.
   Consider adding `break-words` defensively to user/CMS-fed text.

4. **Small text used only for labels/meta — acceptable** ✅: `eyebrow` is
   `text-xs` (12px) but it's an uppercase label (`globals.css:56`); TrustBar
   stat labels are `text-xs` on mobile then `sm:text-sm` (`TrustBar.tsx:76`);
   blog byline/read-time and article-card meta are `text-xs`
   (`ArticleCard.tsx:30`, `blog/[slug]/page.tsx:70`). None of these are body
   copy, so they're within acceptable use. **Body copy is consistently
   `text-sm`/`text-base`** — no 12px body text found. ✅

5. **Line-heights are comfortable** ✅ — body copy uses `leading-relaxed`
   throughout; headings use `leading-[1.05]`–`leading-tight`. Good for reading.

---

## Animation Performance Concerns

1. **Particle field — degrades well** ✅ (`HeroParticles.tsx:77-81`): count is
   reduced to **26** below 640px (vs 40 tablet / 54 desktop), DPR capped at 2,
   drawn from a single pre-rendered sprite (no per-frame gradients), pauses on
   `visibilitychange`, and renders a single static frame under
   `prefers-reduced-motion`. This is a textbook lightweight implementation.

2. **Marquee row runs continuously** (`VideoTestimonials.tsx:96`,
   `animate-marquee` 45s infinite) — GPU-friendly `translateX` transform, but it
   never stops on mobile unless touched. Continuous compositor work; also the
   list is rendered **twice** (`:100-101`) doubling the DOM/image count. Minor
   battery/jank cost on low-end phones. It is correctly clipped by two nested
   `overflow-hidden` wrappers so it causes **no horizontal page overflow** at
   375px. ✅

3. **Testimonials sticky-stack uses scroll-scrubbed GSAP** on mobile
   (`Testimonials.tsx:58-79`, `scrub: true`) — animates `scale`/`opacity` per
   scroll frame across up to N cards. Transform/opacity-only so it stays on the
   compositor, but scrubbed ScrollTriggers are the most likely source of jank on
   low-end devices here. Worth watching on a real budget phone.

4. **Infinite `breathe` (box-shadow) on the floating WhatsApp button**
   (`WhatsAppButton.tsx:18`, `tailwind.config.ts` keyframes) — animating
   `box-shadow` triggers repaints, but the area is tiny (56px). Negligible.

5. **`soft-pulse` opacity tint on the featured service card**
   (`ServicesExplorer.tsx:54`) — opacity-only, cheap. Fine.

6. **CLS / layout shift** ✅ — every `next/image` uses `fill` inside an explicit
   aspect-ratio box (`aspect-[4/5]`, `aspect-[3/4]`, `aspect-[4/3]`, hero
   `h-[46%] w-full`), so image space is reserved and there are no raw `<img>`
   tags missing dimensions. Fonts use `display: "swap"` via `next/font`
   (`layout.tsx:10,17`) — minor FOUT possible but next/font applies size-adjust.
   Low CLS risk overall.

---

## Form Usability on Mobile

All good here — this is the strongest area of the site.

- ✅ **Correct input types**: phone is `type="tel"` (`ContactForm.tsx:134`) so
  the numeric keypad appears; name is `type="text"`. *(No email field exists on
  the form, so `type="email"` is N/A — flag only if an email field is added
  later.)*
- ✅ **Autocomplete attributes set**: `autocomplete="name"`
  (`ContactForm.tsx:107`) and `autocomplete="tel"` (`:135`) for fast mobile
  fill. *(The condition `<textarea>` and call-time `<select>` correctly have
  none.)*
- ✅ **Submit is full-width on mobile**: `w-full sm:w-auto`
  (`ContactForm.tsx:203`).
- ✅ **Field height is tappable**: `px-4 py-3` ≈ **48px** tall inputs, select,
  and textarea — comfortably above 44px.
- ✅ **Native `<select>`** for call time (`:187`) → uses the OS picker on mobile.
- ✅ Inline validation clears on input and uses `aria-invalid`/`aria-describedby`
  — accessible and mobile-friendly.

Minor: consider `inputmode="tel"` is already implied by `type="tel"`, so nothing
required.

---

## ✅ Mobile Checks Passed

**Layout / grids**
- ✅ Every section has ≥ `px-5` (20px) horizontal padding — no edge-to-edge
  content sections. (`section-padding` = `px-5`, plus explicit `px-5` on Hero,
  TrustBar, Footer, CTA banners, page heroes.)
- ✅ **All multi-column grids collapse to a single column on mobile**: ServicesGrid
  (`grid-cols-1 sm:… lg:…`), WhyChooseUs, CoreValues, Footer, Blog grid,
  ServiceDetail conditions/approach, Contact cards (`grid-cols-1 md:grid-cols-3`),
  Contact form/info (`lg:grid-cols-2`), MissionVision (`md:grid-cols-2`).
- ✅ **TrustBar handles 4 stats at 375px** → `grid-cols-2 md:grid-cols-4` = clean
  **2×2** (`TrustBar.tsx:56`). Services stats bar does the same (`grid-cols-2
  md:grid-cols-4`).
- ✅ **Horizontal services explorer collapses to a vertical stack on mobile** —
  `flex flex-col gap-5 … md:flex-row md:overflow-x-auto` with cards `w-full` →
  `md:w-[380px]` (`ServicesExplorer.tsx:275,44`). The drag/scroll rail only
  activates at `md` (768px+); mobile is a plain vertical stack. Progress bar is
  `hidden md:block` (desktop only). *(Note: because the rail begins at `md`, the
  horizontal swipe experience appears on tablet, not phones — see Testing
  Checklist.)*
- ✅ **Doctor spotlight two-column stacks** (`grid-cols-1 lg:grid-cols-2`,
  `DoctorSpotlight.tsx:60`); ClinicStory and FounderProfile likewise.
- ✅ **Contact form + info panel stack** (`grid-cols-1 lg:grid-cols-2`).
- ✅ **Contact three cards stack cleanly** at 375px with no overlap
  (`grid-cols-1 md:grid-cols-3`).
- ✅ **Blog grid collapses 3-col → 1-col** (`grid-cols-1 sm:grid-cols-2
  lg:grid-cols-3`).
- ✅ **Certifications accordion** handles long names — header uses `flex-wrap`
  (`Certifications.tsx:121`) and items wrap on spaces; "Johns Hopkins
  University" / "Certified Electrodiagnostic Evaluator (EMG)" do not overflow.
- ✅ **Video marquee causes no horizontal page overflow** — double `overflow-hidden`
  wrappers contain the `w-max` track.
- ✅ **Calendly placeholder is contained** within the viewport (`w-full`,
  `min-h-[600px]`, inside `container-content` with `px-5`).
- ✅ **Google Maps iframe is responsive** — `w-full`, `h-[280px] sm:h-[420px]`
  (`ContactBody.tsx:185`), not a fixed pixel width.

**Header / navigation**
- ✅ Hamburger opens a full-screen overlay with backdrop
  (`fixed inset-0 z-[60]`), locks body scroll (`Header.tsx:29`), and closes on
  link tap or backdrop click.
- ✅ Overlay panel is `w-[82%] max-w-sm` sliding from the right with a dimmed
  full-screen backdrop — covers the screen appropriately.
- ✅ Mobile nav links are ~56px tall — easily tappable.
- ✅ "Book Appointment" remains accessible on mobile via the full-width button
  pinned to the bottom of the drawer (`Header.tsx:141`).
- ✅ Logo "Elavivephysio" (`text-xl`, ~145px wide) does **not** truncate at 375px
  alongside the 44px hamburger.

**Hero / mobile-specific**
- ✅ Uses `min-h-[100svh]` (small-viewport unit) — avoids the mobile
  browser-chrome jump that `100vh` causes.
- ✅ **Hero illustration on mobile** does not disappear — it moves to a full-width
  band across the top 46% (`h-[46%] w-full sm:h-full sm:w-[58%]`,
  `Hero.tsx:35`), with the copy stacked below (`justify-end` on mobile). Clear,
  intentional mobile layout.
- ✅ Scroll cue is hidden on mobile (`sm:flex`) — no wasted space.

**Motion & accessibility**
- ✅ `prefers-reduced-motion` is honoured site-wide (`globals.css:39-50`) and
  individually in HeroParticles, BlurText, TrustBar counters, DoctorSpotlight,
  Testimonials, and the video marquee (falls back to a manual scroll row).

---

## Priority Fix List
*(ordered by impact on real mobile users)*

1. **Enlarge sub-44px tap targets.** Highest real-world impact. Specifically:
   - Blog filter chips → bump to `py-2.5`/`min-h-11` (`BlogListing.tsx:65`).
   - Add vertical padding to inline text links that are primary actions:
     "Explore full treatment" (`ServicesExplorer.tsx:110`), "Read full story"
     (`DoctorSpotlight.tsx:104`), "All Services" / "Back to all articles" back
     links, and footer nav links (`Footer.tsx`). Give them `inline-flex
     min-h-[44px] items-center` or a `py-2`.
   - Video lightbox close `h-10 w-10` → `h-11 w-11` (`VideoTestimonials.tsx:122`).

2. **Add a mobile step-down for the hero headline.** Change
   `text-[2.6rem]` → something like `text-3xl xs:text-4xl sm:text-6xl`
   (`Hero.tsx:70`) so it stays ≤30–36px on phones and is robust to longer copy.

3. **Fix the header "Book Appointment" pill height on tablet.** `!py-2.5` yields
   ~40px; it's visible from 640px up (including iPad touch). Bump to `!py-3`
   (`Header.tsx:72`).

4. **Reconsider the global `overflow-x: hidden`.** Keep it if desired as a safety
   net, but do a real-device pass to confirm nothing is being *clipped* by it
   (`globals.css:26`). Ideally fix any overflow at the source instead.

5. **Add defensive `break-words` to CMS/user-fed text** (blog titles, article
   bodies, founder credentials) to protect against future long URLs/emails
   (`FounderProfile.tsx:6`, `ArticleBody.tsx`, `ArticleCard.tsx:21`).

6. **Watch marquee + scrubbed sticky-stack on low-end phones.** Consider pausing
   the marquee when off-screen (IntersectionObserver) and profiling the
   testimonials scrub on a budget Android (`VideoTestimonials.tsx:96`,
   `Testimonials.tsx:58`).

---

## Recommended Testing Checklist
*(manual testing on a real device once fixes are applied)*

**Devices:** at minimum a physical iPhone SE (375px) and one budget Android
(360–412px). Ideally also an iPad (768px).

- [ ] **375px, every page loads with no horizontal scroll** — and, because of
      the global `overflow-x: hidden`, actively check that **no content is
      clipped** at the right edge (headlines, cards, the hero illustration).
- [ ] **Hero:** headline reads on 1–2 lines without touching the screen edges;
      illustration sits above the copy; both CTAs and the WhatsApp/Call icon
      buttons are easily tappable.
- [ ] **Header:** tap the hamburger — overlay covers the screen, body scroll is
      locked, links are large, "Book Appointment" is reachable at the bottom,
      backdrop tap closes it.
- [ ] **TrustBar:** confirm the 4 stats render as a clean 2×2 and the count-up
      animation fires.
- [ ] **Homepage services:** confirm the *entire* card is tappable (not just
      "Explore"); the featured card is full-width.
- [ ] **/services rail:** on a **phone** confirm it's a vertical stack; on a
      **tablet (768px)** confirm the horizontal drag/scroll rail works and tapping
      a card toggles the "Conditions we treat" drawer without accidental
      navigation.
- [ ] **Video testimonials:** confirm the marquee scrolls, pauses on touch, does
      **not** create a horizontal scrollbar, and the lightbox opens/closes (test
      the close button size).
- [ ] **Testimonials:** scroll through the mobile sticky-stack — confirm cards
      stack/scale smoothly with no jank on the budget Android.
- [ ] **/about:** open each certification accordion; confirm long names ("Johns
      Hopkins University", "Certified Electrodiagnostic Evaluator (EMG)") wrap
      without overflow; check the founder credential string wraps cleanly.
- [ ] **/contact:** confirm the 3 detail cards stack, the Calendly box is fully
      inside the viewport, and the map iframe fills width. Fill the form: tapping
      **Phone** must raise the **numeric keypad**; name/phone should offer
      autocomplete; the submit button must be full-width.
- [ ] **/blog:** tap through the category filter chips (check tap accuracy after
      the size fix); confirm the grid is 1-col and cards are fully tappable.
- [ ] **Blog article + service detail pages:** check the back links and any
      inline CTAs are comfortably tappable; body typography is readable.
- [ ] **Floating WhatsApp button:** confirm it's 56px, not obscuring content, and
      launches WhatsApp.
- [ ] **Reduced motion:** enable "Reduce Motion" in OS settings and reload —
      particles should be static, the marquee should become a manual scroll row,
      and count-ups/reveals should appear without animation.
- [ ] **Orientation:** rotate to landscape on the phone and re-check the hero and
      the mobile menu overlay.
