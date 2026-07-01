import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { validateAccessRequest } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[access-request] Missing RESEND_API_KEY");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, retryAfterSeconds } = await checkRateLimit("access-request", ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = validateAccessRequest(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, email, company, role, aum, interest } = result.data;

  const toEmail = process.env.CONTACT_EMAIL ?? "rishash851@gmail.com";
  const resend = new Resend(resendKey);

  const { error } = await resend.emails.send({
    from: "Platstock Beta <onboarding@resend.dev>",
    to: toEmail,
    replyTo: email,
    subject: `[Beta Application] ${name} — ${company}`,
    html: `
      <div style="font-family:monospace;max-width:560px;margin:0 auto;background:#08060f;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(124,58,237,0.25)">
        <h2 style="color:#a78bfa;margin:0 0 24px;font-size:16px;letter-spacing:0.1em;text-transform:uppercase">New Beta Access Request</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;width:120px">Name</td><td style="padding:8px 0;color:#f1f5f9">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Email</td><td style="padding:8px 0;color:#06b6d4">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Company</td><td style="padding:8px 0;color:#f1f5f9">${company}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">Role</td><td style="padding:8px 0;color:#f1f5f9">${role}</td></tr>
          <tr><td style="padding:8px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em">AUM Range</td><td style="padding:8px 0;color:#a78bfa">${aum}</td></tr>
          ${interest ? `<tr><td style="padding:8px 0;color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;vertical-align:top">Use Case</td><td style="padding:8px 0;color:#f1f5f9;line-height:1.6">${interest}</td></tr>` : ""}
        </table>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);color:#475569;font-size:10px;letter-spacing:0.05em">
          Platstock Terminal · Beta Applications · Reply directly to contact this applicant
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("[access-request] Resend error:", error.message);
    return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
