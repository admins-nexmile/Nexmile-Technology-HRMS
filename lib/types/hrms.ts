import type { IconName } from "@/components/ui/icons";

/** ISO calendar date, YYYY-MM-DD. */
export type IsoDate = string;

export type NavItem = {
  label: string;
  icon: IconName;
  /** Only set for routes that actually exist. */
  href?: string;
  status: "available" | "coming-soon";
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type StatTone = "brand" | "success" | "warning" | "info";

export type StatSummary = {
  id: string;
  label: string;
  value: string;
  icon: IconName;
  tone: StatTone;
  /** Short supporting line, e.g. "87.5% of workforce". */
  detail: string;
  trend?: {
    direction: "up" | "down";
    text: string;
  };
};

export type AttendanceBreakdown = {
  totalEmployees: number;
  inOffice: number;
  remote: number;
  onLeave: number;
  absent: number;
};

export type AttendanceDay = {
  date: IsoDate;
  /** Percentage of employees present (office + remote). */
  presentRate: number;
};

export type AnnouncementCategory = "Policy" | "Event" | "IT" | "General";

export type Announcement = {
  id: string;
  title: string;
  excerpt: string;
  category: AnnouncementCategory;
  author: string;
  publishedOn: IsoDate;
};

export type Holiday = {
  id: string;
  name: string;
  date: IsoDate;
  kind: "National" | "Festival" | "Company";
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
  icon: IconName;
  /** Why the action is not available yet. All actions are disabled for now. */
  unavailableReason: string;
};

export type DemoNotification = {
  id: string;
  title: string;
  time: string;
  unread: boolean;
};

/** Signed-in user as shown in the top bar (name, email, role label). */
export type HeaderUser = {
  name: string;
  role: string;
  email: string;
};

export type DemoUser = HeaderUser;
