import { PERMISSIONS, ROLES, hasPermission, hasRole } from "@/lib/auth/permissions";
import type { NavContext, NavSection } from "@/lib/types/hrms";

/**
 * Sidebar navigation, built from the signed-in user's roles and
 * permissions. Items the user cannot use are not rendered at all. This is
 * presentation only: every page and server action re-checks access on the
 * server, and the database enforces it again (RLS + functions).
 */
const isEmployee = (c: NavContext) => c.hasEmployee;
const can = (permission: string) => (c: NavContext) => hasPermission(c.permissions, permission);

export const navigation: NavSection[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", icon: "dashboard", href: "/", show: () => true }],
  },
  {
    title: "My workspace",
    items: [
      { label: "My profile", icon: "user", href: "/profile", show: isEmployee },
      { label: "Attendance", icon: "clock", href: "/attendance", show: isEmployee },
      {
        label: "Leave",
        icon: "calendar",
        href: "/leave",
        show: (c) =>
          c.hasEmployee ||
          hasRole(c.roleKeys, ROLES.manager) ||
          hasPermission(c.permissions, PERMISSIONS.employeesManage),
      },
      { label: "Holidays", icon: "sun", href: "/holidays", show: () => true },
      { label: "Announcements", icon: "megaphone", href: "/announcements", show: () => true },
      { label: "Training", icon: "graduation", href: "/training", show: isEmployee },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        label: "Invitations",
        icon: "userPlus",
        href: "/admin/invitations",
        show: can(PERMISSIONS.invitationsManage),
      },
    ],
  },
];

/** Drops items the user may not use, then any empty sections. */
export function visibleNavigation(context: NavContext): NavSection[] {
  return navigation
    .map((section) => ({ ...section, items: section.items.filter((item) => item.show(context)) }))
    .filter((section) => section.items.length > 0);
}
