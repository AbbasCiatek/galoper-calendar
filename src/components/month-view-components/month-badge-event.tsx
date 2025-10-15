import { colorMap } from "@/helpers";
import type { Event } from "@/types";
import { clsx } from "clsx";
import { formatDate, isSameDay } from "date-fns";
import { motion } from "motion/react";

type TProps = {
  event: Event & {
    position: number;
  };
  cell: { day: Date; currentMonth: boolean };
};

export function MonthBadgeEvent({ event, cell }: TProps) {
  const isFirstDay = isSameDay(event.startDate, cell.day);
  const isLastDay = isSameDay(event.endDate, cell.day);
  const isMiddleDay = !isFirstDay && !isLastDay;
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: event.position * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={clsx(
        `flex justify-between cursor-pointer ${colorMap[event.color]} mx-1 h-6.5 items-center gap-1.5 border px-2 truncate font-bold rounded text-xs`,
        !isFirstDay && "border-l-0  rounded-l-none ml-0 ",
        !isLastDay && "border-r-0  rounded-r-none mr-0 ",
        isMiddleDay && "z-20 w-[calc(100%_+_2px)]",
      )}
    >
      <span>{isFirstDay && event.title}</span>
      <span>{isLastDay && formatDate(new Date(event.startDate), "hh:mm")}</span>
    </motion.div>
  );
}
