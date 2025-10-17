import { useCalendar } from "@/context/calendar-context.tsx";
import { useEventStore } from "@/event-store.ts";
import {
  calculateMonthChunckEventPositions,
  chunkCells,
  getCalendarCellsOfMonth,
  getMonthCellEvents,
  maxNumberOfEventsPerInterval,
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
import { type ReactNode, useMemo } from "react";
import { DayCell } from "./day-cell";

export function MonthViewContainer() {
  const { date } = useCalendar();
  //for re-rendering only on year or month change
  const monthDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const cells = useMemo(
    () => getCalendarCellsOfMonth(monthDate, true),
    [monthDate],
  );

  const cellsDividedIntoWeeks = chunkCells(cells);

  const { getEventsByDateRange } = useEventStore();

  const allMonthEvents: Array<Event> = useMemo(
    () => getEventsByDateRange(startOfMonth(monthDate), endOfMonth(monthDate)),
    [getEventsByDateRange, monthDate],
  );

  return (
    <div className="grid grid-cols-7 w-full h-full">
      {cellsDividedIntoWeeks.map((cells): ReactNode => {
        const firstDayOfWeek = cells[0].day;
        const lastDayOfWeek = cells.slice(-1)[0].day;
        const eventPositions = useMemo(
          () => calculateMonthChunckEventPositions(allMonthEvents, cells),
          [cells],
        );
        const eventsForCell = allMonthEvents.filter((event) => {
          const eventStart = new Date(event.startDate);
          const eventEnd = new Date(event.endDate);
          return areIntervalsOverlapping(
            { start: startOfDay(firstDayOfWeek), end: endOfDay(lastDayOfWeek) },
            { start: eventStart, end: eventEnd },
          );
        });
        const weekEvents = useMemo(
          () => getMonthCellEvents(eventsForCell, eventPositions),
          [eventsForCell, eventPositions],
        );
        const maxEventsPerWeek = maxNumberOfEventsPerInterval(
          cells,
          weekEvents,
        );
        return cells.map((cell, index) => {
          const cellEvents = weekEvents.filter((event) => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);
            return areIntervalsOverlapping(
              { start: startOfDay(cell.day), end: endOfDay(cell.day) },
              { start: eventStart, end: eventEnd },
            );
          });
          return (
            <DayCell
              maxEventsPerWeek={maxEventsPerWeek}
              isFirstCell={index === 0}
              isLastCell={index === 6}
              key={formatDate(cell.day, "dd MMMM yyyy")}
              cell={cell}
              cellEvents={cellEvents}
            />
          );
        });
      })}
    </div>
  );
}
