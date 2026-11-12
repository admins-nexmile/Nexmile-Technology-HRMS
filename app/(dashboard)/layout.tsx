import { Suspense } from "react";
import { DashboardAccessGate } from "@/components/auth/dashboard-access-gate";
import { AppShell } from "@/components/layout/app-shell";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    // The gate reads the session at request time, so it sits behind a
    // Suspense boundary (required with Cache Components). Nothing from the
    // dashboard renders until the server has checked access.
    <Suspense fallback={null}>
      <DashboardAccessGate>
        <AppShell>{children}</AppShell>
      </DashboardAccessGate>
    </Suspense>
  );
}
