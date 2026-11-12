import { NextResponse, type NextRequest } from "next/server";
import { checkEmailPolicy } from "@/lib/auth/email-policy";
import { loginErrorPath, type LoginErrorCode } from "@/lib/auth/errors";
import { createClient } from "@/lib/supabase/server";

/**
 * OAuth return URL. Exchanges the one-time code for a session, then
 * enforces the sign-in policy on the server. Disallowed accounts are
 * signed out immediately. There is deliberately no `next` parameter, so
 * this route cannot be used as an open redirect.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const fail = (code: LoginErrorCode) =>
    NextResponse.redirect(new URL(loginErrorPath(code), request.url));

  if (searchParams.has("error")) return fail("oauth");

  const code = searchParams.get("code");
  if (!code) return fail("callback");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data.user) return fail("callback");

  const policy = checkEmailPolicy(data.user);
  if (!policy.ok) {
    await supabase.auth.signOut();
    return fail(policy.reason);
  }

  // Roles arrive in a later slice; approved accounts wait here for now.
  return NextResponse.redirect(new URL("/access-pending", request.url));
}
