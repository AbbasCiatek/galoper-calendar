import { EventBlock } from "@/components/week-day-view-commons/event-block.tsx";
import type { Event } from "@/event-store.ts";
import { colorMap } from "@/helpers.ts";
import { positionEventsWeekDayView } from "@/lib/date-helpers";
import { clsx } from "clsx";
import { motion } from "motion/react";

type Props = {
  singleDayEvents: Array<Event>;
  date: Date;
};

export function EventsPositioning({ singleDayEvents, date }: Props) {
  const positioning = positionEventsWeekDayView(singleDayEvents, date);

  return (
    <>
      {positioning.map((p, index) => {
        return (
          <motion.div
            key={p.event.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.2,
              delay: 0.2 * index,
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 2,
            }}
            className={clsx(
              "border-2 rounded-md text-xs cursor-pointer absolute overflow-hidden",
              colorMap[p.event.color],
            )}
            style={{
              top: `${p.top}px`,
              height: `${p.height}px`,
              left: `${p.left}%`,
              width: `${p.width}%`,
            }}
          >
            <EventBlock event={p.event} />
          </motion.div>
        );
      })}
    </>
  );
}
