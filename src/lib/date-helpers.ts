import type { Event } from "@/types";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isSameDay,
  setDate,
  startOfDay,
  startOfMonth,
  subMonths,
} from "date-fns";
export const MAX_EVENTS_PER_DAY = 3;

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

function positionPerDay(date: Date) {
  const positions: Record<string, Array<boolean>> = {};
  eachDayOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date),
  }).forEach((day) => {
    positions[startOfDay(day).toISOString()] =
      Array(MAX_EVENTS_PER_DAY).fill(false);
  });
  return positions;
}

export function calculateMonthEventPositions(events: Array<Event>, date: Date) {
  const eventPositions: Record<string, number> = {};
  const occupiedPositions = positionPerDay(date);

  const singleDayEvents = events.filter((event) =>
    isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const multiDayEvents = events.filter(
    (event) => !isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const sortedEvents = [
    ...multiDayEvents.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    ),
    ...singleDayEvents.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
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

export function getMonthCellEvents(
  date: Date,
  events: Array<Event>,
  eventPositions: Record<string, number>,
) {
  return events
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
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime() ||
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
    );
}
