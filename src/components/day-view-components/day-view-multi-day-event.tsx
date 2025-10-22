import { MultiDayEventDisplay } from "@/components/week-day-view-commons/multi-day-event-display.tsx";
import { useCalendar } from "@/context/calendar-context";
import { useEventStore } from "@/event-store.ts";
import {
  differenceInDays,
  endOfDay,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { motion } from "motion/react";

export function DayViewMultiDayEvent() {
  const { date } = useCalendar();
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const { getMultipleDayEvents } = useEventStore();
  const multiDayEvents = getMultipleDayEvents(dayStart, dayEnd);

  const multiDayEventsInDay = multiDayEvents
    .filter((event) => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);

      return (
        isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
        isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
        (eventStart <= dayStart && eventEnd >= dayEnd)
      );
    })
    .sort((a, b) => {
      const durationA = differenceInDays(
        new Date(a.endDate),
        new Date(a.startDate),
      );
      const durationB = differenceInDays(
        new Date(b.endDate),
        new Date(b.startDate),
      );
      return durationB - durationA;
    });

  if (multiDayEventsInDay.length === 0) return null;

  return (
    <div className="flex border-b">
      <div className="w-18" />
      <div className="flex flex-1 flex-col gap-1 border-l py-1">
        {multiDayEventsInDay.map((event, index) => {
          const eventStart = startOfDay(new Date(event.startDate));
          const eventEnd = startOfDay(new Date(event.endDate));
          const currentDate = startOfDay(date);

          const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
          const eventCurrentDay = differenceInDays(currentDate, eventStart) + 1;

          return (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.2,
                delay: 0.1 * index,
                type: "spring",
                stiffness: 200,
                damping: 20,
                mass: 2,
              }}
              key={event.id}
            >
              <MultiDayEventDisplay
                event={event}
                eventCurrentDay={eventCurrentDay}
                eventTotalDays={eventTotalDays}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
