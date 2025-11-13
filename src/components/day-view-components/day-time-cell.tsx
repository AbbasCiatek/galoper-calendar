import { EventsPositioning } from "@/components/week-day-view-commons/events-positioning.tsx";
import { TimeCells } from "@/components/week-day-view-commons/time-cell.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { type Event, useEventStore } from "@/event-store.ts";
import { endOfDay, isToday, startOfDay } from "date-fns";
import { TimeLine } from "../week-day-view-commons/time-line";

export function DayTimeCell() {
  const { date } = useCalendar();

  const { getSingleDayEvents } = useEventStore();

  const events: Array<Event> = getSingleDayEvents(
    startOfDay(date),
    endOfDay(date),
  );

  const singleDayEvents = events.map((e) => ({
    ...e,
    startDate: new Date(e.startDate),
    endDate: new Date(e.endDate),
  }));

  return (
    <div className="relative flex-1 border-l bg-white">
      <TimeCells date={date} />
      <EventsPositioning singleDayEvents={singleDayEvents} />
      {isToday(date) && <TimeLine />}
    </div>
  );
}
