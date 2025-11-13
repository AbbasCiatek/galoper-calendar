import { DATE_FORMAT } from "@/constants";
import { useCalendar } from "@/context/calendar-context.tsx";
import { type Event, useEventStore } from "@/event-store.ts";
import {
  assignPositionForCellEvents,
  calculateEventPositionsPerDurations,
  chunkCells,
  getCalendarCellsOfMonth,
  maxNumberOfEventsPerInterval,
} from "@/lib/date-helpers.ts";
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

  //dividing each 7 days of month into chunks to give events positions correctly
  const cellsDividedIntoWeeks = chunkCells(cells);

  const { getEventsByDateRange } = useEventStore();

  //getting events per month
  const allMonthEvents: Array<Event> = useMemo(
    () => getEventsByDateRange(startOfMonth(monthDate), endOfMonth(monthDate)),
    [getEventsByDateRange, monthDate],
  );

  return (
    <div className="grid grid-cols-7 w-full h-full">
      {cellsDividedIntoWeeks.map((cells): ReactNode => {
        return (
          <WeekChunks
            key={formatDate(cells[0].day, DATE_FORMAT.fullDate)}
            cells={cells}
            allMonthEvents={allMonthEvents}
          />
        );
      })}
    </div>
  );
}
type WeekChunksProps = {
  cells: Array<{
    day: Date;
    currentMonth: boolean;
  }>;
  allMonthEvents: Array<Event>;
};
function WeekChunks({ cells, allMonthEvents }: WeekChunksProps) {
  //saving first and last day for event title and date to be displayed per line (week) if it is long event
  const firstDayOfWeek = cells[0].day;
  const lastDayOfWeek = cells.slice(-1)[0].day;
  const eventPositions = useMemo(
    () => calculateEventPositionsPerDurations(allMonthEvents, cells),
    [cells, allMonthEvents],
  );
  const eventsOfTheWeek = allMonthEvents.filter((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return areIntervalsOverlapping(
      { start: startOfDay(firstDayOfWeek), end: endOfDay(lastDayOfWeek) },
      { start: eventStart, end: eventEnd },
    );
  });
  //adding the position attribute to eact event of the week
  const weekEventsPositioned = useMemo(
    () => assignPositionForCellEvents(eventsOfTheWeek, eventPositions),
    [eventsOfTheWeek, eventPositions],
  );
  const maxEventsPerWeek = maxNumberOfEventsPerInterval(
    cells,
    weekEventsPositioned,
  );
  return cells.map((cell, index) => {
    return (
      <DividePerCell
        key={formatDate(cell.day, DATE_FORMAT.fullDate)}
        cell={cell}
        index={index}
        weekEventsPositioned={weekEventsPositioned}
        maxEventsPerWeek={maxEventsPerWeek}
      />
    );
  });
}

type DividePerCellProps = {
  cell: { day: Date; currentMonth: boolean };
  index: number;
  weekEventsPositioned: Array<Event & { position: number }>;
  maxEventsPerWeek: number;
};
function DividePerCell({
  cell,
  index,
  weekEventsPositioned,
  maxEventsPerWeek,
}: DividePerCellProps) {
  const cellEvents = weekEventsPositioned.filter((event) => {
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
      cell={cell}
      cellEvents={cellEvents}
    />
  );
}
