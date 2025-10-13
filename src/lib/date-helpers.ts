import type { Event } from "@/types";
import {
  addMonths,
  differenceInDays,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isSameDay,
  setDate,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";

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

export function calculateMonthEventPositions(events: Array<Event>, date: Date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const eventPositions: { [key: string]: number } = {};
  const occupiedPositions: { [key: string]: Array<boolean> } = {};

  eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach((day) => {
    occupiedPositions[day.toISOString()] = [false, false, false];
  });

  const singleDayEvents = events.filter((event) =>
    isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );
  const multiDayEvents = events.filter(
    (event) => !isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const sortedEvents = [
    ...multiDayEvents.sort((a, b) => {
      const aDuration = differenceInDays(
        new Date(a.endDate),
        new Date(a.startDate),
      );
      const bDuration = differenceInDays(
        new Date(b.endDate),
        new Date(b.startDate),
      );
      return (
        bDuration - aDuration ||
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    }),
    ...singleDayEvents.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() -
          new Date(a.startDate).getTime() -
          (new Date(b.endDate).getTime() - new Date(b.startDate).getTime()),
    ),
  ];

  sortedEvents.forEach((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const eventDays = eachDayOfInterval({
      start: eventStart < monthStart ? monthStart : eventStart,
      end: eventEnd > monthEnd ? monthEnd : eventEnd,
    });

    let position = -1;

    for (let i = 0; i < 3; i++) {
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
  return { eventPositions, occupiedPositions };
}

export function getMonthCellEvents(
  date: Date,
  events: Array<Event>,
  eventPositions: Record<string, number>,
) {
  const eventsForDate = events.filter((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return (
      (date >= eventStart && date <= eventEnd) ||
      isSameDay(date, eventStart) ||
      isSameDay(date, eventEnd)
    );
  });

  return eventsForDate
    .map((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const isMultiDay = !isSameDay(eventStart, eventEnd);
      const isFirstDay = isSameDay(date, eventStart);
      const isLastDay = isSameDay(date, eventEnd);

      return {
        ...event,
        position: eventPositions[event.id] ?? -1,
        isMultiDay,
        isFirstDay,
        isLastDay,
      };
    })
    .sort((a, b) => {
      if (a.isMultiDay && !b.isMultiDay) return -1;
      if (!a.isMultiDay && b.isMultiDay) return 1;

      const posA = a.position === -1 ? 3 : a.position;
      const posB = b.position === -1 ? 3 : b.position;
      return posA - posB;
    });
}
