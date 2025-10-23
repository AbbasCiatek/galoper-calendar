import type { Event } from "@/event-store.ts";
import { formatDate } from "date-fns";

export function EventBlock({ event }: { event: Event }) {
  return (
    <div className=" overflow-hidden text-ellipsis">
      <div className="truncate font-semibold">{event.title}</div>
      <div className="px-1">
        {`${formatDate(event.startDate, " hh:mm a")} - ${formatDate(event.endDate, "hh:mm a")}`}
      </div>
    </div>
  );
}
