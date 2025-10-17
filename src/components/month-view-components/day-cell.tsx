import { MAX_EVENTS_PER_DAY } from "@/lib/date-helpers.ts";
import type { Event } from "@/types";
import { clsx } from "clsx";
import { formatDate, isMonday, isToday } from "date-fns";
import { motion } from "motion/react";
import { useCallback } from "react";
import { EventBullet } from "../events/event-bullet";
import { MonthBadgeEvent } from "./month-badge-event";
type TProps = {
  maxEventsPerWeek: number;
  isFirstCell: boolean;
  isLastCell: boolean;
  cell: { day: Date; currentMonth: boolean };
  cellEvents: Array<Event & { position: number }>;
};
export function DayCell({
  maxEventsPerWeek,
  isFirstCell,
  isLastCell,
  cell,
  cellEvents,
}: TProps) {
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
            className=" h-[26px]"
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
          <div className="max-lg:flex max-lg:flex-row max-lg:flex-1">
            <EventBullet className="lg:hidden" color={event.color} />
          </div>
          <div className={clsx("hidden lg:flex lg:flex-col  ")}>
            {/*<EventDetailsDialog event={pureEvent} />*/}
            <MonthBadgeEvent
              isFirstCell={isFirstCell}
              isLastCell={isLastCell}
              event={event}
              cell={cell}
            />
            {/*</EventDetailsDialog>*/}
          </div>
        </>
      );
    },
    [cellEvents, cell, isFirstCell, isLastCell],
  );
  const renderingNumber =
    maxEventsPerWeek < MAX_EVENTS_PER_DAY
      ? maxEventsPerWeek
      : MAX_EVENTS_PER_DAY;
  const positionArray: Array<number> = [];
  for (let i = 0; i < renderingNumber; i++) positionArray.push(i);
  return (
    <div
      className={clsx(
        "flex flex-col lg:flex-grow border-l border-t h-full lg:min-h-36",
        isMonday(cell.day) && "border-l-0",
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
          "flex lg:flex-grow gap-0.5 lg:flex-col",
          !cell.currentMonth && "opacity-50",
        )}
      >
        {cellEvents.length > 0 && positionArray.map(renderEventAtPosition)}
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
