import DayCell from "@/components/month-view-components/day-cell.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import useEventStore from "@/event-store.ts";
import {
  calculateMonthEventPositions,
  getCalendarCellsOfMonth,
} from "@/lib/date-helpers.ts";
import type { Event } from "@/types.ts";
import {
  areIntervalsOverlapping,
  endOfDay,
  endOfMonth,
  formatDate,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";

export default function MonthViewContainer() {
  const { date } = useCalendar();
  //for re-rendering only on year or month change
  const monthDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const cells = useMemo(
    () => getCalendarCellsOfMonth(monthDate, true),
    [monthDate],
  );

  const { getEventsByDateRange } = useEventStore();

  const allMonthEvents: Array<Event> = useMemo(
    () => getEventsByDateRange(startOfMonth(monthDate), endOfMonth(monthDate)),
    [getEventsByDateRange, monthDate],
  );

  const eventPositions = useMemo(
    () => calculateMonthEventPositions(allMonthEvents, monthDate),
    [allMonthEvents, monthDate],
  );

  return (
    <div className="grid grid-cols-7 w-full h-full">
      {cells.map((cell) => {
        const eventsForCell = allMonthEvents.filter((event) => {
          const eventStart = new Date(event.startDate);
          const eventEnd = new Date(event.endDate);
          return areIntervalsOverlapping(
            { start: startOfDay(cell.day), end: endOfDay(cell.day) },
            { start: eventStart, end: eventEnd },
          );
        });
        return (
          <DayCell
            key={formatDate(cell.day, "dd MMMM yyyy")}
            cell={cell}
            events={eventsForCell}
            eventPositions={eventPositions}
          />
        );
      })}
    </div>
  );
}
