import type { Event } from "@/event-store.ts";
import {
  areIntervalsOverlapping,
  differenceInMinutes,
  eachDayOfInterval,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
} from "date-fns";

export const MAX_ALL_AND_MULTI_DAY_EVENTS = 2;

export function daysOfWeek(date: Date) {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });
}

export function groupEvents(dayEvents: Array<Event>): Array<Array<Event>> {
  const sortedEvents = dayEvents.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime(),
  );
  const groups: Array<Array<Event>> = [];

  for (const event of sortedEvents) {
    const eventStart = event.startDate;
    let placed = false;

    for (const group of groups) {
      const lastEventInGroup = group[group.length - 1];
      const lastEventEnd = lastEventInGroup.endDate;

      if (eventStart >= lastEventEnd) {
        group.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) groups.push([event]);
  }

  return groups;
}

export function positionEventsWeekDayView(
  event: Event,
  groupIndex: number,
  groupsSize: number,
) {
  const startMinutes =
    event.startDate.getMinutes() + event.startDate.getHours() * 60;
  const durationMinutes = differenceInMinutes(event.endDate, event.startDate);
  const containerPx = 24 * 96;
  const top = (startMinutes / 1440) * containerPx;
  const height = (durationMinutes / 1440) * containerPx;
  const width = 100 / groupsSize;
  const left = groupIndex * width;

  return { top, height, left, width };
}
export function maxNumberOfAllAndMultiEventsPerDay(
  day: Date,
  eventsOfWeek: Array<Event>,
) {
  const eventsPerDay = eventsOfWeek.filter((event) => {
    return areIntervalsOverlapping(
      { start: startOfDay(day), end: endOfDay(day) },
      { start: event.startDate, end: event.endDate },
    );
  });
  return eventsPerDay.length;
}

export function maxNumberOfAllAndMultiEventsPerWeek(
  weekDays: Array<Date>,
  eventsOfWeek: Array<Event>,
) {
  let maxEventNumberPerWeek = 0;

  weekDays.forEach((day) => {
    const eventsPerDay = eventsOfWeek.filter((event) => {
      return areIntervalsOverlapping(
        { start: startOfDay(day), end: endOfDay(day) },
        { start: event.startDate, end: event.endDate },
      );
    });
    maxEventNumberPerWeek = Math.max(
      eventsPerDay.length,
      maxEventNumberPerWeek,
    );
  });

  return maxEventNumberPerWeek;
}
