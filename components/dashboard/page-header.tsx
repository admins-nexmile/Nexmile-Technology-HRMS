import { DemoDataBadge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icons";
import { formatLongDate } from "@/lib/utils/format";

type PageHeaderProps = {
  userFirstName: string;
  referenceDate: string;
};

export function PageHeader({ userFirstName, referenceDate }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-ink-subtle">
            <time dateTime={referenceDate}>{formatLongDate(referenceDate)}</time>
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Welcome back, {userFirstName}
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Here’s what is happening across Nexmile Technology today.
          </p>
        </div>
        <DemoDataBadge className="self-start sm:self-auto" />
      </div>

      <div
        role="note"
        className="flex items-start gap-3 rounded-xl border border-warning-100 bg-warning-50 px-4 py-3 text-sm text-warning-700"
      >
        <Icon name="info" className="mt-0.5 size-4 shrink-0" />
        <p>
          <strong className="font-semibold">Preview only.</strong> All people,
          figures, announcements and dates on this dashboard are fictional
          demonstration data. No live HR data is connected.
        </p>
      </div>
    </div>
  );
}
