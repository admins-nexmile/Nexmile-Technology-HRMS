import { Suspense } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icons";
import { navigation } from "@/lib/navigation";
import type { NavSection } from "@/lib/types/hrms";
import { cn } from "@/lib/utils/cn";
import { BrandLogo } from "./brand-logo";
import { navItemBase, navLinkClasses } from "./nav-styles";
import { SidebarNavLink } from "./sidebar-nav-link";

/**
 * Sidebar contents, shared by the fixed desktop sidebar and the mobile
 * navigation dialog. Server component: only active-link detection runs
 * on the client.
 */
export function SidebarContent({ permissions }: { permissions: readonly string[] }) {
  const sections = visibleSections(navigation, permissions);

  return (
    <div className="flex h-full flex-col bg-brand-950 text-white">
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-5">
        <BrandLogo />
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-5 last:mb-0">
            <h2 className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {section.title}
            </h2>
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.label}>
                  {item.status === "available" && item.href ? (
                    <Suspense
                      fallback={
                        <Link href={item.href} className={navLinkClasses(false)}>
                          <Icon name={item.icon} className="size-5 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      }
                    >
                      <SidebarNavLink
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                      />
                    </Suspense>
                  ) : (
                    <span
                      aria-disabled="true"
                      className={cn(
                        navItemBase,
                        "cursor-not-allowed text-slate-400",
                      )}
                    >
                      <Icon name={item.icon} className="size-5 shrink-0 opacity-70" />
                      <span>{item.label}</span>
                      <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-300">
                        Soon
                        <span className="sr-only"> — not available yet</span>
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 px-5 py-4">
        <p className="text-xs leading-relaxed text-slate-400">
          Preview build. All figures shown are fictional demonstration data.
        </p>
      </div>
    </div>
  );
}

/** Drops items the user lacks permission for, then any empty sections. */
function visibleSections(
  sections: NavSection[],
  permissions: readonly string[],
): NavSection[] {
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) => !item.requiredPermission || permissions.includes(item.requiredPermission),
      ),
    }))
    .filter((section) => section.items.length > 0);
}
