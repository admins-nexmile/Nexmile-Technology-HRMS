"use server";

import { redirect } from "next/navigation";
import { getAccessState } from "@/lib/auth/session";
import { acceptMyInvitation } from "@/lib/invitations/data";

export type AcceptState = { tone: "warning" | "info" | "error"; message: string } | null;

/**
 * Accepts the caller's pending invitation. Runs only when the user clicks
 * "Accept invitation" (a POST Server Action); nothing happens on page
 * load. The database reads the verified email itself.
 */
export async function acceptInvitationAction(): Promise<AcceptState> {
  const access = await getAccessState();
  if (access.status === "anonymous" || access.status === "rejected") redirect("/login");
  if (access.status === "active") redirect("/");

  const outcome = await acceptMyInvitation();
  if (!outcome.ok) {
    return { tone: "error", message: `We could not process your invitation. ${outcome.message}` };
  }

  switch (outcome.result) {
    case "accepted":
      redirect("/");
    case "expired":
      return {
        tone: "warning",
        message: "Your invitation has expired. Please ask HR to send you a new one.",
      };
    case "none":
      return {
        tone: "info",
        message:
          "There is no invitation for this account yet. Please ask HR to invite you, then try again.",
      };
  }
}
