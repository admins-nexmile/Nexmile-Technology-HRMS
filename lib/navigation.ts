import { PERMISSIONS } from "@/lib/auth/permissions";
import type { NavSection } from "@/lib/types/hrms";

/**
 * Sidebar navigation. Only routes that exist have an href; everything
 * else is shown as "coming soon" and is not a link. Items with
 * `requiredPermission` are hidden from users without it (the pages
 * themselves also check the permission on the server).
 */
export const navigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", icon: "dashboard", href: "/", status: "available" },
    ],
  },
  {
    title: "People",
    items: [
      { label: "Employees", icon: "users", status: "coming-soon" },
      { label: "Attendance", icon: "clock", status: "coming-soon" },
      { label: "Leave", icon: "calendar", status: "coming-soon" },
      { label: "Holidays", icon: "sun", status: "coming-soon" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Payroll", icon: "wallet", status: "coming-soon" },
      { label: "Documents", icon: "file", status: "coming-soon" },
      { label: "Announcements", icon: "megaphone", status: "coming-soon" },
      { label: "Training", icon: "graduation", status: "coming-soon" },
      { label: "Reports", icon: "chart", status: "coming-soon" },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        label: "Invitations",
        icon: "userPlus",
        href: "/admin/invitations",
        status: "available",
        requiredPermission: PERMISSIONS.invitationsManage,
      },
      { label: "Settings", icon: "settings", status: "coming-soon" },
    ],
  },
];
