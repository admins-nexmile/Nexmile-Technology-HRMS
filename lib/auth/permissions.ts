/**
 * Permission keys and invitation rules shared by server code and UI.
 *
 * These mirror the database (migrations 2.1 and 2.3), which is the real
 * enforcement point. The UI uses them only to decide what to show.
 */
export const PERMISSIONS = {
  invitationsManage: "invitations.manage",
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export function hasPermission(permissions: readonly string[], permission: string): boolean {
  return permissions.includes(permission);
}

/** Roles that can ever be granted by invitation (never super_admin). */
export const INVITABLE_ROLES = ["payroll_admin", "hr_admin", "manager", "employee"] as const;
export type InvitableRole = (typeof INVITABLE_ROLES)[number];

export const ROLE_LABELS: Record<InvitableRole, string> = {
  payroll_admin: "Payroll Admin",
  hr_admin: "HR Admin",
  manager: "Manager",
  employee: "Employee",
};

/**
 * Roles the caller may invite: super_admin → all invitable roles;
 * hr_admin → manager and employee; anyone else → none.
 */
export function invitableRolesFor(roleKeys: readonly string[]): InvitableRole[] {
  if (roleKeys.includes("super_admin")) return [...INVITABLE_ROLES];
  if (roleKeys.includes("hr_admin")) return ["manager", "employee"];
  return [];
}

export function isInvitableRole(value: unknown): value is InvitableRole {
  return typeof value === "string" && (INVITABLE_ROLES as readonly string[]).includes(value);
}
