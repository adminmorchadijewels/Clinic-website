import { NextResponse } from "next/server";
import { CLINIC_CONFIG } from "@/lib/config";

// AI chatbot handler: proxies the site chat widget to the Groq API
// (OpenAI-compatible chat completions endpoint).
// Runs server-side only so GROK_API_KEY never reaches the browser.
// Env var required (see .env.local / Vercel project settings):
//   GROK_API_KEY — Groq API key
//
// Uses only Web APIs (fetch / Request / Response) so it runs cleanly on Vercel
// serverless. Non-streaming for serverless compatibility.

const GROK_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROK_MODEL = "llama-3.3-70b-versatile";

const FALLBACK_REPLY = `I am having trouble connecting right now. Please call us at ${CLINIC_CONFIG.contact.phone} or WhatsApp us directly.`;

const SYSTEM_PROMPT = `You are a helpful patient assistant for Elavive Physio, Jaipur's leading spine and knee physiotherapy clinic. Answer questions only about the clinic, its services, the doctor, and booking. Be warm, concise, and professional. Never give medical diagnoses. Always recommend booking a consultation for specific medical advice. Keep all responses under 120 words.

CLINIC DETAILS:
Name: Elavive Physio, Spine & Knee Clinic
Location: 100, Basement Floor, Milap Nagar, Tonk Road, opposite Rajasthan Jaipuria Hospital, Kailashpuri, Jaipur, Rajasthan 302018
Phone: +91-8955032437
Email: elavivephysio@gmail.com
Hours: Monday to Saturday 9:00 AM to 8:00 PM, Sunday by prior appointment only
Google Rating: 5.0 stars
Cashless / TPA facility available

DOCTOR:
Dr. Ajay Agarwal (PT) — BPT, MPT (Neurology), MBA, COMT, CKT(USA), CDNT
MPT (Neurology) from Janardan Rai Nagar Rajasthan Vidyapeeth (JRNRVU), Udaipur; MBA in Hospital and Healthcare Management
Founder and Director, Elavive Physio
4+ years experience, 4000+ patients treated, 40+ cities
Certifications from Johns Hopkins University and Imperial College London

SERVICES:
Spine & Back: back pain, sciatica, slip disc, spondylitis
Knee & Joint: arthritis, ACL/PCL, meniscus tears
Shoulder: frozen shoulder, rotator cuff, impingement
Sports Injury: muscle tears, tendinopathy, sprains
Post-Surgical Rehab: knee replacement, spinal surgery, ACL
Neuro Rehab: stroke, spinal cord injury, Parkinson's, with advanced Functional Electrical Stimulation (FES) technology
Also: Dry Needling, Cupping Therapy, Hydrotherapy, IASTM, Pediatric Rehab

BOOKING: Call or WhatsApp +91-8955032437 or visit /contact on the website

PRICING: If asked about fees, say 'Please call us at +91-8955032437 for current pricing'
If unsure about anything, direct to +91-8955032437`;

// --- Simple in-memory rate limiter (per IP, 15 requests / hour) --------------
// Module-level Map — acceptable for a low-traffic clinic. It resets on cold
// start, which is fine here. Not shared across serverless instances.
const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

type RateEntry = { count: number; resetAt: number };
const rateLimitMap = new Map<string, RateEntry>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Returns true if the request is allowed, false if the IP is over its quota. */
function checkRateLimit(ip: string, now: number): boolean {
  const entry = rateLimitMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(request: Request) {
  // --- Rate limit ---
  const ip = getClientIp(request);
  const now = Date.now();
  if (!checkRateLimit(ip, now)) {
    return NextResponse.json(
      {
        reply: `You've reached the message limit for now. Please try again later, or call us at ${CLINIC_CONFIG.contact.phone}.`,
      },
      { status: 429 }
    );
  }

  // --- Parse + validate input ---
  let body: { messages?: ChatMessage[] };
  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 400 });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];
  // Keep only well-formed user/assistant turns, cap to the last 8 messages.
  const history = incoming
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-8);

  if (history.length === 0) {
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 400 });
  }

  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    console.error("GROK_API_KEY is not set.");
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 });
  }

  const messages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
  ];

  // --- Call Grok ---
  try {
    const grokRes = await fetch(GROK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROK_MODEL,
        messages,
        stream: false,
        temperature: 0.4,
      }),
    });

    if (!grokRes.ok) {
      const detail = await grokRes.text().catch(() => "");
      console.error(`Grok API error (${grokRes.status}): ${detail}`);
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 502 });
    }

    const data = await grokRes.json();
    const reply: string | undefined =
      data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error("Grok API returned no content:", JSON.stringify(data));
      return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Grok request threw:", err);
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 502 });
  }
}
