import type { Metadata } from "next";
import { AnnouncementsList } from "@/components/dashboard/announcements-list";
import { AttendanceOverview } from "@/components/dashboard/attendance-overview";
import { PageHeader } from "@/components/dashboard/page-header";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { UpcomingHolidays } from "@/components/dashboard/upcoming-holidays";
import {
  DEMO_REFERENCE_DATE,
  announcements,
  attendanceLastSevenDays,
  attendanceToday,
  demoUser,
  newJoinersThisMonth,
  pendingLeaveRaisedToday,
  pendingLeaveRequests,
  quickActions,
  totalEmployees,
  upcomingHolidays,
} from "@/lib/demo-data/dashboard";
import type { StatSummary } from "@/lib/types/hrms";
import { daysBetween, formatDate, formatNumber, formatPercent } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Dashboard",
};

// All values below come from FICTIONAL demonstration data.
function buildStats(): StatSummary[] {
  const present = attendanceToday.inOffice + attendanceToday.remote;
  const nextHoliday = upcomingHolidays[0];
  const holidaysNext90 = upcomingHolidays.filter(
    (h) => daysBetween(DEMO_REFERENCE_DATE, h.date) <= 90,
  ).length;

  return [
    {
      id: "employees",
      label: "Total employees",
      value: formatNumber(totalEmployees),
      icon: "users",
      tone: "brand",
      trend: { direction: "up", text: `+${newJoinersThisMonth}` },
      detail: "joined this month",
    },
    {
      id: "present",
      label: "Present today",
      value: formatNumber(present),
      icon: "check",
      tone: "success",
      detail: `${formatPercent((present / totalEmployees) * 100)} of workforce`,
    },
    {
      id: "leave",
      label: "Pending leave requests",
      value: formatNumber(pendingLeaveRequests),
      icon: "calendar",
      tone: "warning",
      detail: `${pendingLeaveRaisedToday} raised today`,
    },
    {
      id: "holidays",
      label: "Upcoming holidays",
      value: formatNumber(holidaysNext90),
      icon: "sun",
      tone: "info",
      detail: nextHoliday
        ? `in next 90 days · next: ${nextHoliday.name}, ${formatDate(nextHoliday.date, { day: "numeric", month: "short" })}`
        : "in next 90 days",
    },
  ];
}

export default function DashboardPage() {
  const firstName = demoUser.name.split(" ")[0] ?? demoUser.name;

  return (
    <div className="space-y-6">
      <PageHeader userFirstName={firstName} referenceDate={DEMO_REFERENCE_DATE} />

      <StatsGrid stats={buildStats()} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AttendanceOverview
            today={attendanceToday}
            lastSevenDays={attendanceLastSevenDays}
            referenceDate={DEMO_REFERENCE_DATE}
          />
        </div>
        <UpcomingHolidays
          holidays={upcomingHolidays}
          referenceDate={DEMO_REFERENCE_DATE}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnnouncementsList announcements={announcements} />
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
}
