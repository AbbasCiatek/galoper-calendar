import type { Event } from "@/event-store.ts";
import { colorMap } from "@/helpers";
import { clsx } from "clsx";

interface Props {
  event: Event;
  eventCurrentDay?: number;
  eventTotalDays?: number;
}

export function MultiDayEventDisplay({
  event,
  eventCurrentDay,
  eventTotalDays,
}: Props) {
  return (
    // <DraggableEvent event={event}>
    //  <EventDetailsDialog event={event}>
    <div
      className={clsx(
        "flex items-center h-6.5 px-2 text-xs font-medium truncate cursor-pointer rounded-lg  ",
        colorMap[event.color],
      )}
    >
      <p>
        {eventCurrentDay && (
          <span className="text-xs">
            Day {eventCurrentDay} of {eventTotalDays} •{" "}
          </span>
        )}
        {event.title}
      </p>
    </div>
    // </EventDetailsDialog>
    //     </DraggableEvent>
  );
}
