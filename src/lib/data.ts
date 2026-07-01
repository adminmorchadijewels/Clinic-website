// =============================================================================
// SITE CONTENT — Elavive Physio (Spine & Knee Clinic), Jaipur
// Real clinic content. A few contact details / media assets are still marked
// TODO where the clinic has not yet supplied the final value.
// =============================================================================

// --- CLINIC IDENTITY ----------------------------------------------------------
export const CLINIC = {
  fullName: "Elavive Physio — Spine & Knee Clinic",
  shortName: "Elavive Physio",
  positioning: "Jaipur's Leading Spine & Knee Clinic",
  tagline: "Move better. Live fully.",
};

// --- CONTACT ------------------------------------------------------------------
// TODO: replace with the clinic's real WhatsApp / phone number.
export const CONTACT = {
  whatsappNumber: "91XXXXXXXXXX", // E.164 without "+" for wa.me links — TODO: real number
  phoneDisplay: "+91 XXXXX XXXXX",
  phoneHref: "tel:+91XXXXXXXXXX",
};

export const whatsappLink = (message = "Hi Elavive Physio, I'd like to book an appointment.") =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

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
  { value: 4.9, suffix: "★", label: "Google Rating", icon: "rating", decimals: 1 },
  { value: 25, suffix: "+", label: "Conditions Treated", icon: "conditions" },
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
] as const;

// --- DOCTOR / FOUNDER ---------------------------------------------------------
export const DOCTOR = {
  name: "Dr. Ajay Agarwal (PT)",
  qualification: "BPT, MPT(Neurology), MHA, MIAFT, MJPN, COMT, CDNT | Founder & Director",
  bioTeaser:
    "Dr. Ajay Agarwal founded Elavive Physio with a single belief: every patient deserves a recovery plan built around them, not a template. With 4+ years of clinical experience, 4,000+ patients treated, and certifications from Johns Hopkins University and Imperial College London, he brings internationally trained expertise to Jaipur.",
  // TODO: replace with the real founder portrait. Placeholder headshot from
  // pravatar (seeded so it stays consistent); see remotePatterns in next.config.
  photo: "https://i.pravatar.cc/600?img=12",
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
// TODO: REPLACE WITH REAL PATIENT TESTIMONIALS BEFORE LAUNCH
// ALL TESTIMONIALS BELOW ARE PLACEHOLDER/DUMMY CONTENT
// Requirements: get written consent from each real patient before publishing
// Each real testimonial needs: patient first name, condition treated, star rating, testimonial text
export const TESTIMONIALS = [
  {
    name: "Kavita M.",
    condition: "Chronic lower back pain",
    rating: 5,
    quote:
      "After years of painkillers, six weeks here got me back to morning walks. The assessment alone told me more than three doctors had.",
  },
  {
    name: "Vikram S.",
    condition: "Post-ACL surgery",
    rating: 5,
    quote:
      "My physio mapped out every milestone. I was back on the cricket pitch ahead of schedule and stronger than before.",
  },
  {
    name: "Sunita R.",
    condition: "Frozen shoulder",
    rating: 5,
    quote:
      "I could barely lift my arm. Now I'm pain-free. The hands-on therapy combined with the home exercise plan made all the difference.",
  },
  {
    name: "Ramesh K.",
    condition: "Slip disc",
    rating: 5,
    quote:
      "Dr. Agarwal explained exactly what was happening in my spine in terms I could understand. That alone changed how I approached recovery.",
  },
  {
    name: "Priya T.",
    condition: "Knee replacement rehab",
    rating: 5,
    quote:
      "Three months post knee replacement and I'm walking unaided. The structured rehab programme here is exceptional.",
  },
  {
    name: "Meena P.",
    condition: "Pediatric rehab",
    rating: 5,
    quote:
      "My son has cerebral palsy. The pediatric care here is gentle, thorough, and genuinely caring. We've seen real progress.",
  },
  {
    name: "Arjun M.",
    condition: "Sports injury",
    rating: 5,
    quote:
      "As a runner, I was devastated by my knee injury. They didn't just fix the injury, they fixed my running form too.",
  },
  {
    name: "Rahul G.",
    condition: "Back pain",
    rating: 5,
    quote:
      "Best physiotherapy clinic in Jaipur. Professional, clean, modern. Dr. Agarwal is exceptionally knowledgeable.",
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
  /** Names to look up in TESTIMONIALS for the related-testimonial section. */
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
    testimonials: ["Kavita M.", "Ramesh K."],
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
    testimonials: ["Vikram S.", "Arjun M."],
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
    testimonials: ["Sunita R."],
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
    testimonials: ["Arjun M.", "Vikram S."],
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
    testimonials: ["Priya T.", "Vikram S."],
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
      "Dr. Agarwal holds an MPT in Neurology, with advanced training in neurological rehabilitation. Our neuro rehabilitation programs in Jaipur focus on functional recovery: restoring independence, improving balance and coordination, and maximizing quality of life for patients with neurological conditions.",
    conditions: [
      "Stroke rehabilitation",
      "Spinal cord injury recovery",
      "Parkinson's disease management",
      "Nerve injury rehabilitation",
      "Multiple sclerosis management",
    ],
    approach: [
      "Neurological assessment and goal setting",
      "Functional movement retraining",
      "Balance and coordination rehabilitation",
      "Independence-focused therapy",
    ],
    testimonials: ["Meena P."],
    seoTitle: "Neurological Rehabilitation in Jaipur | Elavive",
    seoDescription:
      "Neurological rehabilitation in Jaipur for stroke, spinal cord injury and Parkinson's by Dr. Ajay Agarwal, MPT Neurology. Book your assessment.",
  },
};

/** Resolve a service's related testimonials (by name) into full objects. */
export function getServiceTestimonials(slug: ServiceSlug) {
  const names = new Set(SERVICE_DETAILS[slug].testimonials);
  return TESTIMONIALS.filter((t) => names.has(t.name));
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
// TODO: replace all seed articles below with real content. These are placeholder
// posts; the body copy is rendered from a shared placeholder template for now,
// to be swapped for real MDX / CMS content later.

// Ordered as they appear in the listing filter tabs ("All" is prepended in the
// UI). Every article's `category` must be one of these.
export const BLOG_CATEGORIES = [
  "Spine Health",
  "Knee Care",
  "Sports Recovery",
  "Pain Management",
  "General",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogArticle {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  author: string;
  readTime: string; // e.g. "4 min read"
  date: string; // human-readable; TODO: swap for real publish dates
}

// Single shared byline for now — every seed post is attributed to the founder.
export const BLOG_AUTHOR = "Dr. Ajay Agarwal";

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "morning-habits-back-pain",
    category: "Spine Health",
    title: "5 Habits Making Your Back Pain Worse",
    excerpt:
      "The first hour of your day sets the tone for your spine. A few small changes to how you wake, stretch, and sit can dramatically reduce daily back pain.",
    author: BLOG_AUTHOR,
    readTime: "4 min read",
    date: "24 June 2026",
  },
  {
    slug: "after-acl-surgery",
    category: "Knee Care",
    title: "After ACL Surgery: What Your Physio Wants You to Know",
    excerpt:
      "Recovery from ACL reconstruction is a marathon, not a sprint. Here's what a well-structured rehab timeline actually looks like, and the mistakes to avoid.",
    author: BLOG_AUTHOR,
    readTime: "5 min read",
    date: "18 June 2026",
  },
  {
    slug: "painkillers-not-a-plan",
    category: "Pain Management",
    title: "Why Painkillers Are Not a Physiotherapy Plan",
    excerpt:
      "Medication can mask pain, but it rarely fixes the cause. Understanding the difference is the first step toward lasting relief.",
    author: BLOG_AUTHOR,
    readTime: "3 min read",
    date: "11 June 2026",
  },
  {
    slug: "return-to-running-after-knee-injury",
    category: "Sports Recovery",
    title: "How to Return to Running After a Knee Injury",
    excerpt:
      "Getting back on the road too fast is the fastest way to get injured again. A progressive, load-managed return keeps you running for good.",
    author: BLOG_AUTHOR,
    readTime: "6 min read",
    date: "4 June 2026",
  },
  {
    slug: "office-chair-posture",
    category: "Spine Health",
    title: "Is Your Office Chair Ruining Your Posture?",
    excerpt:
      "Eight hours a day in the wrong chair adds up. Learn how to set up your workstation to protect your spine, no expensive equipment required.",
    author: BLOG_AUTHOR,
    readTime: "4 min read",
    date: "28 May 2026",
  },
  {
    slug: "first-physiotherapy-visit",
    category: "General",
    title: "Your First Physiotherapy Visit: What to Expect",
    excerpt:
      "Nervous about your first appointment? Here's a step-by-step walkthrough of the assessment, so you can walk in knowing exactly what happens.",
    author: BLOG_AUTHOR,
    readTime: "3 min read",
    date: "21 May 2026",
  },
];

export const getArticle = (slug: string): BlogArticle | undefined =>
  BLOG_ARTICLES.find((a) => a.slug === slug);

// Up to `limit` other articles, preferring ones in the same category.
export const getRelatedArticles = (slug: string, limit = 3): BlogArticle[] => {
  const current = getArticle(slug);
  const others = BLOG_ARTICLES.filter((a) => a.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameCategory = others.filter((a) => a.category === current.category);
  const rest = others.filter((a) => a.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
};
