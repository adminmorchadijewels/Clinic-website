# Elavivephysio — Content Accuracy Audit

> Diagnosis and reporting only. **No files were changed.**
> Scope: all `.ts` / `.tsx` files under `src/`. Source of truth = the VERIFIED REAL CONTENT list supplied for this audit.
> Date of audit: 2026-07-01.

---

## Summary

Overall the site content is **substantially accurate**. Core facts — clinic name, positioning, doctor name, the four headline stats (4+, 4,000+, 4.9★, 25+), the six services, the six core values, mission, vision, and education — all match the verified source of truth. No wrong stat numbers were found anywhere (`grep` for 12+/8,000/10,000/5.0/4.8/30+/50+ returned zero matches). The doctor's name is spelled correctly in every occurrence — no "Aarav", "Sharma", or "Dr. A. Agarwal" anywhere.

However, there are **real accuracy problems that must be fixed before launch**:

| Severity | Issue | Count |
|---|---|---|
| ❌ Critical | Hallucinated certifications not in the verified list | 2 |
| ❌ Critical | Verified certifications altered (words dropped/added) | 4 |
| ❌ Critical | Invented street locality ("C-Scheme") displayed in Footer | 1 |
| ❌ Critical | Text testimonials presented as real reviews with no placeholder/TODO marker | 8 |
| ⚠️ High | Doctor credentials string incomplete in `DOCTOR.qualification` (6 of 9 credentials missing) | 1 |
| ⚠️ High | Stat "25+" repurposed and mislabeled as "Certifications" on About page | 1 |
| ⚠️ Medium | Em-dash (`—`) used in rendered, user-facing copy (hard-requirement violation) | ~30 rendered + ~40 in comments |
| ⚠️ Medium | Invented clinic hours displayed (has TODO note) | 1 |

**Highest hallucination risk section: the About-page Certifications accordion** — it contains the only two fully invented certification entries and four altered ones.

---

## ❌ Critical Content Errors (wrong facts, hallucinated content)

### C1. Hallucinated certifications (NOT in the verified list)
File: `src/components/about/Certifications.tsx`

Every certification in the code must match one of the 18 verified certifications. Two do **not** appear in the verified list — they are invented full-name expansions of credential abbreviations (`CKT`, `CSCIS`) that appear in the credentials string but were never provided as certifications:

- **Line 40** — `"Certified Instrument Knack Therapist (CKT)"`, org `"USA"`
  → **Hallucinated.** No "Instrument Knack Therapist" certification exists in the verified list. `CKT(USA)` is only a credential abbreviation; the expanded name is invented.
- **Lines 42–44** — `"Certified Spinal Cord Injury Specialist"`, org `"CSCIS, Hyderabad"`
  → **Not in the verified certifications list.** `CSCIS(Hyderabad)` is only a credential abbreviation. (Note: the phrase "Certified Spinal Cord Injury Specialist" is also asserted as fact on the Neuro Rehab page — `src/lib/data.ts:472`.)

### C2. Verified certifications altered (words dropped or added)
File: `src/components/about/Certifications.tsx`

- **Line 25** — code: `"Certified Dry Needling Therapist (CDNT)"` — verified: **"Certified Diversified Dry Needling Therapist"**. The word **"Diversified"** was dropped.
- **Line 26** — code: `"Certified Cupping Therapist"` — verified: **"Certified Diversified Cupping Therapist"**. The word **"Diversified"** was dropped.
- **Line 16** — code: `"Certified Orthopedic and Manual Therapist (COMT)"` — verified has no "(COMT)" suffix (minor addition; institution matches).
- **Line 52** — code: `"Certified Diet & Nutrition Expert"` — verified: **"Certified Diet **and** Nutrition Expert"** (`&` vs `and`; minor).
- Global Healthcare group (lines 61–64) — titles are **shortened** from the verified names (institutions are correct):
  - `"Healthcare Entrepreneurship"` — verified: "Healthcare Entrepreneurship: **Taking Ideas to Market**"
  - `"Digital Health Interventions"` — verified: "**Evaluation of** Digital Health Interventions"
  - `"Health Informatics"` — verified: "**Social & Technical Context of** Health Informatics"
  - `"Public Health Practice"` — verified: "**Foundations of** Public Health Practice"

### C3. Invented street locality displayed to users
File: `src/components/Footer.tsx:28`
```
C-Scheme, Jaipur, Rajasthan
```
"C-Scheme" is a specific Jaipur locality that was **not** provided. Verified content says: no street address yet — should be TODO. A `// TODO: replace placeholder address.` comment sits directly above (line 27), but the invented locality still renders on every page. Verified location is only "Jaipur, Rajasthan". (Contrast: `ContactBody.tsx:108` correctly shows only "Jaipur, Rajasthan".)

### C4. Text testimonials presented as real, with no placeholder marker
File: `src/lib/data.ts:187–244` (`TESTIMONIALS`), rendered by `src/components/Testimonials.tsx`

Eight named text testimonials (Kavita M., Vikram S., Sunita R., Ramesh K., Priya T., Meena P., Arjun M., Rahul G.) are hard-coded with 5★ ratings and specific recovery stories and rendered as genuine patient reviews. **There is no `// TODO` / dummy marker** on this array, unlike the video testimonials. One quote (`data.ts:242`) even asserts *"Best physiotherapy clinic in Jaipur."* These read as real reviews but are not traceable to verified content. See §Testimonials Check.

---

## ⚠️ Em-Dash / Formatting Issues

**Hard requirement:** em dash (`—`), and `-`/`–` used as a sentence separator, must be removed. Raw `grep -rn "—" src/` and `grep -rn " - " src/` results below.

### A. Rendered, user-facing em-dashes (fix first — these are visible on the site)

| File | Line | Context |
|---|---|---|
| `src/lib/data.ts` | 9 | `fullName: "Elavive Physio — Spine & Knee Clinic"` (rendered site-wide) |
| `src/lib/data.ts` | 32 | Hero subheading `"...post-surgical recovery — evidence-based..."` |
| `src/lib/data.ts` | 54 | Spine blurbFull |
| `src/lib/data.ts` | 63 | Knee blurbFull |
| `src/lib/data.ts` | 72 | Shoulder blurbFull |
| `src/lib/data.ts` | 81 | Sports blurbFull |
| `src/lib/data.ts` | 90 | Post-surgical blurbFull |
| `src/lib/data.ts` | 99 | Neuro blurbFull |
| `src/lib/data.ts` | 124 | Pillar body `"...we don't treat everything — we treat what we're best at."` |
| `src/lib/data.ts` | 134 | Doctor bioTeaser `"...a single belief — every patient..."` |
| `src/lib/data.ts` | 235 | Testimonial quote `"...fix the injury — they fixed my running form too."` |
| `src/lib/data.ts` | 333 | Spine service outcome |
| `src/lib/data.ts` | 363 | Knee service description |
| `src/lib/data.ts` | 386 | Shoulder headline `"...impingement — we treat them all"` |
| `src/lib/data.ts` | 418 | Sports description |
| `src/lib/data.ts` | 462 | Post-surgical seoDescription |
| `src/lib/data.ts` | 472 | Neuro description |
| `src/lib/data.ts` | 505 | Service journey body |
| `src/lib/data.ts` | 565 | Blog excerpt (after-acl-surgery) |
| `src/lib/data.ts` | 595 | Blog excerpt (office-chair-posture) |
| `src/components/Hero.tsx` | 59 | `"Elavive Physio — Spine & Knee Clinic in Jaipur."` |
| `src/app/about/page.tsx` | 16 | Meta description `"...Elavive Physio — internationally certified..."` |
| `src/components/ContactBody.tsx` | 106 | `"Elavive Physio — Spine & Knee Clinic"` |
| `src/components/about/FounderProfile.tsx` | 59 | `"Founder & Director — Elavive Physio, Spine & Knee Clinic"` |
| `src/components/about/FounderProfile.tsx` | 95 | `"...certifications — including advanced training..."` |
| `src/components/about/ClinicStory.tsx` | 40 | `"...recovery goals — not a one-size-fits-all approach."` |
| `src/components/about/Certifications.tsx` | 170 | Renders `" — {item.org}"` as the name/org separator (every cert row) |
| `src/components/VideoTestimonials.tsx` | 143 | Renders `"{active.name} — {active.condition}"` |
| `src/components/blog/ArticleBody.tsx` | 58 | Blockquote `"...feel better today — it's to build a body..."` |
| `src/components/blog/BlogListing.tsx` | 46 | `"...pain management — from the team at Elavive Physio."` |
| `src/components/services/ServicesExplorer.tsx` | 239 | `"Drag to explore each specialty — from a stubborn spine..."` |

### B. Em-dashes in comments only (not rendered, but flagged per the hard requirement)
`src/lib/useReducedMotion.ts:7`, `src/lib/data.ts:2`, `src/lib/data.ts:18`, `src/components/CalendlyEmbed.tsx:2,11`, `src/components/ServicesGrid.tsx:10,18,49,85`, `src/components/HeroParticles.tsx:6,78,183`, `src/components/Testimonials.tsx:21`, `src/app/blog/[slug]/page.tsx:72`, `src/components/CtaBanner.tsx:19`, `src/components/Icons.tsx:81,89,97,153`, `src/components/Hero.tsx:14,24,29,48`, `src/components/services/ClipReveal.tsx:22`, `src/components/VideoTestimonials.tsx:30,42,129`, `src/components/about/CoreValues.tsx:41`, `src/components/about/FounderProfile.tsx:16,31`, `src/components/about/ClinicStory.tsx:7,44`, `src/components/ContactBody.tsx:11,70,94,112,145,160,172`, `src/components/ContactForm.tsx:14,54,86`, `src/components/scenes/heroBodyParts.ts:4,30`, `src/components/scenes/BodyModel.tsx:235,244`, `src/components/blog/ArticleBody.tsx:5`, `src/components/ClipReveal.tsx:25`, `src/components/about/MissionVision.tsx:17`, `src/components/services/ServicesExplorer.tsx:14,18,33,86,127`, `src/components/about/AboutHero.tsx:7,8`, `src/components/about/AboutCTA.tsx:9`, `src/components/about/Certifications.tsx:70`, `src/components/scenes/HeroCanvas.tsx:15,42,54`, `src/components/blog/ArticleCard.tsx:6`.

### C. En-dash (`–`) used as a separator in rendered copy
- `src/components/ContactBody.tsx:157` — `"Monday – Saturday: 9:00 AM – 7:00 PM"` (two en-dashes in visible clinic-hours text). Not caught by the `—` grep, but the same separator issue.

> Note: the `grep " - "` matches in `useDeviceCapability.ts`, `HeroParticles.tsx`, `Testimonials.tsx`, `BlurText.tsx`, `heroBodyParts.ts`, `BodyModel.tsx`, `ServiceDetail.tsx`, `ServicesExplorer.tsx`, `Certifications.tsx:81`, `HeroCanvas.tsx` are all **code/arithmetic or comment bullet lists** (e.g. `length - 1`, `now - last`, JSDoc `-` bullets), not sentence separators. No action needed.

---

## ⚠️ Stats Discrepancies

**No wrong stat numbers exist.** `grep -rn "12+\|8,000\|10,000\|5\.0\|4\.8\|30+\|50+\|15+\|10+" src/` returned **zero** matches. All four headline stats are correct:

- `src/lib/data.ts:37–42` (`STATS`, drives `TrustBar.tsx`): 4+ Years, 4,000+ Patients, 4.9★ Google Rating, 25+ Conditions Treated — ✅ all correct.
- `src/components/ContactBody.tsx:19–20`: "4,000+ patients", "4.9★ Google Rating" — ✅ correct.
- `src/components/about/FounderProfile.tsx:87`: "over 4 years of clinical experience and 4,000+ successfully treated patients" — ✅ correct.

**One mislabel (needs correction):**
- `src/components/about/FounderProfile.tsx:9–13` — stats row shows `{ value: "4+", "Years Experience" }`, `{ "4,000+", "Patients Treated" }`, **`{ "25+", "Certifications" }`**. The verified "25+" figure is **Conditions Treated**, not certifications. Here it has been **repurposed and relabeled** as "25+ Certifications" — which is also not independently verified (the accordion lists ~20 certifications, and the count 25+ for certifications was never provided). This is an unverified/mislabeled stat.

---

## ⚠️ Credential Issues

**Verified credentials (exact):** `BPT, MPT(Neurology), MHA, MIAFT, MJPN, COMT, CKT(USA), CDNT, CSCIS(Hyderabad)`

- ❌ **`src/lib/data.ts:132`** — `DOCTOR.qualification = "BPT, MPT (Neurology), MHA | Founder & Director"`.
  **Incomplete — 6 of the 9 credentials are missing:** MIAFT, MJPN, COMT, CKT(USA), CDNT, CSCIS(Hyderabad). This value is rendered on the homepage Doctor Spotlight (`DoctorSpotlight.tsx:99`).
- ⚠️ **`src/components/about/FounderProfile.tsx:6–7`** — `CREDENTIALS = "BPT, MPT (Neurology), MHA, MIAFT, MJPN, COMT, CKT (USA), CDNT, CSCIS (Hyderabad)"`.
  All 9 present and in the correct order ✅, but with **added spaces inside parentheses**: `MPT (Neurology)` vs verified `MPT(Neurology)`, `CKT (USA)` vs `CKT(USA)`, `CSCIS (Hyderabad)` vs `CSCIS(Hyderabad)`. Formatting-only, but flagged for exactness.
- ⚠️ **`src/app/layout.tsx:30` and `:49`** — SEO description abbreviates to `"Dr. Ajay Agarwal (MPT, COMT)"`. Acceptable as a shortened SEO tag, but inconsistent with the full string; noted for awareness.

---

## ✅ Content Verified Correct

- **Clinic name** — `"Elavive Physio — Spine & Knee Clinic"` (`data.ts:9`) ✅ (aside from the em-dash formatting note).
- **Positioning** — `"Jaipur's Leading Spine & Knee Clinic"` (`data.ts:11`, `data.ts:28`) ✅.
- **Doctor name** — `"Dr. Ajay Agarwal (PT)"` / `"Dr. Ajay Agarwal"` everywhere. No wrong-name variants found (grep for Aarav/Sharma/"A. Agarwal" = zero) ✅.
- **Title** — `"Founder & Director — Elavive Physio, Spine & Knee Clinic"` (`FounderProfile.tsx:59`) ✅.
- **Stats** — 4+, 4,000+, 4.9★, 25+ all correct in `STATS` and prose ✅.
- **Services (6)** — Spine & Back, Knee & Joint, Shoulder, Sports Injury, Post-Surgical Rehab, Neuro Rehab (`data.ts:48–103`) ✅ exact match.
- **Core Values (6)** — Patient-First Care, Clinical Excellence, Integrity & Trust, Compassion & Respect, Innovation in Rehabilitation, Empowering Recovery (`CoreValues.tsx:7–38`) ✅ exact match.
- **Mission & Vision** — (`MissionVision.tsx:5–14`) faithfully expand the verified mission/vision statements ✅.
- **Education** — "Bachelor of Physiotherapy from JNU Institute of Medical Sciences and Research Center" (`FounderProfile.tsx:93`) ✅.
- **International certifications** — Johns Hopkins University and Imperial College London correctly attributed (`data.ts:114,134`; `Certifications.tsx:60–64`) ✅ (institutions correct; some course titles shortened — see C2).
- **No invented pricing, awards, founding year, or extra named staff** were found ✅.
- **Location** correctly reduced to "Jaipur, Rajasthan" on the Contact page ✅ (Footer excepted — see C3).

---

## 📋 All TODO Items Found (categorized by priority)

### 🔴 Blocking (site should not launch without these)
- `src/lib/data.ts:16,18` — real WhatsApp / phone number (`CONTACT.whatsappNumber = "91XXXXXXXXXX"`, `phoneDisplay = "+91 XXXXX XXXXX"`). Currently placeholder; also referenced by `Hero.tsx:94`, `FinalCTA.tsx:52`, `CtaBanner.tsx:74`, `Footer.tsx:56`, `ContactBody.tsx:142`.
- `src/components/CalendlyEmbed.tsx:15,20` — real Calendly URL + wire up the actual widget (`CALENDLY_URL = "https://calendly.com/your-clinic/appointment"` is a placeholder; the booking box is a static div).
- `src/components/Footer.tsx:27` — replace invented placeholder address "C-Scheme, Jaipur, Rajasthan" (see C3).
- `src/components/ContactBody.tsx:109` — add full street address.
- `src/components/ContactBody.tsx:11,172` — update Google Maps embed to exact clinic address (currently generic Jaipur pin).
- `src/components/ContactForm.tsx:39,78,80` — wire the contact form to a real backend (Formspree/Supabase/email). Currently submits nowhere.
- `src/lib/data.ts:187–244` — replace/flag the 8 dummy text testimonials presented as real (see C4).

### 🟠 Important (soon after launch)
- `src/app/layout.tsx:20` — replace canonical/base URL `https://www.elavivephysio.com` with the real production domain.
- `src/components/ContactBody.tsx:160` — confirm real clinic hours (currently invented "Mon–Sat 9–7, Sun by appointment").
- `src/lib/data.ts:135–137`, `DoctorSpotlight.tsx:82`, `FounderProfile.tsx:31,44` — replace placeholder doctor portrait (pravatar / SVG placeholder).
- `src/components/about/ClinicStory.tsx:44,57` — replace placeholder clinic photo.
- `src/components/Hero.tsx:37` — replace hero illustration with final brand asset.
- `src/lib/data.ts:147,154` + `VideoTestimonials.tsx:42,129,146` — add real video testimonial sources + thumbnails.
- `src/components/Footer.tsx:77` — confirm legal entity name / year.

### 🟢 Nice to have
- `src/lib/data.ts:520,543` + `blog/ArticleBody.tsx:9,15,63` — replace seed blog articles and placeholder dates ("24 June 2026", etc.) with real MDX/CMS content.
- `src/components/scenes/HeroFallback.tsx:8` — optional pre-rendered hero image for the 3D fallback.

---

## Hallucination Risk Assessment

Ranked by density of unverified/invented content:

1. **🔴 About-page Certifications (`src/components/about/Certifications.tsx`)** — Highest risk. Contains the only two fully **hallucinated** certification entries (Instrument Knack Therapist; Spinal Cord Injury Specialist) and four **altered** verified certs (dropped "Diversified" ×2, shortened Imperial/Johns Hopkins course titles). This is the single most important section to correct against the verified list.

2. **🔴 Testimonials (`src/lib/data.ts` TESTIMONIALS + VIDEO_TESTIMONIALS)** — 13 fabricated patient identities and quotes. The video set at least carries TODO markers; the 8 text testimonials do **not** and render as genuine 5★ reviews, including an unverified "Best physiotherapy clinic in Jaipur" claim.

3. **🟠 Footer / Contact details** — Invented "C-Scheme" locality (Footer) and invented clinic hours (ContactBody). Both partly shielded by TODO comments but still rendered as fact.

4. **🟠 Doctor credentials & About stats** — `DOCTOR.qualification` drops 6 of 9 credentials; the "25+" figure is repurposed and mislabeled as "Certifications". Facts are directionally right but imprecise.

5. **🟢 Blog** — 6 seed articles with invented titles/excerpts/dates, but explicitly and repeatedly marked as placeholder TODO content, so low deception risk.

**Lowest risk / cleanest sections:** Services, Core Values, Mission/Vision, Hero, TrustBar stats — all trace cleanly to verified content (formatting/em-dash notes aside).
