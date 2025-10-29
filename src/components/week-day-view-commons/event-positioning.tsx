import { colorMap } from "@/constants";
import type { Event } from "@/event-store.ts";
import { groupEvents, positionEventsWeekDayView } from "@/lib/date-helpers";
import { clsx } from "clsx";
import { areIntervalsOverlapping } from "date-fns";
import { motion } from "motion/react";
import { EventBlock } from "./event-block";

type Props = {
  singleDayEvents: Array<Event>;
};

export function EventsPositioning({ singleDayEvents }: Props) {
  const groupedEvents = groupEvents(singleDayEvents);
  return groupedEvents.map((group, groupIndex) =>
    group.map((event) => {
      const { top, height, left, width } = positionEventsWeekDayView(
        event,
        groupIndex,
        groupedEvents.length,
      );
      const isOverlap = groupedEvents.some(
        (otherGroup, otherIndex) =>
          otherIndex !== groupIndex &&
          otherGroup.some((otherEvent) =>
            areIntervalsOverlapping(
              { start: event.startDate, end: event.endDate },
              { start: otherEvent.startDate, end: otherEvent.endDate },
            ),
          ),
      );
      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: 0.1 * groupIndex,
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 2,
          }}
          className={clsx(
            "border-1 rounded-md text-xs cursor-pointer absolute overflow-hidden",
            colorMap[event.color],
          )}
          style={{
            top: `${top}px`,
            height: `${height}px`,
            left: isOverlap ? "0%" : `${left}%`,
            width: isOverlap ? "99.85%" : `${width - 0.15}%`,
          }}
          key={event.id}
        >
          <EventBlock event={event} />
        </motion.div>
      );
    }),
  );
}
