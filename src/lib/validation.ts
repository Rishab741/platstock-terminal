const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(value: unknown): string | null {
  if (!value || typeof value !== "string" || !value.trim()) return "Email is required";
  if (value.trim().length > 254) return "Email address is too long";
  if (!EMAIL_REGEX.test(value.trim())) return "Invalid email address format";
  return null;
}

export function sanitizeText(value: unknown, maxLen = 200): string | null {
  if (!value || typeof value !== "string") return null;
  return value.trim().replace(/\s+/g, " ").slice(0, maxLen);
}

type AccessRequestFields = {
  name: string;
  email: string;
  company: string;
  role: string;
  aum: string;
  interest: string | null;
};

type ValidationResult =
  | { error: string }
  | { data: AccessRequestFields };

export function validateAccessRequest(body: unknown): ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Invalid request body" };
  }

  const b = body as Record<string, unknown>;

  const emailError = validateEmail(b.email);
  if (emailError) return { error: emailError };

  const name = sanitizeText(b.name, 100);
  const company = sanitizeText(b.company, 200);
  const role = sanitizeText(b.role, 100);
  const aum = sanitizeText(b.aum, 50);
  const interest = sanitizeText(b.interest, 2000);

  if (!name) return { error: "Name is required" };
  if (!company) return { error: "Company is required" };
  if (!role) return { error: "Role is required" };
  if (!aum) return { error: "AUM range is required" };

  return {
    data: {
      name,
      email: (b.email as string).trim().toLowerCase(),
      company,
      role,
      aum,
      interest,
    },
  };
}
