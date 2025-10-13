import DayCell from "@/components/month-view-components/day-cell.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import useEventStore from "@/event-store.ts";
import {
  calculateMonthEventPositions,
  getCalendarCellsOfMonth,
} from "@/lib/date-helpers.ts";
import type { Event } from "@/types.ts";
import { endOfMonth, formatDate, startOfMonth } from "date-fns";

export default function MonthViewContainer() {
  const { date } = useCalendar();

  const daysObject = getCalendarCellsOfMonth(date, true);

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
      {daysObject.map((objectDay) => {
        return (
          <DayCell
            key={formatDate(objectDay.day, "dd MMMM yyyy")}
            objectDay={objectDay}
            events={allMonthEvents}
          />
        );
      })}
    </div>
  );
}
