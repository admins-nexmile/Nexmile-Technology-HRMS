import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasAllowedDomain } from "@/lib/auth/email-policy";
import { loginErrorPath } from "@/lib/auth/errors";
import { getSupabaseEnv } from "./env";

/** Routes reachable without an approved account. */
const PUBLIC_PATHS = ["/login", "/auth/callback", "/access-pending"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

/**
 * Refreshes the Supabase session cookie and applies optimistic route
 * protection. This is a convenience layer only: pages re-check access on
 * the server with `auth.getUser()`, and data is protected by RLS.
 */
export async function updateSession(request: NextRequest) {
  const { url, publishableKey } = getSupabaseEnv();
  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
        for (const [key, value] of Object.entries(headers ?? {})) {
          response.headers.set(key, value);
        }
      },
    },
  });

  // Do not run code between createServerClient and getClaims(): it
  // refreshes an expired session. getClaims() verifies the JWT signature.
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const email = typeof claims?.email === "string" ? claims.email : undefined;
  const { pathname } = request.nextUrl;

  /** Redirect while keeping any refreshed session cookies. */
  const redirectTo = (path: string) => {
    const target = NextResponse.redirect(new URL(path, request.url));
    for (const cookie of response.cookies.getAll()) {
      target.cookies.set(cookie);
    }
    return target;
  };

  // A session for a non-Nexmile account must not survive. Signing out
  // here clears the auth cookies (cookie writes are allowed in proxy).
  if (claims && !hasAllowedDomain(email)) {
    await supabase.auth.signOut();
    return redirectTo(loginErrorPath("domain"));
  }

  if (isPublicPath(pathname)) return response;

  if (!claims) return redirectTo("/login");

  // Signed in: the server-side DashboardAccessGate decides between the
  // dashboard (active profile + role) and /access-pending, using the
  // database rather than anything in the token.
  return response;
}
