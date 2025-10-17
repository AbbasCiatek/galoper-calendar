import { colorMap } from "@/helpers";
import type { Event } from "@/types";
import { clsx } from "clsx";
import { formatDate, isSameDay } from "date-fns";
import { motion } from "motion/react";

type TProps = {
  isFirstCell: boolean;
  isLastCell: boolean;
  event: Event & {
    position: number;
  };
  cell: { day: Date; currentMonth: boolean };
};

export function MonthBadgeEvent({
  isFirstCell,
  isLastCell,
  event,
  cell,
}: TProps) {
  const isFirstDay = isSameDay(event.startDate, cell.day);
  const isLastDay = isSameDay(event.endDate, cell.day);
  const isMiddleDay = !isFirstDay && !isLastDay;
  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: (1 + event.position) * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={clsx(
        `flex justify-between cursor-pointer ${colorMap[event.color]} mx-1 px-1 h-6 items-center border truncate font-bold rounded text-xs`,
        !isFirstDay && "border-l-0  rounded-l-none ml-0 ",
        !isLastDay && "border-r-0  rounded-r-none mr-0 ",
        isMiddleDay && "z-20 w-[calc(100%_+_2px)]",
      )}
    >
      <span>{(isFirstDay || isFirstCell) && event.title}</span>
      <span>
        {(isLastDay || isLastCell) &&
          formatDate(new Date(event.startDate), "hh:mm")}
      </span>
    </motion.div>
  );
}
