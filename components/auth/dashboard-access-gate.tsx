import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { loginErrorPath } from "@/lib/auth/errors";
import { getAccessState } from "@/lib/auth/session";

/**
 * Server-side guard for every dashboard route (defence in depth behind
 * proxy.ts). Must be rendered inside a <Suspense> boundary.
 *
 * Until roles exist, no account may see the dashboard: signed-in users
 * are sent to /access-pending.
 */
export async function DashboardAccessGate({ children }: { children: ReactNode }) {
  const access = await getAccessState();

  switch (access.status) {
    case "anonymous":
      redirect("/login");
    case "rejected":
      redirect(loginErrorPath(access.reason));
    case "pending":
      redirect("/access-pending");
  }

  // Unreachable until an "active" status is introduced with roles.
  return children;
}
