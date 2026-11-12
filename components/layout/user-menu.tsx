import { signOut } from "@/app/auth/actions";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";
import { Icon, type IconName } from "@/components/ui/icons";
import type { HeaderUser } from "@/lib/types/hrms";

const plannedItems: { label: string; icon: IconName }[] = [
  { label: "My profile", icon: "user" },
  { label: "Account settings", icon: "settings" },
];

/**
 * Profile menu for the signed-in user. Name, email and role come from the
 * server-verified session (see getAccessState). Profile and settings
 * pages do not exist yet and are shown as unavailable.
 */
export function UserMenu({ user }: { user: HeaderUser }) {
  return (
    <Dropdown
      label={`Account menu for ${user.name}`}
      triggerClassName="gap-2 py-1 pl-1 pr-2"
      trigger={
        <>
          <Avatar name={user.name} size="sm" />
          <span className="hidden text-left md:block">
            <span className="block text-sm font-medium leading-tight text-ink">
              {user.name}
            </span>
            <span className="block text-xs leading-tight text-ink-subtle">
              {user.role}
            </span>
          </span>
          <Icon name="chevronDown" className="hidden size-4 md:block" />
        </>
      }
      panelClassName="w-72"
    >
      <div className="border-b border-line px-4 py-3">
        <p className="text-sm font-semibold text-ink">{user.name}</p>
        <p className="truncate text-xs text-ink-subtle">{user.email}</p>
        <p className="mt-1 text-xs text-ink-muted">{user.role}</p>
      </div>
      <ul className="py-1">
        {plannedItems.map((item) => (
          <li key={item.label}>
            <span
              aria-disabled="true"
              className="flex cursor-not-allowed items-center gap-3 px-4 py-2 text-sm text-slate-400"
            >
              <Icon name={item.icon} className="size-4" />
              {item.label}
              <span className="ml-auto text-[11px] font-medium uppercase tracking-wide">
                Soon
              </span>
            </span>
          </li>
        ))}
        <li>
          <form action={signOut}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-ink hover:bg-slate-50 focus-visible:bg-slate-50 focus-visible:outline-none"
            >
              <Icon name="logout" className="size-4" />
              Sign out
            </button>
          </form>
        </li>
      </ul>
      <p className="border-t border-line px-4 py-2.5 text-xs text-ink-subtle">
        Profile and account settings are coming soon.
      </p>
    </Dropdown>
  );
}
