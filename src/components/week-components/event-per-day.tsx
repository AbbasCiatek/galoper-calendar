import { EventsPositioning } from "@/components/week-day-view-commons/event-positioning.tsx";
import { type Event, useEventStore } from "@/event-store.ts";
import { endOfDay, startOfDay } from "date-fns";

export default function EventPerDay({ day }: { day: Date }) {
  const { getSingleDayEvents } = useEventStore();

  const events: Array<Event> = getSingleDayEvents(
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
