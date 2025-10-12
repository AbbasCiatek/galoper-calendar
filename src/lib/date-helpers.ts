import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  setDate,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";

export function numberOfDisplayedDaysOfNextMonth(
  daysOfCurrentMonth: Array<Date>,
  indexOfCurrentMonthInWeekdays: number,
) {
  const lengthOfCurrentMonth = daysOfCurrentMonth.length;
  if (lengthOfCurrentMonth + indexOfCurrentMonthInWeekdays > 35)
    return 42 - lengthOfCurrentMonth - indexOfCurrentMonthInWeekdays;
  return 35 - lengthOfCurrentMonth - indexOfCurrentMonthInWeekdays;
}

export function arrayOfDaysOfNextMonth(date: Date) {
  const nextMonth = addMonths(date, 1);
  return daysInMonth(nextMonth);
}
export function arrayOfDaysOfPrevMonth(date: Date) {
  const prevMonth = subMonths(date, 1);
  return daysInMonth(prevMonth);
}

export function numberOfDisplayedDaysOfPrevMonth(
  currentDate: Date,
  indexOfCurrentMonthInWeekdays: number,
) {
  return (
    arrayOfDaysOfPrevMonth(currentDate).daysInMonth.length -
    indexOfCurrentMonthInWeekdays
  );
}

export function daysInMonth(date: Date) {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const indexOfFirstDay = (getDay(firstDayOfMonth) + 6) % 7;
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  return { daysInMonth, indexOfFirstDay };
}

export function getArrayMonth(date: Date) {
  const year = startOfYear(date);
  const months: Array<Date> = [];
  for (let i = 0; i < 12; i++) {
    months.push(addMonths(year, i));
  }
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
  const cellsNumber = daysNumber <= 35 ? 35 : 42;

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
