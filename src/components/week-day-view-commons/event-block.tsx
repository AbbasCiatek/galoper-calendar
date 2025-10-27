import { DATE_FORMAT } from "@/constants.ts";
import type { Event } from "@/event-store.ts";
import { formatDate } from "date-fns";

export function EventBlock({ event }: { event: Event }) {
  return (
    <div className=" overflow-hidden text-ellipsis">
      <div className="truncate font-semibold">{event.title}</div>
      <div className="px-1">
        {`${formatDate(event.startDate, DATE_FORMAT.timeFormat)} - ${formatDate(event.endDate, DATE_FORMAT.timeFormat)}`}
      </div>
    </div>
  );
}
