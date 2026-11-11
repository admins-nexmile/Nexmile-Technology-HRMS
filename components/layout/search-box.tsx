import { Icon } from "@/components/ui/icons";

/**
 * Global search placeholder. There is no search backend yet, so the field
 * is disabled and says so rather than pretending to work.
 */
export function SearchBox() {
  return (
    <div className="relative hidden w-full max-w-md sm:block">
      <label htmlFor="global-search" className="sr-only">
        Search (coming soon)
      </label>
      <Icon
        name="search"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
      />
      <input
        id="global-search"
        type="search"
        disabled
        placeholder="Search employees, documents… (coming soon)"
        className="h-10 w-full cursor-not-allowed rounded-lg border border-line bg-slate-50 pl-9 pr-3 text-sm text-ink placeholder:text-slate-400"
      />
    </div>
  );
}
