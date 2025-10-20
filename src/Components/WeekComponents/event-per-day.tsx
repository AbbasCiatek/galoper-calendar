import EventsPositioning from "@/Components/WeeKDayViewCommonComponents/event-positioning.tsx";
import { useEventStore } from "@/event-store.ts";
import type { Event } from "@/types.ts";
import { endOfDay, startOfDay } from "date-fns";

export default function EventPerDay({ day }: { day: Date }) {
  const { getEventsByDateRange } = useEventStore();

  const events: Array<Event> = getEventsByDateRange(
    startOfDay(day),
    endOfDay(day),
  );

  const singleDayEvents = events.map((e) => ({
    ...e,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }));
  return (
    <>
      {singleDayEvents.length > 0 && (
        <EventsPositioning singleDayEvents={singleDayEvents} date={day} />
      )}
    </>
  );
}
