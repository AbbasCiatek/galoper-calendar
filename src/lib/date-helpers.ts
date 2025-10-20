import { useEventStore } from "@/event-store.ts";
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
