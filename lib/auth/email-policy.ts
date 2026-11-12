import type { User } from "@supabase/supabase-js";

/** Only Nexmile Technology Workspace accounts may sign in. */
export const ALLOWED_EMAIL_DOMAIN = "nexmiletechnology.com";

/** True when the address is exactly `<local>@nexmiletechnology.com`. */
export function hasAllowedDomain(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalised = email.trim().toLowerCase();
  const at = normalised.lastIndexOf("@");
  return at > 0 && normalised.slice(at + 1) === ALLOWED_EMAIL_DOMAIN;
}

export type EmailPolicyResult =
  | { ok: true; email: string }
  | { ok: false; reason: "domain" | "unverified" };

/**
 * Server-side sign-in policy. `user` must come from a verified source
 * (`auth.getUser()` or the code exchange), never from client input or
 * user-editable metadata.
 */
export function checkEmailPolicy(user: Pick<User, "email" | "email_confirmed_at">): EmailPolicyResult {
  if (!hasAllowedDomain(user.email)) return { ok: false, reason: "domain" };
  if (!user.email_confirmed_at) return { ok: false, reason: "unverified" };
  return { ok: true, email: user.email!.trim().toLowerCase() };
}
