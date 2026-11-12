import "server-only";
import { notFound, redirect } from "next/navigation";
import { loginErrorPath } from "./errors";
import { hasPermission, type PermissionKey } from "./permissions";
import { getAccessState, type ActiveUser } from "./session";

/**
 * For pages: returns the active user if they hold `permission`.
 * Otherwise redirects (not signed in / pending) or responds 404, so the
 * page's existence is not revealed to users without the permission.
 * Must be called inside a <Suspense> boundary.
 */
export async function requirePagePermission(permission: PermissionKey): Promise<ActiveUser> {
  const access = await getAccessState();
  switch (access.status) {
    case "anonymous":
      redirect("/login");
    case "rejected":
      redirect(loginErrorPath(access.reason));
    case "pending":
      redirect("/access-pending");
  }
  if (!hasPermission(access.permissions, permission)) notFound();
  return access;
}

/**
 * For Server Actions: returns the active user if they hold `permission`,
 * or null. Actions must return an error instead of trusting the UI.
 */
export async function getUserWithPermission(
  permission: PermissionKey,
): Promise<ActiveUser | null> {
  const access = await getAccessState();
  if (access.status !== "active") return null;
  return hasPermission(access.permissions, permission) ? access : null;
}
