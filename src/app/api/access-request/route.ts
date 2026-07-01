import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { validateAccessRequest } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";

export const runtime = "edge";

// Uses crypto.getRandomValues — available on all edge runtimes
function generateRefCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // omits ambiguous 0/O/1/I
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const b of bytes) code += chars[b % chars.length];
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

function adminEmailHtml(
  name: string,
  email: string,
  company: string,
  role: string,
  aum: string,
  interest: string | undefined,
  refCode: string,
): string {
  return `
    <div style="font-family:monospace;max-width:560px;margin:0 auto;background:#08060f;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(124,58,237,0.25)">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#a78bfa"></span>
        <h2 style="color:#a78bfa;margin:0;font-size:13px;letter-spacing:0.15em;text-transform:uppercase">New Beta Access Request</h2>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:7px 0;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;width:110px">Ref</td><td style="padding:7px 0;color:#7c3aed;font-size:13px;letter-spacing:0.08em">${refCode}</td></tr>
        <tr><td style="padding:7px 0;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.12em">Name</td><td style="padding:7px 0;color:#f1f5f9">${name}</td></tr>
        <tr><td style="padding:7px 0;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.12em">Email</td><td style="padding:7px 0;color:#06b6d4">${email}</td></tr>
        <tr><td style="padding:7px 0;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.12em">Company</td><td style="padding:7px 0;color:#f1f5f9">${company}</td></tr>
        <tr><td style="padding:7px 0;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.12em">Role</td><td style="padding:7px 0;color:#f1f5f9">${role}</td></tr>
        <tr><td style="padding:7px 0;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.12em">AUM Range</td><td style="padding:7px 0;color:#a78bfa">${aum}</td></tr>
        ${interest ? `<tr><td style="padding:7px 0;color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.12em;vertical-align:top">Use Case</td><td style="padding:7px 0;color:#f1f5f9;line-height:1.6">${interest}</td></tr>` : ""}
      </table>
      <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06);color:#475569;font-size:10px;letter-spacing:0.05em">
        Platstock Terminal · Beta Applications · Reply directly to contact this applicant
      </div>
    </div>
  `;
}

function applicantEmailHtml(
  name: string,
  company: string,
  role: string,
  aum: string,
  refCode: string,
): string {
  const firstName = name.split(" ")[0];
  return `
    <div style="font-family:monospace;max-width:560px;margin:0 auto;background:#08060f;color:#e2e8f0;padding:32px;border-radius:12px;border:1px solid rgba(124,58,237,0.25)">
      <div style="text-align:center;margin-bottom:28px">
        <div style="display:inline-block;padding:6px 14px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.3);border-radius:6px;color:#a78bfa;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:18px">
          Platstock Terminal
        </div>
        <h1 style="margin:0 0 8px;font-size:20px;color:#f1f5f9;letter-spacing:-0.02em">Application Received</h1>
        <p style="margin:0;color:#64748b;font-size:12px">Private Beta Access · ${new Date().getFullYear()}</p>
      </div>

      <div style="background:rgba(124,58,237,0.06);border:1px solid rgba(124,58,237,0.15);border-radius:8px;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0 0 4px;color:#94a3b8;font-size:10px;text-transform:uppercase;letter-spacing:0.15em">Reference Number</p>
        <p style="margin:0;font-size:18px;letter-spacing:0.12em;color:#a78bfa;font-weight:700">${refCode}</p>
      </div>

      <p style="color:#cbd5e1;font-size:13px;line-height:1.7;margin:0 0 20px">
        Hi ${firstName}, we've received your application for access to Platstock Terminal. Every application is reviewed personally — we'll be in touch within <strong style="color:#f1f5f9">48 hours</strong>.
      </p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
          <td style="padding:9px 0;color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;width:100px">Company</td>
          <td style="padding:9px 0;color:#e2e8f0;font-size:12px">${company}</td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
          <td style="padding:9px 0;color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:0.1em">Role</td>
          <td style="padding:9px 0;color:#e2e8f0;font-size:12px">${role}</td>
        </tr>
        <tr>
          <td style="padding:9px 0;color:#475569;font-size:10px;text-transform:uppercase;letter-spacing:0.1em">AUM Range</td>
          <td style="padding:9px 0;color:#a78bfa;font-size:12px">${aum}</td>
        </tr>
      </table>

      <div style="background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.12);border-radius:8px;padding:14px 18px;margin-bottom:24px">
        <p style="margin:0;color:#64748b;font-size:11px;line-height:1.6">
          While you wait, you can explore our <a href="https://platstock.com" style="color:#06b6d4;text-decoration:none">product page</a> to learn more about Platstock Terminal's alpha engine, sovereign data ledger, and cross-platform capabilities.
        </p>
      </div>

      <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:16px;color:#334155;font-size:10px;letter-spacing:0.05em;text-align:center">
        Platstock Terminal · This is a system-generated email · Do not reply
      </div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  // ── Step 1: env check ──────────────────────────────────
  const resendKey   = process.env.RESEND_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!resendKey && (!supabaseUrl || !supabaseKey)) {
    console.error("[access-request] No delivery service configured");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // ── Step 2: content-type ───────────────────────────────
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  // ── Step 3: rate limit (fail open if Redis unavailable) ─
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  try {
    const { allowed, retryAfterSeconds } = await checkRateLimit("access-request", ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait before trying again." },
        { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
      );
    }
  } catch (e) {
    console.warn("[access-request] Rate limiter unavailable, failing open:", String(e));
  }

  // ── Step 4: parse + validate ───────────────────────────
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
  const refCode = generateRefCode();

  let emailSent     = false;
  let supabaseSaved = false;

  // ── Step 5: Resend emails ──────────────────────────────
  // Sending to the applicant's email requires a verified domain at resend.com/domains.
  // Set RESEND_FROM_EMAIL (e.g. "Platstock <beta@platstock.com>") after verifying.
  // Until then, only the admin notification is sent.
  if (resendKey) {
    const adminEmail  = process.env.CONTACT_EMAIL ?? "crishab07@gmail.com";
    const fromEmail   = process.env.RESEND_FROM_EMAIL ?? "Platstock Beta <onboarding@resend.dev>";
    const domainReady = Boolean(process.env.RESEND_FROM_EMAIL);
    const resend      = new Resend(resendKey);

    // Admin notification
    const { data: adminData, error: adminError } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: email,
      subject: `[Beta Application] ${name} — ${company} · ${refCode}`,
      html: adminEmailHtml(name, email, company, role, aum, interest, refCode),
    });

    if (adminError) {
      console.error("[access-request] Resend admin error:", adminError.name, "-", adminError.message);
    } else {
      console.log("[access-request] Resend admin ok id=", adminData?.id);
      emailSent = true;
    }

    // Applicant confirmation — only when domain is verified
    if (domainReady) {
      const { data: confirmData, error: confirmError } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Your Platstock Terminal application · Ref ${refCode}`,
        html: applicantEmailHtml(name, company, role, aum, refCode),
      });

      if (confirmError) {
        console.error("[access-request] Resend confirm error:", confirmError.name, "-", confirmError.message);
      } else {
        console.log("[access-request] Resend confirm ok id=", confirmData?.id);
      }
    } else {
      console.log("[access-request] Skipping applicant confirmation — RESEND_FROM_EMAIL not set (domain not verified)");
    }
  }

  // ── Step 6: Supabase persistent storage ───────────────
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("leads").upsert(
      { email, type: "access_request", name, company, role, aum_range: aum, interest: interest ?? null, ref_code: refCode },
      { onConflict: "email" }
    );

    if (error) {
      console.error("[access-request] Supabase error:", error.message);
    } else {
      console.log("[access-request] Supabase ok email=", email);
      supabaseSaved = true;
    }
  }

  // ── Step 7: respond ────────────────────────────────────
  if (!emailSent && !supabaseSaved) {
    console.error("[access-request] Both delivery methods failed");
    return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 });
  }

  console.log("[access-request] success ref=", refCode, "email=", emailSent, "supabase=", supabaseSaved);
  return NextResponse.json({ success: true, refCode }, { status: 201 });
}
