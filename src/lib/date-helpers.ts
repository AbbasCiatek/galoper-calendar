import type { Event } from "@/event-store";
import { Date_Format } from "@/helpers.ts";
import {
  endOfDay,
  formatDate,
  isSameDay,
  isSameMonth,
  startOfDay,
} from "date-fns";

export function mapAgendaEvents(events: Array<Event>, date: Date) {
  const singleDayEvents = events.filter((event: Event) =>
    isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const multiDayEvents = events.filter(
    (event: Event) =>
      !isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const allDates = new Map<
    string,
    { date: Date; events: Array<Event>; multiDayEvents: Array<Event> }
  >();

  singleDayEvents.forEach((event) => {
    const eventDate = new Date(event.startDate);
    if (!isSameMonth(eventDate, date)) return;

    const dateKey = formatDate(eventDate, Date_Format.fullDate);

    if (!allDates.has(dateKey)) {
      allDates.set(dateKey, {
        date: startOfDay(eventDate),
        events: [],
        multiDayEvents: [],
      });
    }

    allDates.get(dateKey)?.events.push(event);
  });

  multiDayEvents.forEach((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);

    let currentDate = startOfDay(eventStart);
    const lastDate = endOfDay(eventEnd);

    while (currentDate <= lastDate) {
      if (isSameMonth(currentDate, date)) {
        const dateKey = formatDate(currentDate, Date_Format.fullDate);

        if (!allDates.has(dateKey)) {
          allDates.set(dateKey, {
            date: new Date(currentDate),
            events: [],
            multiDayEvents: [],
          });
        }

        allDates.get(dateKey)?.multiDayEvents.push(event);
      }
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
  });

  return Array.from(allDates.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
}
