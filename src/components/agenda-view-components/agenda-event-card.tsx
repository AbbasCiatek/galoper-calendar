import type { Event } from "@/event-store.ts";
import { Date_Format, colorMap } from "@/helpers.ts";
import { clsx } from "clsx";
import { formatDate } from "date-fns";
import { Clock, Text } from "lucide-react";

export function AgendaEventCard({
  event,
  eventCurrentDay,
  eventTotalDays,
}: {
  event: Event;
  eventCurrentDay?: number;
  eventTotalDays?: number;
}) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <button
      type="button"
      className={clsx(
        " mx-1 p-2 rounded-md cursor-pointer hover:opacity-50 ",
        colorMap[event.color],
      )}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-1.5">
          <p className="font-medium">
            {eventCurrentDay && eventTotalDays && (
              <span className="mr-1 text-xs">
                Day {eventCurrentDay} of {eventTotalDays} •{" "}
              </span>
            )}
            {event.title}
          </p>
        </div>

        <div className="flex items-center  gap-1">
          <Clock className="size-3 shrink-0" />
          <p className="text-sm text-gray-600 ">
            {formatDate(startDate, Date_Format.timeFormat)} -{" "}
            {formatDate(endDate, Date_Format.timeFormat)}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Text className="size-3 shrink-0" />
          <p className="text-sm truncate text-gray-600 ">{event.description}</p>
        </div>
      </div>
    </button>
  );
}
