// =============================================================================
// DUMMY CONTENT — Elavivephysio homepage
// TODO: replace with real content. Every export below is placeholder data.
// =============================================================================

// TODO: replace with real WhatsApp / phone number.
export const CONTACT = {
  whatsappNumber: "919999999999", // E.164 without "+" for wa.me links — PLACEHOLDER
  phoneDisplay: "+91 99999 99999",
  phoneHref: "tel:+919999999999",
};

export const whatsappLink = (message = "Hi Elavivephysio, I'd like to book an appointment.") =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

// --- HERO HEADLINE OPTIONS (pick one in production) ---------------------------
// TODO: choose final headline + tagline.
export const HERO_HEADLINES = [
  "Move better. Live fully.",
  "Recover stronger, move freely again.",
  "Expert care that gets you back in motion.",
];

// --- TRUST BAR STATS ----------------------------------------------------------
// TODO: replace placeholder numbers with verified clinic figures.
export const STATS = [
  { value: 12, suffix: "+", label: "Years of Care", icon: "years" },
  { value: 8000, suffix: "+", label: "Patients Treated", icon: "patients" },
  { value: 4.9, suffix: "★", label: "Google Rating", icon: "rating", decimals: 1 },
  { value: 25, suffix: "+", label: "Conditions Treated", icon: "conditions" },
] as const;

// --- SERVICES -----------------------------------------------------------------
// TODO: replace copy + confirm slugs with real service pages.
export const SERVICES = [
  {
    slug: "spine-and-back",
    name: "Spine & Back",
    blurb: "Relief from chronic back pain, sciatica, and posture-related strain.",
    icon: "spine",
  },
  {
    slug: "knee-and-joint",
    name: "Knee & Joint",
    blurb: "Arthritis, ligament injuries, and joint mobility restoration.",
    icon: "knee",
  },
  {
    slug: "shoulder",
    name: "Shoulder",
    blurb: "Frozen shoulder, rotator cuff recovery, and impingement care.",
    icon: "shoulder",
  },
  {
    slug: "sports-injury",
    name: "Sports Injury",
    blurb: "Targeted rehab to get athletes back to peak performance safely.",
    icon: "sports",
  },
  {
    slug: "post-surgical-rehab",
    name: "Post-Surgical Rehab",
    blurb: "Structured recovery programmes after orthopaedic surgery.",
    icon: "rehab",
  },
  {
    slug: "neuro-rehab",
    name: "Neuro Rehab",
    blurb: "Regaining strength and movement after stroke or nerve injury.",
    icon: "neuro",
  },
] as const;

// --- WHY CHOOSE US ------------------------------------------------------------
// TODO: confirm these differentiators with the clinic.
export const PILLARS = [
  {
    title: "One-on-one assessments",
    body: "Every plan starts with a 45-minute biomechanical assessment — no conveyor-belt treatment.",
    icon: "assess",
  },
  {
    title: "Hands-on + tech-led therapy",
    body: "Manual therapy paired with ultrasound, dry needling, and gait analysis tools.",
    icon: "tech",
  },
  {
    title: "Therapists who follow through",
    body: "The same physiotherapist tracks your recovery from first visit to discharge.",
    icon: "team",
  },
  {
    title: "Central Jaipur, easy access",
    body: "Ground-floor clinic near C-Scheme with parking and wheelchair access.",
    icon: "location",
  },
] as const;

// --- DOCTOR / FOUNDER ---------------------------------------------------------
// TODO: replace with real founder details + verified credentials.
export const DOCTOR = {
  name: "Dr. Ajay Agarwal",
  qualification: "MPT (Orthopedics) · 12+ Years Experience",
  bioTeaser:
    "Dr. Ajay Agarwal founded Elavivephysio with a simple belief: recovery should be measured, personal, and lasting. After more than a decade treating everyone from weekend runners to post-surgical patients across Jaipur, he built a clinic where evidence-based physiotherapy meets genuinely attentive care.",
  // TODO: replace with real founder portrait. Believable dummy headshot from
  // pravatar (seeded so it stays consistent); see remotePatterns in next.config.
  photo: "https://i.pravatar.cc/600?img=12",
};

// --- VIDEO TESTIMONIALS -------------------------------------------------------
// TODO: replace thumbnails + add real video sources (videoSrc).
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
    name: "Arjun",
    condition: "Sports hamstring strain",
    thumb: "/placeholders/video.svg",
    videoSrc: "",
  },
  {
    id: "v5",
    name: "Sunita",
    condition: "Knee osteoarthritis",
    thumb: "/placeholders/video.svg",
    videoSrc: "",
  },
] as const;

// --- TEXT TESTIMONIALS --------------------------------------------------------
// TODO: replace with real, consented patient reviews.
export const TESTIMONIALS = [
  {
    name: "Kavita Menon",
    condition: "Chronic lower back pain",
    rating: 5,
    quote:
      "After years of painkillers, six weeks here got me back to morning walks. The assessment alone told me more than three doctors had.",
  },
  {
    name: "Vikram Singh",
    condition: "Post-ACL surgery",
    rating: 5,
    quote:
      "My physio mapped out every milestone. I was back on the cricket pitch ahead of schedule and stronger than before.",
  },
  {
    name: "Anjali Gupta",
    condition: "Frozen shoulder",
    rating: 5,
    quote:
      "I could barely lift my arm. Now I'm pain-free. The hands-on therapy combined with home exercises made all the difference.",
  },
  {
    name: "Rajesh Agarwal",
    condition: "Cervical spondylosis",
    rating: 5,
    quote:
      "Professional, patient, and genuinely caring. They explained every step so I actually understood my own recovery.",
  },
  {
    name: "Neha Bansal",
    condition: "Sciatica",
    rating: 5,
    quote:
      "The sciatic pain down my leg is finally gone. Clean clinic, on-time appointments, and a team that listens.",
  },
  {
    name: "Suresh Iyer",
    condition: "Knee osteoarthritis",
    rating: 4,
    quote:
      "At 62 I'd accepted living with knee pain. Their programme restored mobility I thought I'd lost for good.",
  },
  {
    name: "Pooja Sharma",
    condition: "Post-natal back pain",
    rating: 5,
    quote:
      "Gentle, knowledgeable, and reassuring through a tough recovery. I recommend them to every new mother I know.",
  },
  {
    name: "Amit Khanna",
    condition: "Tennis elbow",
    rating: 5,
    quote:
      "Dry needling plus a smart loading plan fixed an elbow two other clinics couldn't. Worth every rupee.",
  },
] as const;

// --- 3D HERO: BODY REGIONS ----------------------------------------------------
// Drives the interactive hover/tap info cards in the 3D scene.
// TODO: confirm descriptions + link slugs map to real service pages.
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
    serviceSlug: "spine-and-back",
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
    serviceSlug: "knee-and-joint",
  },
  knee: {
    label: "Knee & Joint",
    description: "Ligament, arthritis & post-op knee rehab.",
    serviceSlug: "knee-and-joint",
  },
  ankle: {
    label: "Ankle & Foot",
    description: "Sprains, plantar pain & sports recovery.",
    serviceSlug: "sports-injury",
  },
};
