import {
  MAX_EVENTS_PER_DAY,
  getMonthCellEvents,
  unassignedPosition,
} from "@/lib/date-helpers";
import type { Event } from "@/types";
import { clsx } from "clsx";
import { formatDate, isMonday, isSameDay, isToday } from "date-fns";
import { motion } from "motion/react";
import { useCallback, useMemo } from "react";
import { MonthBadgeEvent } from "./month-badge-event";
type TProps = {
  cell: { day: Date; currentMonth: boolean };
  events: Array<Event>;
  eventPositions: Record<string, number>;
  occupiedPositions: Record<string, Array<boolean>>;
};
export function DayCell({
  cell,
  events,
  eventPositions,
  occupiedPositions,
}: TProps) {
  const cellEvents = useMemo(
    () => getMonthCellEvents(events, eventPositions),
    [events, eventPositions],
  );
  cellEvents.map((cellEvent) => console.log(cellEvent));

  const renderEventAtPosition = useCallback(
    (position: number) => {
      const event = cellEvents
        .slice(0, MAX_EVENTS_PER_DAY)
        .find((e) => e.position === position || e.position === -1);

      if (!event) {
        return (
          <motion.div
            key={`empty-${position}`}
            className="flex-1"
            initial={false}
            animate={false}
          />
        );
      }
      //This is not an optimal solution but it works
      if (event.position === -1) {
        unassignedPosition(event, cell.day, occupiedPositions);
      }
      const isMiddleDay =
        !isSameDay(event.startDate, cell.day) &&
        !isSameDay(event.endDate, cell.day);
      return (
        <motion.div
          key={`event-${event.id}-${position}`}
          className={clsx("flex-1", isMiddleDay && "z-20 w-[calc(100%_+_2px)]")}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: position * 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <MonthBadgeEvent event={event} cell={cell} />
        </motion.div>
      );
    },
    [cellEvents, cell, occupiedPositions],
  );

  return (
    <div
      className={clsx(
        "flex flex-col gap-1 border-l border-t h-full min-h-40",
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
          "flex mt-1 h-24 flex-col gap-2 ",
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
              <span className="hidden md:inline-block">more</span>
            </span>
          </motion.div>
          // </EventListDialog>
        )}
      </div>
    </div>
  );
}
