import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Icon } from "@/components/ui/icons";
import type { QuickAction } from "@/lib/types/hrms";

/**
 * Quick actions are intentionally non-functional: none of the underlying
 * modules, permissions or audit trails exist yet. They render as disabled
 * buttons with the reason shown in text (not just a tooltip).
 */
export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <Card aria-labelledby="quick-actions-heading" className="h-full">
      <CardHeader
        titleId="quick-actions-heading"
        title="Quick actions"
        description="Shortcuts will be enabled as each module is built"
      />
      <CardBody>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {actions.map((action) => {
            return (
              <li key={action.id}>
                <button
                  type="button"
                  disabled
                  className="flex h-full w-full cursor-not-allowed items-start gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 text-left"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-500">
                    <Icon name={action.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="text-sm font-medium text-slate-600">
                        {action.label}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                        <Icon name="lock" className="size-3" />
                        Unavailable
                      </span>
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {action.description}
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      {action.unavailableReason}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
