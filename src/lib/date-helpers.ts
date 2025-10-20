import { type Event,useEventStore } from "@/event-store.ts";
import type { ViewTypes } from "@/types";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  formatDate,
  getDay,
  setDate,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
  subMonths,
  subWeeks,
  subYears,
  areIntervalsOverlapping,
  differenceInMinutes,
} from "date-fns";
export function DateAdderFunction(view: ViewTypes, date: Date) {
  switch (view) {
    case "agenda":
      return addMonths(date, 1);
    case "year":
      return addYears(date, 1);
    case "month":
      return addMonths(date, 1);
    case "week":
      return addWeeks(date, 1);
    case "day":
      return addDays(date, 1);
    default:
      return addMonths(date, 1);
  }
}

function DateSubtracterFunction(view: ViewTypes, date: Date) {
  switch (view) {
    case "agenda":
      return subMonths(date, 1);
    case "year":
      return subYears(date, 1);
    case "month":
      return subMonths(date, 1);
    case "week":
      return subWeeks(date, 1);
    case "day":
      return subDays(date, 1);
    default:
      return subMonths(date, 1);
  }
}

export default DateSubtracterFunction;

export function rangeDisplayer(view: ViewTypes, date: Date) {
  const formatString = "MMM d, yyyy";
  let start: Date;
  let end: Date;

  switch (view) {
    case "agenda":
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    case "year":
      start = startOfYear(date);
      end = endOfYear(date);
      break;
    case "month":
      start = startOfMonth(date);
      end = endOfMonth(date);
      break;
    case "week":
      start = startOfWeek(date, { weekStartsOn: 1 });
      end = endOfWeek(date, { weekStartsOn: 1 });
      break;
    case "day":
      return formatDate(date, formatString);
    default:
      return "Error while formatting ";
  }

  return `${formatDate(start, formatString)} - ${formatDate(end, formatString)}`;
}

export function getNumberOfEvents(date: Date, view: ViewTypes) {
  const { getEventsByDateRange } = useEventStore();
  switch (view) {
    case "agenda":
      return getEventsByDateRange(startOfMonth(date), endOfMonth(date)).length;
    case "year":
      return getEventsByDateRange(startOfYear(date), endOfYear(date)).length;
    case "month":
      return getEventsByDateRange(startOfMonth(date), endOfMonth(date)).length;
    case "week":
      return getEventsByDateRange(
        startOfWeek(date, { weekStartsOn: 1 }),
        endOfWeek(date, { weekStartsOn: 1 }),
      ).length;
    case "day":
      return getEventsByDateRange(startOfDay(date), endOfDay(date)).length;
  }
}
export function getArrayOfMonthsOfYear(date: Date) {
  const year = startOfYear(date);
  const months: Array<Date> = [];
  Array.from({ length: 12 }, (_, i) => {
    months.push(addMonths(year, i));
  });

  return months;
}

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
export function daysOfWeek(date: Date) {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });
}
type PositionedEvent = {
  event: Event;
  top: number; // % from top of day
  height: number; // % of the day
  left: number; // % from left
  width: number; // % of the container
};

export function clipEvent(event: Event, date: Date) {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(date);
  dayEnd.setHours(23, 59, 59, 999);

  const start = event.startDate;
  const end = event.endDate;

  const clippedStart = start < dayStart ? dayStart : start;
  const clippedEnd = end > dayEnd ? dayEnd : end;

  const startMinutes = differenceInMinutes(clippedStart, dayStart);
  const durationMinutes = differenceInMinutes(clippedEnd, clippedStart);
  return {
    event,
    start: clippedStart,
    end: clippedEnd,
    startMinutes,
    durationMinutes,
  };
}
export function positionEventsWeekDayView(events: Array<Event>, day: Date) {
  const clippedEvents = events.map((event: Event) => {
    return clipEvent(event, day);
  });
  clippedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
  const placed: Array<PositionedEvent> = [];
  const lengthOfEvents = clippedEvents.length;
  clippedEvents.forEach((currentEvent) => {
    const overlapping = clippedEvents.filter(
      (otherEvent) =>
        otherEvent.start !== currentEvent.start &&
        areIntervalsOverlapping(
          {
            start: currentEvent.start,
            end: currentEvent.end,
          },
          {
            start: otherEvent.start,
            end: otherEvent.end,
          },
        ),
    );
    const startBefore = overlapping.filter(
      (otherEvent) => otherEvent.start.getTime() < currentEvent.start.getTime(),
    );
    const biggerCount = startBefore.length;
    //container pixels = numberOfHours(24) * PIXELS_PER_HOUR
    const containerPx = 24 * 96;
    const overlapCount = overlapping.length + 1;
    const width = lengthOfEvents < 15 ? 100 / overlapCount : 50 / overlapCount;
    const top = (currentEvent.startMinutes / 1440) * containerPx;
    const height = (currentEvent.durationMinutes / 1440) * containerPx;
    const left = overlapping.length
      ? lengthOfEvents < 15
        ? 10 * biggerCount
        : 20 * biggerCount
      : 0;
    placed.push({ event: currentEvent.event, top, height, left, width });
  });

  return placed;
}
