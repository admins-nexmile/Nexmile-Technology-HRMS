import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import type { Holiday } from "@/lib/types/hrms";
import { daysBetween, formatDate } from "@/lib/utils/format";

const kindTone: Record<Holiday["kind"], BadgeTone> = {
  National: "brand",
  Festival: "success",
  Company: "info",
};

type UpcomingHolidaysProps = {
  holidays: Holiday[];
  referenceDate: string;
};

export function UpcomingHolidays({
  holidays,
  referenceDate,
}: UpcomingHolidaysProps) {
  return (
    <Card aria-labelledby="holidays-heading" className="h-full">
      <CardHeader
        titleId="holidays-heading"
        title="Upcoming holidays"
        description="Illustrative list, not an official calendar"
      />
      <CardBody className="py-2">
        <ul className="divide-y divide-line">
          {holidays.map((h) => {
            const days = daysBetween(referenceDate, h.date);
            return (
              <li key={h.id} className="flex items-center gap-4 py-3">
                <div className="flex w-12 shrink-0 flex-col items-center rounded-lg border border-line bg-slate-50 py-1.5">
                  <span className="text-[10px] font-semibold uppercase text-brand-700">
                    {formatDate(h.date, { month: "short" })}
                  </span>
                  <span className="text-lg font-semibold leading-none text-ink">
                    {formatDate(h.date, { day: "numeric" })}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {h.name}
                  </p>
                  <p className="text-xs text-ink-subtle">
                    <time dateTime={h.date}>
                      {formatDate(h.date, {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    {" · "}
                    {days === 0 ? "Today" : `in ${days} days`}
                  </p>
                </div>
                <Badge tone={kindTone[h.kind]}>{h.kind}</Badge>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
