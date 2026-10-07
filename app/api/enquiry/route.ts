import { NextResponse } from "next/server";
import { siteConfig } from "@/site.config";
import { emptyEnquiry, validateEnquiry, type EnquiryInput } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 * Validates the enquiry on the server and emails it via Resend (https://resend.com).
 *
 * Environment variables (server-side only, never exposed to the browser):
 *   RESEND_API_KEY      required, your Resend API key
 *   CONTACT_EMAIL       where enquiries are delivered (defaults to the email in site.config.ts)
 *   CONTACT_FROM_EMAIL  sender, on a domain verified in Resend, e.g. "Vexe Design <enquiries@vexedesign.com>"
 */

export const runtime = "nodejs";

// Light, per-instance rate limit: 5 enquiries per IP per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json(429, { ok: false, code: "rate_limited", message: "Too many enquiries in a short time. Please try again in a few minutes." });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, code: "bad_request", message: "The enquiry could not be read. Please try again." });
  }

  // Keep only known string fields.
  const input = { ...emptyEnquiry } as EnquiryInput;
  if (body && typeof body === "object") {
    for (const key of Object.keys(emptyEnquiry) as (keyof EnquiryInput)[]) {
      const value = (body as Record<string, unknown>)[key];
      if (typeof value === "string") input[key] = value.trim().slice(0, 4000);
    }
  }

  // Honeypot filled in: almost certainly a bot. Pretend success, send nothing.
  if (input.company) return json(200, { ok: true });

  const errors = validateEnquiry(input);
  if (Object.keys(errors).length > 0) {
    return json(422, { ok: false, code: "invalid", message: "Some details need checking.", errors });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error("[enquiry] Email is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL.");
    return json(503, {
      ok: false,
      code: "not_configured",
      message: "Our online form is temporarily unavailable.",
    });
  }

  const rows: [string, string][] = [
    ["Name", input.fullName],
    ["Business", input.businessName || "Not given"],
    ["Email", input.email],
    ["Phone", input.phone || "Not given"],
    ["Current website", input.website || "Not given"],
    ["Service", input.service],
    ["Budget", input.budget],
    ["Preferred contact", input.contactMethod],
  ];

  const text = `New website enquiry\n\n${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject details:\n${input.details}\n`;
  const html = `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#14151A;max-width:600px">
  <h1 style="font-size:22px;margin:0 0 16px">New website enquiry</h1>
  <table style="border-collapse:collapse;width:100%;font-size:15px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px 8px 0;color:#6b6c72;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:8px 0">${escapeHtml(v)}</td></tr>`,
      )
      .join("")}
  </table>
  <h2 style="font-size:16px;margin:24px 0 8px">Project details</h2>
  <p style="white-space:pre-wrap;font-size:15px;line-height:1.6;margin:0">${escapeHtml(input.details)}</p>
  <p style="margin-top:28px;font-size:12px;color:#6b6c72">Sent from the enquiry form on ${escapeHtml(siteConfig.domain)}. Reply to this email to respond to ${escapeHtml(input.fullName)} directly.</p>
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `New enquiry: ${input.fullName}${input.businessName ? ` (${input.businessName})` : ""} · ${input.service}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[enquiry] Resend error", res.status, await res.text().catch(() => ""));
      return json(502, { ok: false, code: "send_failed", message: "Your enquiry couldn't be sent just now." });
    }
  } catch (err) {
    console.error("[enquiry] Network error sending email", err);
    return json(502, { ok: false, code: "send_failed", message: "Your enquiry couldn't be sent just now." });
  }

  return json(200, { ok: true });
}
