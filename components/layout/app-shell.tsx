import type { ReactNode } from "react";
import type { HeaderUser } from "@/lib/types/hrms";
import { SidebarContent } from "./sidebar";
import { Topbar } from "./topbar";

export function AppShell({ user, children }: { user: HeaderUser; children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-brand-800 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to main content
      </a>

      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      <div className="flex min-h-dvh flex-col lg:pl-64">
        <Topbar user={user} />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 px-4 py-6 focus:outline-none sm:px-6 lg:px-8 lg:py-8"
        >
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
