import { Badge, type BadgeTone } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import type { Announcement, AnnouncementCategory } from "@/lib/types/hrms";
import { formatDate } from "@/lib/utils/format";

const categoryTone: Record<AnnouncementCategory, BadgeTone> = {
  Policy: "brand",
  Event: "success",
  IT: "info",
  General: "neutral",
};

export function AnnouncementsList({
  announcements,
}: {
  announcements: Announcement[];
}) {
  return (
    <Card aria-labelledby="announcements-heading" className="h-full">
      <CardHeader
        titleId="announcements-heading"
        title="Recent announcements"
        description="Latest company updates (fictional)"
      />
      <CardBody className="py-2">
        <ul className="divide-y divide-line">
          {announcements.map((a) => (
            <li key={a.id} className="py-4">
              <article aria-labelledby={`announcement-${a.id}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={categoryTone[a.category]}>{a.category}</Badge>
                  <time
                    dateTime={a.publishedOn}
                    className="text-xs text-ink-subtle"
                  >
                    {formatDate(a.publishedOn)}
                  </time>
                </div>
                <h3
                  id={`announcement-${a.id}`}
                  className="mt-2 text-sm font-semibold text-ink"
                >
                  {a.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                  {a.excerpt}
                </p>
                <p className="mt-2 text-xs text-ink-subtle">{a.author}</p>
              </article>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
