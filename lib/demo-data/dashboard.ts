/**
 * ============================================================
 *  FICTIONAL DEMONSTRATION DATA — NOT REAL EMPLOYEE RECORDS
 * ============================================================
 * Every name, number, announcement and notification in this file
 * is invented for UI development. It is NOT read from Supabase and
 * does not describe real people or real attendance/leave/payroll.
 *
 * Replace with server-verified, RLS-protected queries only after
 * the security design (development phases 2–3) is complete.
 *
 * The holiday list is illustrative only and is NOT an official
 * holiday calendar for Nexmile Technology.
 */
import type {
  Announcement,
  AttendanceBreakdown,
  AttendanceDay,
  DemoNotification,
  DemoUser,
  Holiday,
  QuickAction,
} from "@/lib/types/hrms";

/**
 * Fixed reference date for the demo. Using a constant (instead of the
 * live clock) keeps the page deterministic and prerenderable.
 */
export const DEMO_REFERENCE_DATE = "2026-11-12";

export const demoUser: DemoUser = {
  name: "Ananya Rao",
  role: "HR Administrator (demo)",
  email: "ananya.rao@example.com",
};

export const demoNotifications: DemoNotification[] = [
  {
    id: "n1",
    title: "3 new leave requests are awaiting review",
    time: "10 min ago",
    unread: true,
  },
  {
    id: "n2",
    title: "Quarterly policy acknowledgement is due Friday",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Training session “Secure Coding Basics” starts tomorrow",
    time: "Yesterday",
    unread: false,
  },
];

export const totalEmployees = 128;
export const newJoinersThisMonth = 4;
export const pendingLeaveRequests = 7;
export const pendingLeaveRaisedToday = 2;

export const attendanceToday: AttendanceBreakdown = {
  totalEmployees,
  inOffice: 98,
  remote: 14,
  onLeave: 9,
  absent: 7,
};

/** Last seven working days, oldest first, ending on the reference date. */
export const attendanceLastSevenDays: AttendanceDay[] = [
  { date: "2026-11-04", presentRate: 89.1 },
  { date: "2026-11-05", presentRate: 91.4 },
  { date: "2026-11-06", presentRate: 84.4 },
  { date: "2026-11-09", presentRate: 90.6 },
  { date: "2026-11-10", presentRate: 92.2 },
  { date: "2026-11-11", presentRate: 88.3 },
  { date: "2026-11-12", presentRate: 87.5 },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Updated hybrid work guidelines",
    excerpt:
      "Teams may now choose two flexible remote days per week. Please coordinate schedules with your reporting manager.",
    category: "Policy",
    author: "People Operations (demo)",
    publishedOn: "2026-11-11",
  },
  {
    id: "a2",
    title: "Annual day celebration — save the date",
    excerpt:
      "Join us for an evening of awards, music and team performances. Venue and registration details to follow.",
    category: "Event",
    author: "Culture Committee (demo)",
    publishedOn: "2026-11-09",
  },
  {
    id: "a3",
    title: "Scheduled maintenance for internal tools",
    excerpt:
      "Internal tools will be briefly unavailable on Saturday between 10 PM and 12 AM IST for planned upgrades.",
    category: "IT",
    author: "IT Support (demo)",
    publishedOn: "2026-11-06",
  },
  {
    id: "a4",
    title: "Welcome to our new joiners",
    excerpt:
      "Please welcome four colleagues who joined the Engineering and Design teams this month.",
    category: "General",
    author: "Talent Team (demo)",
    publishedOn: "2026-11-03",
  },
];

export const upcomingHolidays: Holiday[] = [
  { id: "h1", name: "Christmas Day", date: "2026-12-25", kind: "Festival" },
  { id: "h2", name: "New Year’s Day", date: "2027-01-01", kind: "Company" },
  { id: "h3", name: "Republic Day", date: "2027-01-26", kind: "National" },
  {
    id: "h4",
    name: "Founders’ Day (fictional)",
    date: "2027-02-19",
    kind: "Company",
  },
];

const notBuiltYet = "This module has not been built yet.";

export const quickActions: QuickAction[] = [
  {
    id: "add-employee",
    label: "Add employee",
    description: "Invite a new team member",
    icon: "userPlus",
    unavailableReason: `${notBuiltYet} Requires invitation workflow and role checks.`,
  },
  {
    id: "approve-leave",
    label: "Review leave",
    description: "Approve or decline requests",
    icon: "check",
    unavailableReason: `${notBuiltYet} Requires authorization rules.`,
  },
  {
    id: "mark-attendance",
    label: "Mark attendance",
    description: "Record check-in / check-out",
    icon: "clock",
    unavailableReason: notBuiltYet,
  },
  {
    id: "run-payroll",
    label: "Run payroll",
    description: "Process monthly payroll",
    icon: "wallet",
    unavailableReason:
      "Unavailable until verified Indian statutory payroll rules are implemented.",
  },
  {
    id: "post-announcement",
    label: "Post announcement",
    description: "Share news with the company",
    icon: "megaphone",
    unavailableReason: notBuiltYet,
  },
  {
    id: "upload-document",
    label: "Upload document",
    description: "Add an employee document",
    icon: "upload",
    unavailableReason: `${notBuiltYet} Requires private storage and access rules.`,
  },
];
