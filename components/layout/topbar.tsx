import { demoNotifications } from "@/lib/demo-data/dashboard";
import type { HeaderUser } from "@/lib/types/hrms";
import { BrandLogo } from "./brand-logo";
import { MobileNav } from "./mobile-nav";
import { NotificationsMenu } from "./notifications-menu";
import { SearchBox } from "./search-box";
import { SidebarContent } from "./sidebar";
import { UserMenu } from "./user-menu";

export function Topbar({ user }: { user: HeaderUser }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <MobileNav>
        <SidebarContent />
      </MobileNav>

      <BrandLogo variant="dark" className="sm:hidden" />

      <div className="flex flex-1 items-center">
        <SearchBox />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <NotificationsMenu notifications={demoNotifications} />
        <span aria-hidden="true" className="hidden h-6 w-px bg-line sm:block" />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
