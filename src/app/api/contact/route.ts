import { NextResponse } from "next/server";

// Contact-form handler: turns a submitted lead into a WhatsApp notification via
// the CallMeBot API. Runs server-side only so the API key is never shipped to
// the browser. Env vars required (see .env.local / Vercel project settings):
//   CALLMEBOT_API_KEY — the key CallMeBot issued for the destination number
//   CALLMEBOT_PHONE    — destination WhatsApp number, E.164 without the "+"
export const runtime = "nodejs";

type LeadPayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const firstName = clean(body.firstName);
  const lastName = clean(body.lastName);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const service = clean(body.service);
  const preferredDate = clean(body.preferredDate);
  const preferredTime = clean(body.preferredTime);
  const message = clean(body.message);

  // Required fields per the brief.
  if (!firstName || !phone || !message) {
    return NextResponse.json(
      { success: false, error: "Missing required fields: name, phone, and message are required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.CALLMEBOT_API_KEY;
  const callmebotPhone = process.env.CALLMEBOT_PHONE;
  if (!apiKey || !callmebotPhone) {
    // Misconfiguration — surface as a server error, not a validation error.
    console.error("CallMeBot env vars missing: set CALLMEBOT_API_KEY and CALLMEBOT_PHONE.");
    return NextResponse.json(
      { success: false, error: "Notification service is not configured." },
      { status: 500 }
    );
  }

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text = [
    "New Patient Lead - Elavive Physio",
    "",
    `Name: ${[firstName, lastName].filter(Boolean).join(" ")}`,
    `Phone: ${phone}`,
    `Email: ${email || "-"}`,
    `Service: ${service || "-"}`,
    `Date: ${preferredDate || "-"}`,
    `Time: ${preferredTime || "-"}`,
    `Message: ${message}`,
    `Submitted: ${submittedAt} IST`,
  ].join("\n");

  const url =
    "https://api.callmebot.com/whatsapp.php" +
    `?phone=${encodeURIComponent(callmebotPhone)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(apiKey)}`;

  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`CallMeBot request failed (${res.status}): ${detail}`);
      return NextResponse.json(
        { success: false, error: "Notification could not be delivered." },
        { status: 502 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CallMeBot request threw:", err);
    return NextResponse.json(
      { success: false, error: "Notification service is unreachable." },
      { status: 502 }
    );
  }
}
