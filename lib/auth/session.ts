import "server-only";
import { createClient } from "@/lib/supabase/server";
import { checkEmailPolicy, type EmailPolicyResult } from "./email-policy";

export type AccessState =
  | { status: "anonymous" }
  | { status: "rejected"; reason: Extract<EmailPolicyResult, { ok: false }>["reason"] }
  /** Signed in with an allowed, verified account; no roles assigned yet. */
  | { status: "pending"; userId: string; email: string };

/**
 * Data Access Layer entry point for the current user.
 *
 * Uses `auth.getUser()`, which validates the session with Supabase Auth
 * rather than trusting the cookie contents. Must be called inside a
 * <Suspense> boundary (it reads cookies at request time).
 *
 * Roles are not read yet; every allowed user is "pending" until the
 * roles slice lands.
 */
export async function getAccessState(): Promise<AccessState> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return { status: "anonymous" };

  const policy = checkEmailPolicy(user);
  if (!policy.ok) return { status: "rejected", reason: policy.reason };

  return { status: "pending", userId: user.id, email: policy.email };
}
