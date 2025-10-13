import { DATE_FORMAT } from "@/constants";
import DayCell from "@/components/month-view-components/day-cell.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { getCalendarCellsOfMonth } from "@/lib/date-helpers.ts";
import { clsx } from "clsx";
import { formatDate, isMonday, isToday } from "date-fns";
import { useMemo } from "react";
import useEventStore from "@/event-store.ts";
import {
  calculateMonthEventPositions,
  getCalendarCellsOfMonth,
} from "@/lib/date-helpers.ts";
import type { Event } from "@/types.ts";
import { endOfMonth, formatDate, startOfMonth } from "date-fns";

export function MonthViewContainer() {
  const { date } = useCalendar();
  //for re-rendering only on year or month change
  const monthDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const cells = useMemo(
    () => getCalendarCellsOfMonth(monthDate, true),
    [monthDate],
  );

  const { getEventsByDateRange } = useEventStore();

  const allMonthEvents: Array<Event> = getEventsByDateRange(
    startOfMonth(date),
    endOfMonth(date),
  );

  const { eventPositions, occupiedPositions } = calculateMonthEventPositions(
    allMonthEvents,
    date,
  );

  return (
    <div className="grid grid-cols-7 w-full h-full">
      {cells.map((cell) => {
        return (
          <DayCell
            key={formatDate(cell.day, DATE_FORMAT.fullDate)}
            objectDay={cell}
            events={allMonthEvents}
          />
        );
      })}
    </div>
  );
}
