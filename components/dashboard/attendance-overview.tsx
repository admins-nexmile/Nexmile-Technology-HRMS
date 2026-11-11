import { Card, CardBody, CardHeader } from "@/components/ui/card";
import type { AttendanceBreakdown, AttendanceDay } from "@/lib/types/hrms";
import { cn } from "@/lib/utils/cn";
import {
  formatDate,
  formatNumber,
  formatPercent,
  formatWeekday,
} from "@/lib/utils/format";

type AttendanceOverviewProps = {
  today: AttendanceBreakdown;
  lastSevenDays: AttendanceDay[];
  referenceDate: string;
};

type Segment = {
  key: string;
  label: string;
  value: number;
  colorClass: string;
};

export function AttendanceOverview({
  today,
  lastSevenDays,
  referenceDate,
}: AttendanceOverviewProps) {
  const segments: Segment[] = [
    { key: "office", label: "In office", value: today.inOffice, colorClass: "bg-brand-600" },
    { key: "remote", label: "Remote", value: today.remote, colorClass: "bg-success-500" },
    { key: "leave", label: "On leave", value: today.onLeave, colorClass: "bg-warning-500" },
    { key: "absent", label: "Absent", value: today.absent, colorClass: "bg-danger-500" },
  ];
  const total = today.totalEmployees;
  const present = today.inOffice + today.remote;
  const presentRate = (present / total) * 100;
  const average =
    lastSevenDays.reduce((sum, d) => sum + d.presentRate, 0) /
    lastSevenDays.length;

  return (
    <Card aria-labelledby="attendance-heading" className="h-full">
      <CardHeader
        titleId="attendance-heading"
        title="Attendance overview"
        description="Today’s breakdown and the last 7 working days (fictional)"
      />
      <CardBody className="space-y-6">
        {/* Today */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-medium text-ink-muted">Today</p>
            <p className="text-sm text-ink-subtle">
              <span className="text-lg font-semibold text-ink">
                {formatPercent(presentRate)}
              </span>{" "}
              present ({formatNumber(present)} of {formatNumber(total)})
            </p>
          </div>

          <div
            aria-hidden="true"
            className="mt-3 flex h-3 w-full overflow-hidden rounded-full bg-slate-100"
          >
            {segments.map((s) => (
              <div
                key={s.key}
                className={cn("h-full", s.colorClass)}
                style={{ width: `${(s.value / total) * 100}%` }}
              />
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {segments.map((s) => (
              <div
                key={s.key}
                className="rounded-lg border border-line px-3 py-2.5"
              >
                <dt className="flex items-center gap-2 text-xs font-medium text-ink-subtle">
                  <span
                    aria-hidden="true"
                    className={cn("size-2.5 rounded-full", s.colorClass)}
                  />
                  {s.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-ink">
                  {formatNumber(s.value)}
                  <span className="ml-1 text-xs font-normal text-ink-subtle">
                    ({formatPercent((s.value / total) * 100, 0)})
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Last 7 working days */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-sm font-medium text-ink-muted">
              Last 7 working days
            </h3>
            <p className="text-xs text-ink-subtle">
              Average {formatPercent(average)} present
            </p>
          </div>

          <table className="sr-only">
            <caption>Attendance rate for the last 7 working days</caption>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Present</th>
              </tr>
            </thead>
            <tbody>
              {lastSevenDays.map((d) => (
                <tr key={d.date}>
                  <th scope="row">{formatDate(d.date)}</th>
                  <td>{formatPercent(d.presentRate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            aria-hidden="true"
            className="mt-4 grid h-44 grid-cols-7 items-end gap-2 sm:gap-3"
          >
            {lastSevenDays.map((d) => {
              const isToday = d.date === referenceDate;
              // Scale 60–100% to the bar height so day-to-day differences are visible.
              const height = Math.max(8, ((d.presentRate - 60) / 40) * 100);
              return (
                <div key={d.date} className="flex h-full flex-col items-center justify-end gap-1.5">
                  <span className="text-[11px] font-medium text-ink-subtle">
                    {Math.round(d.presentRate)}%
                  </span>
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className={cn(
                        "w-full rounded-t-md",
                        isToday ? "bg-brand-700" : "bg-brand-200",
                      )}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs",
                      isToday ? "font-semibold text-ink" : "text-ink-subtle",
                    )}
                  >
                    {formatWeekday(d.date)}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[11px] text-ink-subtle">
            Bar heights are scaled from 60% to 100%.
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
