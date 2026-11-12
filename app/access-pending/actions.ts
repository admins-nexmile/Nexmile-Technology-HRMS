"use server";

import { redirect } from "next/navigation";
import { loginErrorPath } from "@/lib/auth/errors";
import { getAccessState } from "@/lib/auth/session";
import { acceptMyInvitation } from "@/lib/invitations/data";
import { createClient } from "@/lib/supabase/server";

export type AcceptState = { message: string } | null;

/**
 * Accepts the caller's pending invitation. Runs only when the user clicks
 * "Accept invitation" (a POST Server Action); nothing happens on page
 * load. The database reads the verified email and Google identity itself.
 *
 * If there is no valid invitation (none / expired), the user is signed
 * out: uninvited users are never kept signed in.
 */
export async function acceptInvitationAction(): Promise<AcceptState> {
  const access = await getAccessState();
  if (access.status === "anonymous" || access.status === "rejected") redirect("/login");
  if (access.status === "active") redirect("/");

  const outcome = await acceptMyInvitation();
  if (!outcome.ok) {
    return { message: `We could not process your invitation. ${outcome.message}` };
  }

  if (outcome.result === "accepted") redirect("/");

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(loginErrorPath(outcome.result === "expired" ? "invitation_expired" : "no_invitation"));
}
