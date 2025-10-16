import type { Event } from "@/types";
import { clsx } from "clsx";
import {
  areIntervalsOverlapping,
  endOfDay,
  formatDate,
  isMonday,
  isToday,
  startOfDay,
} from "date-fns";
import { motion } from "motion/react";
import { useCallback } from "react";
import { EventBullet } from "../events/event-bullet";
import { MonthBadgeEvent } from "./month-badge-event";
type TProps = {
  cell: { day: Date; currentMonth: boolean };
  eventsPerWeek: Array<Event & { position: number }>;
};
export function DayCell({ cell, eventsPerWeek }: TProps) {
  const cellEvents = eventsPerWeek.filter((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    return areIntervalsOverlapping(
      { start: startOfDay(cell.day), end: endOfDay(cell.day) },
      { start: eventStart, end: eventEnd },
    );
  });

  let undisplayedEvents = 0;
  for (const cell of cellEvents) {
    if (cell.position === -1) undisplayedEvents++;
  }

  const renderEventAtPosition = useCallback(
    (position: number) => {
      const event = cellEvents.find((e) => e.position === position);
      if (!event) {
        return (
          <motion.div
            key={`empty-${position}`}
            className=" lg:flex-1"
            initial={false}
            animate={false}
          />
        );
      }
      //destructuring event object and taking only pure event attributes to pass to Event Details Dialog
      // const { id, title, description, startDate, endDate, color, isAllDay } =
      //   event;
      // const pureEvent = {
      //   id,
      //   title,
      //   description,
      //   startDate,
      //   endDate,
      //   color,
      //   isAllDay,
      // };
      return (
        <>
          <div className="flex flex-row gap-1">
            <EventBullet className="lg:hidden" color={event.color} />
          </div>
          <div className={clsx("hidden lg:flex lg:flex-col lg:flex-1")}>
            {/*<EventDetailsDialog event={pureEvent} />*/}
            <MonthBadgeEvent event={event} cell={cell} />
            {/*</EventDetailsDialog>*/}
          </div>
        </>
      );
    },
    [cellEvents, cell],
  );
  const array: Array<number> = [0, 1, 2];
  return (
    <div
      className={clsx(
        "flex flex-col border-l border-t h-full lg:min-h-40",
        isMonday(cell.day) && "border-l-0",
        "bg-white",
      )}
    >
      <span
        className={clsx(
          "flex w-6 h-6 items-center justify-center rounded-full text-xs font-semibold",
          cell.currentMonth
            ? "text-gray-800 dark:text-gray-200"
            : "text-gray-400 dark:text-gray-500",
          isToday(cell.day) && "bg-primary font-bold text-primary-foreground",
        )}
      >
        {formatDate(cell.day, "d")}
      </span>

      <div
        className={clsx(
          "flex lg:h-24 lg:flex-col",
          !cell.currentMonth && "opacity-50",
        )}
      >
        {cellEvents.length > 0 && array.map(renderEventAtPosition)}
      </div>
      <div className="flex justify-center">
        {undisplayedEvents > 0 && (
          // <EventListDialog events={events}>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={clsx(
              "border rounded-full border-gray-200 cursor-pointer text-xs font-semibold ",
              cell.currentMonth
                ? "text-gray-500 dark:text-gray-300"
                : "text-gray-500/50 dark:text-gray-300/50",
            )}
          >
            <span>
              {" "}
              +{undisplayedEvents}{" "}
              <span className="hidden lg:inline-block">more</span>
            </span>
          </motion.div>
          // </EventListDialog>
        )}
      </div>
    </div>
  );
}
