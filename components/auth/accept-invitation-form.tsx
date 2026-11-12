"use client";

import { useActionState } from "react";
import { acceptInvitationAction, type AcceptState } from "@/app/access-pending/actions";
import { cn } from "@/lib/utils/cn";
import { SubmitButton } from "./submit-button";

const toneClasses: Record<NonNullable<AcceptState>["tone"], string> = {
  warning: "border-warning-100 bg-warning-50 text-warning-700",
  info: "border-line bg-slate-50 text-ink-muted",
  error: "border-danger-100 bg-danger-50 text-danger-700",
};

export function AcceptInvitationForm() {
  const [state, formAction] = useActionState<AcceptState, FormData>(
    acceptInvitationAction,
    null,
  );

  return (
    <form action={formAction} className="mt-6 space-y-3">
      <SubmitButton variant="primary" className="w-full" pendingLabel="Checking invitation…">
        Accept invitation
      </SubmitButton>
      <div aria-live="polite">
        {state ? (
          <p
            role={state.tone === "error" ? "alert" : "status"}
            className={cn("rounded-lg border px-3 py-2.5 text-sm", toneClasses[state.tone])}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
