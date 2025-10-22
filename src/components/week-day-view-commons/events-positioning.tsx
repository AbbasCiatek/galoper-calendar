import { EventBlock } from "@/components/week-day-view-commons/event-block.tsx";
import type { Event } from "@/event-store.ts";
import { colorMap } from "@/helpers.ts";
import { positionEventsWeekDayView } from "@/lib/date-helpers";
import { clsx } from "clsx";

type Props = {
  singleDayEvents: Array<Event>;
  date: Date;
};

export function EventsPositioning({ singleDayEvents, date }: Props) {
  const positioning = positionEventsWeekDayView(singleDayEvents, date);

  return (
    <>
      {positioning.map((p) => {
        return (
          <button
            type="button"
            key={p.event.id}
            className={clsx(
              "border-2 rounded-lg text-xs  absolute overflow-hidden",
              colorMap[p.event.color],
            )}
            style={{
              top: `${p.top}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              width: `${p.width}%`,
            }}
          >
            <EventBlock event={p.event} />
          </button>
        );
      })}
    </>
  );
}
