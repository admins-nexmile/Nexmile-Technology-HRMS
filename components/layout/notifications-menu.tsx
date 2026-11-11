import { Badge } from "@/components/ui/badge";
import { Dropdown } from "@/components/ui/dropdown";
import { Icon } from "@/components/ui/icons";
import type { DemoNotification } from "@/lib/types/hrms";
import { cn } from "@/lib/utils/cn";

export function NotificationsMenu({
  notifications,
}: {
  notifications: DemoNotification[];
}) {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <Dropdown
      label={unread > 0 ? `Notifications, ${unread} unread` : "Notifications"}
      triggerClassName="size-10"
      trigger={
        <>
          <Icon name="bell" className="size-5" />
          {unread > 0 ? (
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 size-2 rounded-full bg-danger-500 ring-2 ring-white"
            />
          ) : null}
        </>
      }
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold text-ink">Notifications</h2>
        <Badge tone="warning">Fictional</Badge>
      </div>
      <ul className="max-h-80 divide-y divide-line overflow-y-auto">
        {notifications.map((n) => (
          <li key={n.id} className="flex gap-3 px-4 py-3">
            <span
              aria-hidden="true"
              className={cn(
                "mt-1.5 size-2 shrink-0 rounded-full",
                n.unread ? "bg-brand-600" : "bg-slate-200",
              )}
            />
            <div className="min-w-0">
              <p className="text-sm text-ink">
                {n.title}
                {n.unread ? <span className="sr-only"> (unread)</span> : null}
              </p>
              <p className="mt-0.5 text-xs text-ink-subtle">{n.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-4 py-2.5 text-xs text-ink-subtle">
        Full notification centre coming soon.
      </p>
    </Dropdown>
  );
}
