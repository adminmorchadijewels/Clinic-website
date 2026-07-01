// =============================================================================
// SITE CONTENT — Elavive Physio (Spine & Knee Clinic), Jaipur
// Real clinic content. Core clinic facts (contact, address, hours, social,
// stats) are sourced from src/lib/config.ts — see CLINIC_CONFIG.
// =============================================================================

import { CLINIC_CONFIG } from "./config";

// --- CLINIC IDENTITY ----------------------------------------------------------
export const CLINIC = {
  fullName: "Elavive Physio — Spine & Knee Clinic",
  shortName: "Elavive Physio",
  positioning: "Jaipur's Leading Spine & Knee Clinic",
  tagline: "Move better. Live fully.",
};

// --- CONTACT ------------------------------------------------------------------
// NOTE: The clinic's canonical facts now live in src/lib/config.ts
// (CLINIC_CONFIG). The exports below are thin compatibility wrappers so existing
// imports (CONTACT, LOCATION, HOURS, GOOGLE, SOCIAL, whatsappLink) keep working
// while config.ts stays the single source of truth.
export const CONTACT = {
  whatsappNumber: CLINIC_CONFIG.contact.whatsappRaw, // E.164 without "+" for wa.me links
  phoneDisplay: CLINIC_CONFIG.contact.phone,
  phoneHref: CLINIC_CONFIG.contact.phoneTel,
  email: CLINIC_CONFIG.contact.email,
  altEmail: CLINIC_CONFIG.contact.emailAlt,
};

export const whatsappLink = (message = "Hi Elavive Physio, I'd like to book an appointment.") =>
  `${CLINIC_CONFIG.contact.whatsappLink}?text=${encodeURIComponent(message)}`;

// --- SOCIAL LINKS -------------------------------------------------------------
export const SOCIAL = CLINIC_CONFIG.social;

// --- FACILITIES ---------------------------------------------------------------
export const FACILITIES = {
  cashlessTpa: CLINIC_CONFIG.features.cashlessText,
};

// --- LOCATION & HOURS ---------------------------------------------------------
export const LOCATION = {
  streetAddress: `${CLINIC_CONFIG.address.line1}, ${CLINIC_CONFIG.address.line2}, ${CLINIC_CONFIG.address.area}`,
  area: CLINIC_CONFIG.address.area,
  city: CLINIC_CONFIG.address.city,
  state: CLINIC_CONFIG.address.state,
  country: CLINIC_CONFIG.address.country,
  pinCode: CLINIC_CONFIG.address.pinCode,
  full: CLINIC_CONFIG.address.full,
};

export const HOURS = {
  weekdays: CLINIC_CONFIG.hours.weekdays,
  sunday: CLINIC_CONFIG.hours.sunday,
};

export const GOOGLE = {
  rating: Number(CLINIC_CONFIG.stats.rating),
  reviewCount: Number(CLINIC_CONFIG.stats.ratingCount),
};

// --- HERO ---------------------------------------------------------------------
export const HERO = {
  eyebrow: "Jaipur's Leading Spine & Knee Clinic",
  headlineLine1: "Move better.",
  headlineLine2: "Live fully.",
  subheading:
    "Advanced physiotherapy for spine, knee, sports injuries and post-surgical recovery, evidence-based treatment plans built around you.",
  primaryCta: { label: "Book Appointment", href: "/contact#booking" },
};

// --- TRUST BAR STATS ----------------------------------------------------------
export const STATS = [
  { value: 4, suffix: "+", label: "Years of Clinical Experience", icon: "years" },
  { value: 4000, suffix: "+", label: "Patients Successfully Treated", icon: "patients" },
  { value: 5.0, suffix: "★", label: "Google Rating", icon: "rating", decimals: 1 },
  { value: 25, suffix: "+", label: "Conditions Treated", icon: "conditions" },
  { value: 40, suffix: "+", label: "Cities Reached", icon: "location" },
  { value: 6, suffix: "+", label: "States", icon: "growth" },
  { value: 5, suffix: "+", label: "Countries", icon: "globe" },
] as const;

// --- SERVICES -----------------------------------------------------------------
// `blurb` is the short homepage tile line; `blurbFull` is the fuller line used
// on the dedicated /services hub grid. Slugs map 1:1 to the sub-pages under
// src/app/services/<slug>/ and to SERVICE_DETAILS below.
export const SERVICES = [
  {
    slug: "spine-back",
    name: "Spine & Back",
    blurb: "Relief from chronic back pain, sciatica, and posture-related strain.",
    blurbFull:
      "Chronic back pain, sciatica, slip disc and spondylitis, treated at the root with manual therapy, dry needling and targeted rehabilitation.",
    icon: "spine",
    conditions: ["Back Pain", "Sciatica", "Slip Disc", "Spondylitis"],
  },
  {
    slug: "knee-joint",
    name: "Knee & Joint",
    blurb: "Arthritis, ligament injuries, and joint mobility restoration.",
    blurbFull:
      "Arthritis, ligament injuries, meniscus tears and joint stiffness, structured strengthening and mobility work that restores full function.",
    icon: "knee",
    conditions: ["Arthritis", "ACL Injury", "Meniscus Tear", "Joint Stiffness"],
  },
  {
    slug: "shoulder",
    name: "Shoulder",
    blurb: "Frozen shoulder, rotator cuff recovery, and impingement care.",
    blurbFull:
      "Frozen shoulder, rotator cuff tears and impingement, resolved systematically with manual therapy, IASTM and progressive strengthening.",
    icon: "shoulder",
    conditions: ["Frozen Shoulder", "Rotator Cuff", "Impingement", "Calcific Tendinitis"],
  },
  {
    slug: "sports-injury",
    name: "Sports Injury",
    blurb: "Targeted rehab to get athletes back to peak performance.",
    blurbFull:
      "Sprains, muscle tears, tendinopathy and overuse injuries, return-to-sport programmes built around your sport and performance level.",
    icon: "sports",
    conditions: ["Muscle Tears", "Tendinopathy", "Sprains", "Overuse Injuries"],
  },
  {
    slug: "post-surgical-rehab",
    name: "Post-Surgical Rehab",
    blurb: "Structured programmes after orthopaedic surgery.",
    blurbFull:
      "Post-knee, spine, ACL, shoulder and hip surgery, staged, surgeon-aligned rehabilitation that restores full function.",
    icon: "surgery",
    conditions: ["Knee Replacement", "Spinal Surgery", "ACL Reconstruction", "Hip Replacement"],
  },
  {
    slug: "neuro-rehab",
    name: "Neuro Rehab",
    blurb: "Regaining strength and movement after stroke or nerve injury.",
    blurbFull:
      "Stroke, spinal cord injury, Parkinson's and nerve injuries, functional retraining that rebuilds movement and independence.",
    icon: "neuro",
    conditions: ["Stroke", "Spinal Cord Injury", "Parkinson's", "Nerve Injury"],
  },
] as const;

// --- WHY CHOOSE US ------------------------------------------------------------
export const PILLARS = [
  {
    title: "Evidence-Based Treatment",
    body: "Every plan is grounded in the latest clinical research. We treat the root cause, not just the symptom.",
    icon: "assess",
  },
  {
    title: "Internationally Certified Expertise",
    body: "Dr. Agarwal holds certifications from Johns Hopkins University, Imperial College London, and leading Indian physiotherapy institutions.",
    icon: "award",
  },
  {
    title: "Personalized Recovery Plans",
    body: "No two patients are the same. Every plan is designed around your specific condition, lifestyle, and goals.",
    icon: "team",
  },
  {
    title: "Focused on Spine & Knee",
    body: "Deep specialization means sharper outcomes. We don't treat everything, we treat what we're best at.",
    icon: "spine",
  },
  {
    title: "Cashless & TPA Facility",
    body: "We accept cashless treatment through major insurance TPA providers — no upfront payment hassle.",
    icon: "shield",
  },
] as const;

// --- DOCTOR / FOUNDER ---------------------------------------------------------
export const DOCTOR = {
  name: "Dr. Ajay Agarwal (PT)",
  qualification: "BPT, MPT (Neurology), MBA, MIAFT, MJPN, COMT, CDNT | Founder & Director",
  bioTeaser:
    "Dr. Ajay Agarwal founded Elavive Physio with a single belief: every patient deserves a recovery plan built around them, not a template. He holds an MPT (Neurology) from Janardan Rai Nagar Rajasthan Vidyapeeth (JRNRVU), Udaipur and an MBA in Hospital and Healthcare Management. With 4+ years of clinical experience, 4,000+ patients treated, and certifications from Johns Hopkins University and Imperial College London, he brings internationally trained expertise to Jaipur.",
  // Real founder portrait (public/images/dr-ajay-agarwal.png).
  photo: "/images/dr-ajay-agarwal.png",
};

// --- VIDEO TESTIMONIALS -------------------------------------------------------
export const VIDEO_SECTION = {
  heading: "Real recoveries, real patients",
  subheading:
    "Hear directly from patients who came to us in pain and left with their lives back.",
};

// TODO: replace thumbnails + add the real video sources (videoSrc) for each.
export const VIDEO_TESTIMONIALS = [
  {
    id: "v1",
    name: "Priya",
    condition: "Slipped disc recovery",
    thumb: "/placeholders/video.svg",
    videoSrc: "", // TODO: add real video file URL
  },
  {
    id: "v2",
    name: "Rohit",
    condition: "ACL post-surgical rehab",
    thumb: "/placeholders/video.svg",
    videoSrc: "",
  },
  {
    id: "v3",
    name: "Meera",
    condition: "Frozen shoulder",
    thumb: "/placeholders/video.svg",
    videoSrc: "",
  },
  {
    id: "v4",
    name: "Vikram",
    condition: "Sports injury recovery",
    thumb: "/placeholders/video.svg",
    videoSrc: "",
  },
  {
    id: "v5",
    name: "Anjana",
    condition: "Chronic back pain",
    thumb: "/placeholders/video.svg",
    videoSrc: "",
  },
] as const;

// --- TEXT TESTIMONIALS --------------------------------------------------------
// Real, verbatim Google reviews for Elavive Physio.
// Consent note: verify each patient has consented to being featured before launch.
// `id` is the stable key (two reviewers share the name "Kavita Sharma").
export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Kavita Sharma",
    condition: "Slipped disc",
    rating: 5,
    date: "1 month ago",
    quote:
      "After struggling with a slipped disc for two years and visiting multiple doctors with no success, I finally found relief with Dr. Ajay Agarwal (Elavive Physio). Within just 15 days of starting therapy, I have seen a significant improvement. His approach is highly effective where other treatments failed. I highly recommend him to anyone dealing with chronic pain.",
  },
  {
    id: "t2",
    name: "Fenni Italia",
    condition: "Lower back pain",
    rating: 5,
    date: "1 week ago",
    quote:
      "Hi Jaipurites, Myself Fenni Italia I was visiting Jaipur from Mumbai when I suddenly started experiencing severe lower back pain and difficulty walking comfortably. Since I was staying near WTP, I searched online for the best back pain physio in Durgapura, Malviya Nagar near WTP, and found Elavive Physio Spine and Knee Physiotherapy Centre. The clinic staff was very professional and supportive. The physiotherapist carefully assessed my condition and started targeted physiotherapy treatment for my lower back pain. Within just a few sessions, I experienced significant pain relief, improved mobility, and felt much more comfortable during my stay in Jaipur. I highly recommend this clinic to anyone looking for the best physiotherapy clinic in Jaipur for back pain, sciatica, posture correction, spine physiotherapy, and pain relief treatment.",
  },
  {
    id: "t3",
    name: "Ashok Kumar Sharma",
    condition: "Lower back pain",
    rating: 5,
    date: "6 weeks ago",
    quote:
      "Myself Ashok Kumar Sharma. I was suffering from severe lower back pain from 3 weeks. I came to know about Dr. Ajay Agarwal, he gave me treatment of 4 days now I am totally fine and pain free. Clinical setup is also comfortable. I would suggest everyone who is suffering from any pain or surgery Should visit Elavive Physio.",
  },
  {
    id: "t4",
    name: "Preeti Saini",
    condition: "Cervical and spine",
    rating: 5,
    date: "2 weeks ago",
    quote:
      "Best physiotherapic centre. Very well supportive staff with proper diagnosis. Must reach ELAVIVE PHYSIO CENTRE once if facing any such issues related to cervical or spine. Treatments are effective with well planned structures accordingly.",
  },
  {
    id: "t5",
    name: "Manju Agarwal",
    condition: "Knee and spine pain",
    rating: 5,
    date: "1 week ago",
    quote:
      "Patient treated for knee and spine pain at Elavive Physio Durgapura, Jaipur. Climbing stairs and daily activities were difficult before treatment. After a few sessions with Dr. Ajay Agarwal, felt significant relief. Highly recommends the clinic for knee or spine problems in Jaipur.",
  },
  {
    id: "t6",
    name: "Kavita Sharma",
    condition: "Knee pain",
    rating: 5,
    date: "Recent",
    quote:
      "I had severe knee pain for years. After starting treatment at Elavive Physio I now walk without pain. Thank you to the entire team!",
  },
] as const;

// --- FINAL CTA BANNER ---------------------------------------------------------
export const FINAL_CTA = {
  heading: "Ready to move without pain?",
  subheading:
    "Book an appointment with Dr. Ajay Agarwal today. Same-week appointments available.",
  cta: { label: "Book Your Appointment", href: "/contact#booking" },
};

// --- 3D HERO: BODY REGIONS ----------------------------------------------------
// Drives the interactive hover/tap info cards in the 3D scene (kept for when the
// 3D treatment is revisited). Descriptions map to real service pages.
export type BodyRegionId =
  | "spine"
  | "shoulder"
  | "elbow"
  | "hip"
  | "knee"
  | "ankle";

export const BODY_REGIONS: Record<
  BodyRegionId,
  { label: string; description: string; serviceSlug: string }
> = {
  spine: {
    label: "Spine & Back",
    description: "Back pain, sciatica, disc & posture care.",
    serviceSlug: "spine-back",
  },
  shoulder: {
    label: "Shoulder",
    description: "Frozen shoulder & rotator cuff recovery.",
    serviceSlug: "shoulder",
  },
  elbow: {
    label: "Elbow",
    description: "Tennis & golfer's elbow, nerve relief.",
    serviceSlug: "sports-injury",
  },
  hip: {
    label: "Hip",
    description: "Hip mobility, bursitis & gait correction.",
    serviceSlug: "knee-joint",
  },
  knee: {
    label: "Knee & Joint",
    description: "Ligament, arthritis & post-op knee rehab.",
    serviceSlug: "knee-joint",
  },
  ankle: {
    label: "Ankle & Foot",
    description: "Sprains, plantar pain & sports recovery.",
    serviceSlug: "sports-injury",
  },
};

// --- SERVICE DETAIL PAGES -----------------------------------------------------
// Deep content for each /services/<slug> sub-page. Keyed by the same slug used
// in SERVICES above. `testimonials` lists names to pull from TESTIMONIALS.
export type ServiceSlug = (typeof SERVICES)[number]["slug"];

export interface ServiceDetail {
  slug: ServiceSlug;
  name: string;
  icon: string;
  /** Hero headline — the outcome-led promise. */
  headline: string;
  /** Hero subheading — one-line outcome promise. */
  outcome: string;
  /** Lead paragraph describing the treatment philosophy. */
  description: string;
  /** Specific conditions treated. */
  conditions: string[];
  /** 3–4 methodology points. */
  approach: string[];
  /** Testimonial ids to pull from TESTIMONIALS for the related-testimonial section. */
  testimonials: string[];
  seoTitle: string;
  seoDescription: string;
}

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  "spine-back": {
    slug: "spine-back",
    name: "Spine & Back",
    icon: "spine",
    headline: "Relief from back pain that actually lasts",
    outcome:
      "Get to the root of your back pain, not just the symptoms, with spine care that's our deepest specialty.",
    description:
      "Spine problems are among the most complex and most undertreated conditions in physiotherapy. At our Elavive Physio clinic in Jaipur, spine rehabilitation is our deepest area of specialization. We use a combination of manual therapy, dry needling, postural correction, and targeted exercise programs to address both the symptoms and the root mechanical cause.",
    conditions: [
      "Chronic back pain",
      "Sciatica",
      "Slip disc",
      "Spondylitis",
      "Posture-related strain",
      "Lumbar pain",
    ],
    approach: [
      "Full spinal assessment and diagnosis",
      "Manual therapy and dry needling",
      "Postural correction program",
      "Targeted exercise rehabilitation",
    ],
    testimonials: ["t1", "t3", "t4"],
    seoTitle: "Spine & Back Pain Treatment in Jaipur | Elavive Physio",
    seoDescription:
      "Expert spine and back pain physiotherapy in Jaipur. Sciatica, slip disc, spondylitis treatment by Dr. Ajay Agarwal. Book your assessment.",
  },
  "knee-joint": {
    slug: "knee-joint",
    name: "Knee & Joint",
    icon: "knee",
    headline: "Get back to walking, climbing, living",
    outcome:
      "Precise, structured knee and joint rehabilitation that restores full, confident movement.",
    description:
      "Knee conditions require precise, structured rehabilitation. Our knee-focused programs in Jaipur combine orthopedic assessment, strengthening protocols, and manual therapy to restore full function, whether you're recovering from injury, surgery, or managing a chronic condition.",
    conditions: [
      "Arthritis (OA and RA)",
      "ACL/PCL ligament injuries",
      "Meniscus tears",
      "Patellofemoral pain",
      "Joint stiffness and mobility issues",
    ],
    approach: [
      "Orthopedic assessment",
      "Strengthening and mobility protocols",
      "Manual therapy for joint mobility",
      "Functional movement rehabilitation",
    ],
    testimonials: ["t5", "t6"],
    seoTitle: "Knee Pain & Joint Physiotherapy in Jaipur | Elavive Physio",
    seoDescription:
      "Expert knee and joint physiotherapy in Jaipur. Arthritis, ACL/PCL, meniscus and patellofemoral pain treatment by Dr. Ajay Agarwal. Book your assessment.",
  },
  shoulder: {
    slug: "shoulder",
    name: "Shoulder",
    icon: "shoulder",
    headline: "Frozen shoulder, rotator cuff, impingement: we treat them all",
    outcome:
      "Systematic shoulder care that restores full, pain-free range of motion.",
    description:
      "Shoulder conditions are often slow to heal and easy to mismanage. Our approach at our Jaipur clinic combines specific manual therapy, IASTM techniques, and targeted strengthening to restore range of motion and eliminate pain systematically.",
    conditions: [
      "Frozen shoulder (adhesive capsulitis)",
      "Rotator cuff tears and tendinopathy",
      "Shoulder impingement syndrome",
      "Post-surgical shoulder rehab",
      "Calcific tendinitis",
    ],
    approach: [
      "Specific shoulder manual therapy",
      "IASTM techniques for soft tissue",
      "Progressive range-of-motion restoration",
      "Targeted strengthening",
    ],
    testimonials: [],
    seoTitle: "Frozen Shoulder & Rotator Cuff Treatment Jaipur",
    seoDescription:
      "Shoulder physiotherapy in Jaipur for frozen shoulder, rotator cuff tears and impingement by Dr. Ajay Agarwal. Book your assessment.",
  },
  "sports-injury": {
    slug: "sports-injury",
    name: "Sports Injury",
    icon: "sports",
    headline: "Back on the field, faster than you expected",
    outcome:
      "Return-to-sport rehabilitation matched to your sport, your position, and your performance level.",
    description:
      "Dr. Agarwal is a Certified Sports On-Field Therapist. Our sports rehabilitation programs in Jaipur are built around return-to-sport timelines, not just pain elimination, but full functional recovery matched to your specific sport and performance level.",
    conditions: [
      "Sprains and strains",
      "Muscle tears",
      "Tendon injuries (tendinopathy)",
      "Overuse injuries",
      "Acute on-field injury management",
    ],
    approach: [
      "Sports-specific injury assessment",
      "Return-to-sport timeline planning",
      "Performance-based rehabilitation",
      "Injury prevention programming",
    ],
    testimonials: [],
    seoTitle: "Sports Injury Physiotherapy in Jaipur | Elavive Physio",
    seoDescription:
      "Sports injury physiotherapy in Jaipur with return-to-sport rehab by Dr. Ajay Agarwal, Certified Sports On-Field Therapist. Book your assessment.",
  },
  "post-surgical-rehab": {
    slug: "post-surgical-rehab",
    name: "Post-Surgical Rehab",
    icon: "surgery",
    headline: "Recovery after surgery, done right",
    outcome:
      "Surgeon-aligned, carefully staged rehabilitation that restores full function after surgery.",
    description:
      "The quality of your post-surgical rehabilitation determines how well and how completely you recover. Our structured post-surgical programs in Jaipur are carefully staged, working with your surgeon's protocol while applying physiotherapy expertise to accelerate recovery and restore full function.",
    conditions: [
      "Post-knee replacement",
      "Post-spinal surgery",
      "Post-ACL reconstruction",
      "Post-shoulder surgery",
      "Post-hip replacement",
    ],
    approach: [
      "Surgeon-aligned rehabilitation protocol",
      "Staged progressive loading",
      "Scar tissue management",
      "Return-to-function milestones",
    ],
    testimonials: [],
    seoTitle: "Post-Surgical Rehabilitation in Jaipur | Elavive Physio",
    seoDescription:
      "Post-surgical rehabilitation in Jaipur: knee replacement, ACL, spinal and shoulder surgery recovery by Dr. Ajay Agarwal. Book your assessment.",
  },
  "neuro-rehab": {
    slug: "neuro-rehab",
    name: "Neuro Rehab",
    icon: "neuro",
    headline: "Rebuilding movement after neurological injury",
    outcome:
      "Functional recovery that restores independence, balance and quality of life.",
    description:
      "Dr. Agarwal holds an MPT in Neurology, with advanced training in neurological rehabilitation. Our neuro rehabilitation programs in Jaipur focus on functional recovery: restoring independence, improving balance and coordination, and maximizing quality of life for patients with neurological conditions. We use Functional Electrical Stimulation (FES) — an evidence-based rehabilitation technology that uses low-level electrical impulses to stimulate nerves supplying weakened or paralyzed muscles, helping restore functional movements like walking, standing, and grasping.",
    conditions: [
      "Stroke rehabilitation",
      "Spinal cord injury recovery",
      "Parkinson's disease management",
      "Nerve injury rehabilitation",
      "Multiple sclerosis management",
      "FES Technology",
    ],
    approach: [
      "Neurological assessment and goal setting",
      "Functional Electrical Stimulation (FES) therapy",
      "Functional movement retraining",
      "Balance and coordination rehabilitation",
      "Independence-focused therapy",
    ],
    testimonials: [],
    seoTitle: "Neurological Rehabilitation in Jaipur | Elavive",
    seoDescription:
      "Neurological rehabilitation in Jaipur for stroke, spinal cord injury and Parkinson's by Dr. Ajay Agarwal, MPT Neurology. Book your assessment.",
  },
};

/** Resolve a service's related testimonials (by id) into full objects. */
export function getServiceTestimonials(slug: ServiceSlug) {
  const ids = new Set(SERVICE_DETAILS[slug].testimonials);
  return TESTIMONIALS.filter((t) => ids.has(t.id));
}

/** The shared 3-step "what to expect" flow, identical across every service. */
export const SERVICE_JOURNEY = [
  {
    step: "01",
    title: "Assessment",
    body: "A thorough one-on-one evaluation to pinpoint the root cause, not just the symptoms.",
  },
  {
    step: "02",
    title: "Treatment Plan",
    body: "A personalised programme built around your body, your condition, and your goals.",
  },
  {
    step: "03",
    title: "Recovery",
    body: "Hands-on therapy and guided progression until you're back to full function.",
  },
] as const;

// --- BLOG ---------------------------------------------------------------------
// Real, physiotherapist-written articles. Bodies are stored as structured
// content blocks so they render with proper HTML semantics (see ArticleBody).

// Ordered as they appear in the listing filter tabs ("All" is prepended in the
// UI). Every article's `category` must be one of these.
export const BLOG_CATEGORIES = [
  "Spine Health",
  "Knee Care",
  "Shoulder",
  "Neuro Rehab",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

// A single block of article body content. Rendered by ArticleBody with the
// matching semantic element (h2/h3, p, or ul).
export type ArticleBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "list"; content: string[] };

export interface BlogArticle {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  author: string;
  readTime: string; // e.g. "4 min read"
  date: string; // ISO date, e.g. "2026-06-15"
  metaTitle: string;
  metaDescription: string;
  related: string[]; // slugs of related articles
  body: ArticleBlock[];
}

// Shared byline — every article is authored by the founder.
export const BLOG_AUTHOR = "Dr. Ajay Agarwal (PT)";

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "back-pain-treatment-jaipur",
    category: "Spine Health",
    title: "Back Pain Treatment in Jaipur: When to See a Physiotherapist",
    excerpt:
      "Most back pain improves with the right physiotherapy. Here is how to know when to seek treatment and what to expect at Elavive Physio in Jaipur.",
    author: BLOG_AUTHOR,
    readTime: "5 min read",
    date: "2026-06-15",
    metaTitle: "Back Pain Treatment Jaipur | Elavive Physio",
    metaDescription:
      "Struggling with back pain? Learn the red-flag symptoms, when to see a physiotherapist, and how back pain treatment in Jaipur at Elavive Physio helps you recover.",
    related: [
      "frozen-shoulder-exercises-recovery",
      "knee-pain-physiotherapy-vs-surgery",
      "stroke-rehabilitation-physiotherapy",
    ],
    body: [
      {
        type: "paragraph",
        content:
          "If you live in Jaipur, back pain is probably something you or someone in your family has dealt with. Long hours at a desk, daily commutes on busy roads, endless time bent over a smartphone, and very little regular movement all add up. Back pain is now one of the most common reasons people across India visit a doctor. The good news is that the vast majority of back pain is not dangerous, and it responds extremely well to the right physiotherapy in Jaipur, often without long-term medication or surgery.",
      },
      {
        type: "heading",
        level: 2,
        content: "Acute vs Chronic Back Pain",
      },
      {
        type: "paragraph",
        content:
          "Knowing how long your pain has lasted helps guide treatment. Acute back pain lasts less than six weeks and is usually the result of a strain, an awkward lift, or a sudden movement. It tends to settle with gentle activity and targeted physiotherapy. Chronic back pain lasts more than twelve weeks and often has several contributing causes at once, such as weak core muscles, poor posture, old injuries, or the way you move through your day. Chronic pain rarely improves on its own, which is exactly why a structured plan matters. The window between six and twelve weeks is a warning sign that pain is becoming persistent and should be properly assessed.",
      },
      {
        type: "heading",
        level: 2,
        content: "Red Flags: When Back Pain Needs Urgent Attention",
      },
      {
        type: "paragraph",
        content:
          "Most back pain is mechanical and safe to treat conservatively. But a small number of symptoms are red flags that need immediate medical attention rather than waiting for a routine appointment:",
      },
      {
        type: "list",
        content: [
          "Numbness or tingling in one or both legs, especially if it is spreading",
          "Weakness in a leg or foot that makes it hard to walk or lift your toes",
          "Loss of control over your bladder or bowels",
          "Numbness around the groin or inner thighs (the saddle area)",
          "Back pain with unexplained fever, night sweats, or significant weight loss",
          "Severe back pain immediately after a fall or accident",
        ],
      },
      {
        type: "paragraph",
        content:
          "If you notice any of these, go to a hospital promptly. For everything else, physiotherapy is usually the safest and most effective first step.",
      },
      {
        type: "heading",
        level: 2,
        content: "Why Physiotherapy Works Better Than Painkillers",
      },
      {
        type: "paragraph",
        content:
          "Painkillers can be useful for a few days to take the edge off, but they only mask the problem. They do nothing to correct the weak muscles, stiff joints, and movement habits that caused the pain in the first place, so the pain keeps returning. Physiotherapy treats the root cause. By restoring movement, building strength, and retraining how you sit, stand, and lift, physiotherapy delivers lasting relief and lowers the chance of the pain coming back. This is why leading guidelines around the world now recommend physiotherapy and exercise as the first-line treatment for most back pain, ahead of long-term medication.",
      },
      {
        type: "heading",
        level: 2,
        content: "What Happens at Your First Assessment",
      },
      {
        type: "paragraph",
        content:
          "Your first visit to Elavive Physio is mostly about listening and understanding. Dr. Ajay Agarwal will ask when the pain started, what makes it better or worse, your type of work, and your daily routine. This is followed by a hands-on physical assessment, checking your posture, spinal movement, muscle strength, flexibility, and nerve signs, to pinpoint the true source of your pain. You will leave the first session understanding what is going on in plain language, along with a clear, personalised plan and a few starter exercises. No jargon, and no guesswork.",
      },
      {
        type: "heading",
        level: 2,
        content: "Common Treatments We Use",
      },
      {
        type: "list",
        content: [
          "Manual therapy: hands-on techniques to loosen stiff joints and ease muscle tension",
          "Dry needling: fine needles that release tight, painful muscle knots",
          "Exercise rehabilitation: progressive strengthening for your core and back so the relief lasts",
          "Posture and movement retraining tailored to your job and lifestyle",
          "Education, so you can manage flare-ups confidently at home",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Simple Ways to Protect Your Back Every Day",
      },
      {
        type: "list",
        content: [
          "Set up your desk so the screen is at eye level and your feet rest flat on the floor",
          "Stand up and move for two minutes every 30 to 45 minutes; movement is medicine for the spine",
          "Sleep on your side with a pillow between your knees, or on your back with a pillow under your knees",
          "Hold your phone closer to eye level instead of bending your neck down for hours",
          "Build a short daily walk and a few simple core exercises into your routine",
        ],
      },
      {
        type: "paragraph",
        content:
          "You do not have to live with back pain or rely on painkillers indefinitely. If your pain has lasted more than a few weeks, is interfering with work or sleep, or keeps returning, a proper assessment is the fastest way forward. Book your back pain treatment in Jaipur with Dr. Ajay Agarwal at Elavive Physio and start a recovery plan built around you.",
      },
    ],
  },
  {
    slug: "frozen-shoulder-exercises-recovery",
    category: "Shoulder",
    title: "Frozen Shoulder: Stages, Treatment, and Exercises That Actually Help",
    excerpt:
      "Frozen shoulder can last 2 to 3 years without proper treatment. A physiotherapist can speed your recovery significantly. Here is what you need to know.",
    author: BLOG_AUTHOR,
    readTime: "6 min read",
    date: "2026-06-22",
    metaTitle: "Frozen Shoulder Treatment Jaipur | Elavive Physio",
    metaDescription:
      "Frozen shoulder can last years untreated. Learn the stages, safe home exercises, and how frozen shoulder physiotherapy in Jaipur at Elavive Physio speeds recovery.",
    related: [
      "back-pain-treatment-jaipur",
      "knee-pain-physiotherapy-vs-surgery",
      "stroke-rehabilitation-physiotherapy",
    ],
    body: [
      {
        type: "paragraph",
        content:
          "Frozen shoulder is one of the most frustrating conditions we treat, partly because it comes on slowly and partly because it can drag on for years if it is not managed well. The medical name is adhesive capsulitis, where the capsule of tissue surrounding the shoulder joint becomes thickened, inflamed, and tight. The result is a shoulder that is both painful and progressively stiff, making everyday tasks like dressing, reaching a shelf, or fastening a seatbelt surprisingly difficult.",
      },
      {
        type: "heading",
        level: 2,
        content: "What Is Frozen Shoulder and Why Does It Happen?",
      },
      {
        type: "paragraph",
        content:
          "In a healthy shoulder, the joint capsule is loose and flexible, allowing a wide range of movement. In a frozen shoulder, that capsule tightens and forms adhesions, almost like scar tissue, that physically restrict the joint. It can begin after a minor injury, a period of keeping the arm still (for example after surgery), or for no obvious reason at all. Once it starts, the shoulder tends to move through a predictable sequence of stages.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Three Stages of Frozen Shoulder",
      },
      {
        type: "list",
        content: [
          "Freezing (painful) stage: lasts roughly 2 to 9 months. Pain builds steadily, often worse at night, and movement gradually reduces.",
          "Frozen (stiff) stage: lasts roughly 4 to 12 months. Pain often eases, but stiffness dominates and range of motion is at its most limited.",
          "Thawing (recovery) stage: lasts roughly 6 months to 2 years. Movement slowly returns as the capsule relaxes.",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Who Gets Frozen Shoulder?",
      },
      {
        type: "paragraph",
        content:
          "Frozen shoulder most often affects people between 40 and 60 years of age, and it is more common in women. People with diabetes are at particularly high risk, and their symptoms can be more stubborn, so blood sugar control is an important part of the bigger picture. Thyroid disorders and long periods of shoulder immobility also raise the risk.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Biggest Mistake Patients Make",
      },
      {
        type: "paragraph",
        content:
          "The most common mistake is resting the shoulder completely because it hurts. It feels logical, but total rest actually accelerates stiffness and makes the frozen stage worse. The shoulder needs gentle, regular, pain-respecting movement to stop the capsule tightening further. This is where guided physiotherapy makes an enormous difference, because it keeps the joint moving safely without flaring the pain.",
      },
      {
        type: "heading",
        level: 2,
        content: "How Physiotherapy Helps",
      },
      {
        type: "list",
        content: [
          "Manual therapy and joint mobilisation to gently stretch the capsule and break down adhesions",
          "Progressive range-of-motion exercises matched to your current stage",
          "IASTM (instrument-assisted soft tissue mobilisation) to release tight surrounding tissue",
          "Pain management strategies so you can keep moving comfortably",
          "A structured home programme so progress continues between sessions",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Three Safe Exercises You Can Do at Home",
      },
      {
        type: "heading",
        level: 3,
        content: "1. Pendulum Swings",
      },
      {
        type: "paragraph",
        content:
          "Lean forward slightly and support yourself with your good arm on a table. Let the affected arm hang down and relax. Gently swing it in small circles, letting gravity do the work, for about 30 seconds in each direction. This eases the joint into motion without forcing it and is ideal in the painful stage.",
      },
      {
        type: "heading",
        level: 3,
        content: "2. Towel Stretch",
      },
      {
        type: "paragraph",
        content:
          "Hold a towel behind your back with the good arm at the top and the affected arm at the bottom. Use the top hand to gently pull the affected arm upward until you feel a comfortable stretch, not pain. Hold for a few seconds and repeat 8 to 10 times. This helps restore internal rotation, one of the first movements to be lost.",
      },
      {
        type: "heading",
        level: 3,
        content: "3. Wall Crawl",
      },
      {
        type: "paragraph",
        content:
          "Stand facing a wall and place the fingertips of your affected arm on it at waist height. Slowly walk your fingers up the wall as high as is comfortable, then slowly walk them back down. Repeat 10 times. Over the weeks, you should gradually reach higher, giving you a clear sign of progress.",
      },
      {
        type: "heading",
        level: 2,
        content: "Do You Need Surgery?",
      },
      {
        type: "paragraph",
        content:
          "The reassuring answer is that most frozen shoulders resolve with patience and consistent physiotherapy, without any surgery. Surgical options such as manipulation under anaesthesia or capsular release are reserved for the small number of cases that remain severely stiff despite months of good conservative treatment. For the vast majority of patients, a well-structured physiotherapy plan is enough.",
      },
      {
        type: "heading",
        level: 2,
        content: "Recovery Timeline: With vs Without Physiotherapy",
      },
      {
        type: "paragraph",
        content:
          "Left entirely alone, a frozen shoulder can take two to three years to settle, and some people never fully regain their range. With regular, well-guided physiotherapy, many patients see meaningful improvement within a few months and a substantially shorter overall recovery. The earlier you start, the smoother the journey tends to be. If your shoulder is stiffening and painful, book a shoulder assessment with Dr. Ajay Agarwal at Elavive Physio in Jaipur and get a clear plan for your stage.",
      },
    ],
  },
  {
    slug: "knee-pain-physiotherapy-vs-surgery",
    category: "Knee Care",
    title: "Knee Pain: How Physiotherapy Can Help You Avoid Surgery",
    excerpt:
      "Many patients told they need knee surgery find complete relief with structured physiotherapy. Here is the evidence and what treatment looks like.",
    author: BLOG_AUTHOR,
    readTime: "5 min read",
    date: "2026-06-28",
    metaTitle: "Knee Pain Treatment Jaipur | Elavive Physio",
    metaDescription:
      "Told you need knee surgery? Many patients avoid it with structured rehab. Learn how knee pain physiotherapy in Jaipur at Elavive Physio can restore movement.",
    related: [
      "back-pain-treatment-jaipur",
      "frozen-shoulder-exercises-recovery",
      "stroke-rehabilitation-physiotherapy",
    ],
    body: [
      {
        type: "paragraph",
        content:
          "Being told you might need knee surgery is frightening, and for many people it feels like the only option left. But a large number of patients who arrive at our Jaipur clinic worried about surgery go on to make an excellent recovery with structured physiotherapy alone. The knee is a resilient joint, and with the right rehabilitation it often has far more capacity to recover than people expect.",
      },
      {
        type: "heading",
        level: 2,
        content: "Common Causes of Knee Pain in India",
      },
      {
        type: "list",
        content: [
          "Osteoarthritis: gradual wear of the joint cartilage, very common with age and higher body weight",
          "Ligament injuries: sprains and tears of the ACL, PCL, or collateral ligaments, often from sport or a fall",
          "Meniscus problems: tears of the shock-absorbing cartilage, from twisting injuries or degeneration",
          "Patellofemoral pain: pain around the kneecap, common in active people and those who sit for long periods",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Is Surgery Recommended Too Soon?",
      },
      {
        type: "paragraph",
        content:
          "Knee replacement and arthroscopic surgery can be life-changing for the right patient, but they are sometimes recommended earlier than the evidence supports. Surgery carries real risks, a lengthy recovery, and no guarantee of a pain-free result, especially if the surrounding muscles remain weak. For many people with mild to moderate knee problems, a proper trial of structured physiotherapy first is the wiser, lower-risk path.",
      },
      {
        type: "heading",
        level: 2,
        content: "What the Evidence Says About Physiotherapy",
      },
      {
        type: "paragraph",
        content:
          "The research here is genuinely encouraging. Studies of knee osteoarthritis have found that a large majority of patients, in many trials around 70 percent, who commit to a structured strengthening and rehabilitation programme are able to avoid or significantly delay surgery. Strong evidence also shows that for certain meniscus tears, physiotherapy produces results comparable to surgery. In other words, for a great many knees, rehabilitation is not a second-best option; it is the recommended first choice.",
      },
      {
        type: "heading",
        level: 2,
        content: "What a Knee Physiotherapy Program Involves",
      },
      {
        type: "list",
        content: [
          "Targeted strengthening of the quadriceps and hamstrings to support and offload the joint",
          "Manual therapy to improve joint mobility and reduce stiffness",
          "Taping and bracing techniques to ease pain and improve kneecap tracking",
          "Activity modification and gait retraining so daily movements stop aggravating the knee",
          "A progressive home programme to keep building strength between sessions",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Conditions That Respond Especially Well",
      },
      {
        type: "list",
        content: [
          "Mild to moderate osteoarthritis (grades 1 and 2)",
          "Patellofemoral (kneecap) pain",
          "Conservative management after an ACL injury, where surgery is not immediately required",
          "Many degenerative meniscus tears",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "When Surgery Is Genuinely Necessary",
      },
      {
        type: "paragraph",
        content:
          "Physiotherapy is powerful, but it is not always enough, and being honest about that matters. Severe, end-stage osteoarthritis (grades 3 and 4) with bone-on-bone changes, complete ligament ruptures in active patients, and large mechanical meniscus tears that lock the knee often do need surgery for the best outcome. A thorough assessment is what tells the two situations apart, so you are neither operated on too early nor left struggling for too long.",
      },
      {
        type: "heading",
        level: 2,
        content: "If You Do Need Surgery: Rehab at Elavive Physio",
      },
      {
        type: "paragraph",
        content:
          "For patients who genuinely need an operation, the quality of rehabilitation afterwards largely determines how well and how completely they recover. At Elavive Physio in Jaipur, our post-surgical knee programmes are carefully staged and aligned with your surgeon's protocol, guiding you from early protected movement through to full strength and a confident return to daily life. Whether you are trying to avoid surgery or recovering from it, book a knee assessment with Dr. Ajay Agarwal to find out exactly where your knee stands.",
      },
    ],
  },
  {
    slug: "stroke-rehabilitation-physiotherapy",
    category: "Neuro Rehab",
    title: "Stroke Rehabilitation: How Physiotherapy Helps Recovery",
    excerpt:
      "Early physiotherapy after stroke makes a significant difference in recovery. Here is what neurological rehabilitation involves and what to expect.",
    author: BLOG_AUTHOR,
    readTime: "7 min read",
    date: "2026-07-01",
    metaTitle: "Stroke Rehabilitation Jaipur | Elavive Physio",
    metaDescription:
      "Early physiotherapy after stroke improves recovery. Learn how neuro rehab and FES therapy at Elavive Physio in Jaipur help stroke patients regain movement.",
    related: [
      "back-pain-treatment-jaipur",
      "frozen-shoulder-exercises-recovery",
      "knee-pain-physiotherapy-vs-surgery",
    ],
    body: [
      {
        type: "paragraph",
        content:
          "A stroke can change life in an instant, both for the person affected and for their whole family. It happens when the blood supply to part of the brain is interrupted, and the effects depend on which area is involved. The most important message we can share is one of hope: with early, well-structured physiotherapy, a great deal of function can be recovered, and many people regain far more independence than they first believe possible.",
      },
      {
        type: "heading",
        level: 2,
        content: "What Happens to the Body After a Stroke",
      },
      {
        type: "paragraph",
        content:
          "Because the brain controls movement, sensation, and communication, a stroke can affect many different functions at once. The specific pattern varies from person to person, but common effects include:",
      },
      {
        type: "list",
        content: [
          "Weakness or paralysis, often affecting one side of the body (the arm, leg, or both)",
          "Loss of balance and coordination, making standing and walking difficult",
          "Altered sensation, stiffness, or muscle tightness (spasticity)",
          "Difficulty with speech, swallowing, or understanding language",
          "Fatigue and changes in mood or concentration",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "Why Early Rehabilitation Matters",
      },
      {
        type: "paragraph",
        content:
          "Timing is one of the most powerful factors in stroke recovery. Once a patient is medically stable, rehabilitation ideally begins within the first 24 to 48 hours. Starting early helps prevent complications such as stiff joints, pressure sores, and muscle wasting, and it takes advantage of the period when the brain is most ready to relearn. Early movement, even small and assisted, lays the foundation for everything that follows.",
      },
      {
        type: "heading",
        level: 2,
        content: "Neuroplasticity: Your Brain Can Rewire Itself",
      },
      {
        type: "paragraph",
        content:
          "The reason rehabilitation works is a remarkable property of the brain called neuroplasticity: its ability to reorganise itself by forming new connections. When one pathway is damaged by a stroke, repeated, focused practice can encourage healthy areas of the brain to take over lost functions. This is why physiotherapy relies on frequent, purposeful repetition of meaningful movements, because every correct repetition helps the brain rebuild the pathway.",
      },
      {
        type: "heading",
        level: 2,
        content: "What Physiotherapy Sessions Involve",
      },
      {
        type: "list",
        content: [
          "Task-specific training: practising real, meaningful activities such as reaching, gripping, or standing up",
          "Balance and core work to rebuild stability and reduce the risk of falls",
          "Gait rehabilitation to relearn safe, efficient walking",
          "Upper limb retraining to restore arm and hand function for daily tasks",
        ],
      },
      {
        type: "heading",
        level: 2,
        content: "FES: Functional Electrical Stimulation",
      },
      {
        type: "paragraph",
        content:
          "One of the most valuable tools in modern stroke rehabilitation is Functional Electrical Stimulation, or FES. It uses gentle, low-level electrical impulses to stimulate the nerves supplying weakened or paralysed muscles, prompting them to contract and produce useful movement. FES is particularly effective for foot drop (where the front of the foot cannot lift during walking), for restoring hand function, and for supporting a safer walking pattern. It is an evidence-based technology, and it is available as part of our neurological rehabilitation programme at Elavive Physio in Jaipur.",
      },
      {
        type: "heading",
        level: 2,
        content: "Realistic Expectations: A Marathon, Not a Sprint",
      },
      {
        type: "paragraph",
        content:
          "Recovery after a stroke takes time and patience, and progress often comes in steps rather than a straight line. As a general guide, the first three months usually bring the fastest gains, as the brain is most responsive and intensive therapy pays off quickly. Over six months, functional milestones such as improved walking and better arm use often continue to build. By one year and beyond, many people keep making steady progress, especially when they stay active and continue their home programme. Every recovery is individual, but consistency is the common thread among those who do best.",
      },
      {
        type: "heading",
        level: 2,
        content: "The Family's Role in Recovery",
      },
      {
        type: "paragraph",
        content:
          "Families are central to stroke recovery. Encouragement, help with home exercises, and a supportive, well-organised living space can make an enormous difference to motivation and results. Set up the home to reduce fall risks, keep frequently used items within easy reach, and celebrate small wins to keep spirits up. A few practical caregiver tips can also keep everyone safe:",
      },
      {
        type: "list",
        content: [
          "When assisting with transfers, keep your own back straight, bend at the knees, and move close to the person before lifting",
          "Support walking from the weaker side, and use any prescribed aids or a gait belt rather than pulling on the arm",
          "Break daily activities such as dressing and bathing into small, manageable steps and allow extra time",
          "Follow the home exercise programme consistently, and check with the physiotherapist before trying anything new",
        ],
      },
      {
        type: "paragraph",
        content:
          "With the right support, stroke recovery is genuinely possible, and you do not have to navigate it alone. Dr. Ajay Agarwal holds an MPT in Neurology and is a Certified Spinal Cord Injury Specialist (CSCIS), bringing focused expertise to every neurological rehabilitation plan. Book a neuro rehab consultation at Elavive Physio in Jaipur to start a recovery programme built around your goals.",
      },
    ],
  },
];

export const getArticle = (slug: string): BlogArticle | undefined =>
  BLOG_ARTICLES.find((a) => a.slug === slug);

// Up to `limit` related articles: the article's explicit `related` slugs first,
// then fall back to same-category (and finally any) articles to fill the gap.
export const getRelatedArticles = (slug: string, limit = 3): BlogArticle[] => {
  const current = getArticle(slug);
  if (!current) return BLOG_ARTICLES.filter((a) => a.slug !== slug).slice(0, limit);

  const picked: BlogArticle[] = [];
  const seen = new Set<string>([slug]);
  const add = (article: BlogArticle | undefined) => {
    if (article && !seen.has(article.slug)) {
      seen.add(article.slug);
      picked.push(article);
    }
  };

  current.related.forEach((s) => add(getArticle(s)));
  BLOG_ARTICLES.filter((a) => a.category === current.category).forEach(add);
  BLOG_ARTICLES.forEach(add);

  return picked.slice(0, limit);
};
