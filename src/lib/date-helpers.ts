import type { Event } from "@/types";
import {
  addMonths,
  areIntervalsOverlapping,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  getDay,
  isSameDay,
  setDate,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
export const MAX_EVENTS_PER_DAY = 8;

export function getCalendarCellsOfMonth(
  date: Date,
  weekStartAtMonday: boolean,
) {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const prevMonth = subMonths(firstDayOfMonth, 1);
  const nextMonth = addMonths(firstDayOfMonth, 1);
  const indexOfFirstDay = weekStartAtMonday
    ? (getDay(firstDayOfMonth) + 6) % 7
    : getDay(firstDayOfMonth);
  const daysNumber = indexOfFirstDay + lastDayOfMonth.getDate();
  const cellsNumber = daysNumber === 28 ? 28 : daysNumber <= 35 ? 35 : 42;

  const daysInPrevMonth = eachDayOfInterval({
    start: startOfMonth(prevMonth),
    end: endOfMonth(prevMonth),
  });

  const displayedDaysOfPrevMonth = daysInPrevMonth.splice(
    daysInPrevMonth.length - indexOfFirstDay,
  );

  const daysInCurrentMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const displayedDaysInNextMonth = eachDayOfInterval({
    start: nextMonth,
    end: setDate(nextMonth, cellsNumber - daysNumber),
  });

  const prevMonthObject = displayedDaysOfPrevMonth.map((day) => ({
    day,
    currentMonth: false,
  }));

  const currentMonthObject = daysInCurrentMonth.map((day) => ({
    day,
    currentMonth: true,
  }));

  const nextMonthObject =
    prevMonthObject.length + currentMonthObject.length === 28 ||
    prevMonthObject.length + currentMonthObject.length === 35
      ? null
      : displayedDaysInNextMonth.map((day) => ({
          day,
          currentMonth: false,
        }));

  if (nextMonthObject) {
    return [...prevMonthObject, ...currentMonthObject, ...nextMonthObject];
  }
  return [...prevMonthObject, ...currentMonthObject];
}

function positionPerDay(cells: Array<{ day: Date; currentMonth: boolean }>) {
  const positions: Record<string, Array<boolean>> = {};
  cells.forEach((cell) => {
    positions[startOfDay(cell.day).toISOString()] =
      Array(MAX_EVENTS_PER_DAY).fill(false);
  });
  return positions;
}
type Cell = {
  day: Date;
  currentMonth: boolean;
};
export function chunkCells(arr: Array<Cell>) {
  const result: Array<Array<Cell>> = [];
  for (let i = 0; i < arr.length; i += 7) {
    result.push(arr.slice(i, i + 7));
  }
  return result;
}

export function calculateEventPositionsPerDurations(
  events: Array<Event>,
  cells: Array<Cell>,
) {
  const eventPositions: Record<string, number> = {};
  const occupiedPositions = positionPerDay(cells);

  const singleDayEvents = events.filter((event) =>
    isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const multiDayEvents = events.filter(
    (event) => !isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const sortedEvents = [
    ...multiDayEvents.sort(
      //sort by start -> duration ->title alphabet
      (a, b) => {
        const aDuration =
          new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
        const bDuration =
          new Date(b.endDate).getTime() - new Date(b.startDate).getTime();

        const startDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (startDiff !== 0) return startDiff;

        const durationDiff = aDuration - bDuration;
        if (durationDiff !== 0) return durationDiff;

        return a.title.localeCompare(b.title);
      },
    ),
    ...singleDayEvents.sort((a, b) => {
      const aDuration =
        new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
      const bDuration =
        new Date(b.endDate).getTime() - new Date(b.startDate).getTime();

      const startDiff =
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (startDiff !== 0) return startDiff;

      const durationDiff = aDuration - bDuration;
      if (durationDiff !== 0) return durationDiff;

      return a.title.localeCompare(b.title);
    }),
  ];

  const firstCell = cells[0];
  const lastCell = cells.slice(-1)[0];

  sortedEvents.forEach((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const eventDays = eachDayOfInterval({
      start: eventStart < firstCell.day ? firstCell.day : eventStart,
      end: eventEnd > lastCell.day ? lastCell.day : eventEnd,
    });

    let position = -1;

    for (let i = 0; i < MAX_EVENTS_PER_DAY; i++) {
      if (
        eventDays.every((day) => {
          const dayPositions = occupiedPositions[startOfDay(day).toISOString()];
          return dayPositions && !dayPositions[i];
        })
      ) {
        position = i;
        break;
      }
    }
    if (position !== -1) {
      eventDays.forEach((day) => {
        const dayKey = startOfDay(day).toISOString();
        occupiedPositions[dayKey][position] = true;
      });
      eventPositions[event.id] = position;
    }
  });

  return eventPositions;
}

export function assignPositionForCellEvents(
  events: Array<Event>,
  eventPositions: Record<string, number>,
) {
  return events
    .map((event) => {
      return {
        ...event,
        position: eventPositions[event.id] ?? -1,
      };
    })
    .sort((a, b) => {
      const aMultiDay = !isSameDay(new Date(a.startDate), new Date(a.endDate));
      const bMultiDay = !isSameDay(new Date(b.startDate), new Date(b.endDate));

      const aDuration =
        new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
      const bDuration =
        new Date(b.endDate).getTime() - new Date(b.startDate).getTime();

      if (aMultiDay && !bMultiDay) return -1;
      if (!aMultiDay && bMultiDay) return 1;

      const startDiff =
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (startDiff !== 0) return startDiff;

      const durationDiff = aDuration - bDuration;
      if (durationDiff !== 0) return durationDiff;

      return a.title.localeCompare(b.title);
    });
}

// normal cell height. This fn give max event count of week (used in day-cell comp)
// without this function the cell will take the height of MAX_EVENTS_PER_DAY*h-6 (if there only one event in all week)
//needed especially in if u want to give access to user to change MAX_EVENTS_PER_DAY or min to max range

export function maxNumberOfEventsPerInterval(
  interval: Array<Cell>,
  eventsOfCells: Array<Event>,
) {
  let maxEventNumberPerInterval = 0;

  interval.forEach((cell) => {
    const eventsPerCell = eventsOfCells.filter((event) => {
      return areIntervalsOverlapping(
        { start: startOfDay(cell.day), end: endOfDay(cell.day) },
        { start: event.startDate, end: event.endDate },
      );
    });
    maxEventNumberPerInterval = Math.max(
      eventsPerCell.length,
      maxEventNumberPerInterval,
    );
  });

  return maxEventNumberPerInterval;
}
