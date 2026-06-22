import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { validateAccessRequest } from "@/lib/validation";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  // Env validation
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("[access-request] Missing Supabase environment variables");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Content-Type guard
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 });
  }

  // Rate limit: 3 submissions per 10 minutes per IP (stricter — full form, higher DB cost)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const { allowed, retryAfterSeconds } = checkRateLimit(`access-request:${ip}`, 3, 10 * 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate + sanitize all fields
  const result = validateAccessRequest(body);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, email, company, role, aum, interest } = result.data;

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Upsert on email — prevents duplicate rows for the same applicant
  const { error } = await supabase.from("access_requests").upsert(
    {
      name,
      email,
      company,
      role,
      aum_range: aum,
      interest: interest ?? null,
    },
    { onConflict: "email", ignoreDuplicates: true }
  );

  if (error) {
    console.error("[access-request] Supabase error:", error.message);
    return NextResponse.json({ error: "Could not save your request. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
