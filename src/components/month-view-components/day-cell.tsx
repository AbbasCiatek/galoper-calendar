import { MAX_EVENTS_PER_DAY, getMonthCellEvents } from "@/lib/date-helpers";
import type { Event } from "@/types";
import { clsx } from "clsx";
import { formatDate, isMonday, isToday } from "date-fns";
import { motion } from "motion/react";
import { useCallback, useMemo } from "react";
import { EventBullet } from "../events/event-bullet";
import { MonthBadgeEvent } from "./month-badge-event";
type TProps = {
  cell: { day: Date; currentMonth: boolean };
  events: Array<Event>;
  eventPositions: Record<string, number>;
};
export function DayCell({ cell, events, eventPositions }: TProps) {
  const cellEvents = useMemo(
    () => getMonthCellEvents(events, eventPositions),
    [events, eventPositions],
  );

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
          <EventBullet className="lg:hidden" color={event.color} />
          <motion.div
            key={`event-${event.id}-${position}`}
            className={clsx("hidden lg:flex lg:flex-col lg:flex-1")}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: position * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            {/*<EventDetailsDialog event={pureEvent} />*/}
            <MonthBadgeEvent event={event} cell={cell} />
            {/*</EventDetailsDialog>*/}
          </motion.div>
        </>
      );
    },
    [cellEvents, cell],
  );

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
          "flex w-6 h-6 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0",
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
          "flex lg:h-24 lg:flex-col gap-0.5 lg:gap-2 ",
          !cell.currentMonth && "opacity-50",
        )}
      >
        {cellEvents.length > 0 && [0, 1, 2].map(renderEventAtPosition)}
      </div>
      <div className="flex justify-center">
        {cellEvents.length > MAX_EVENTS_PER_DAY && (
          // <EventListDialog events={events}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className={clsx(
              "border rounded-full px-1 mb-2 border-gray-200 cursor-pointer text-xs font-semibold ",
              cell.currentMonth
                ? "text-gray-500 dark:text-gray-300"
                : "text-gray-500/50 dark:text-gray-300/50",
            )}
          >
            <span>
              {" "}
              +{cellEvents.length - MAX_EVENTS_PER_DAY}{" "}
              <span className="hidden lg:inline-block">more</span>
            </span>
          </motion.div>
          // </EventListDialog>
        )}
      </div>
    </div>
  );
}
