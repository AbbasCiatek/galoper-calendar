import { DATE_FORMAT, colorMap } from "@/constants";
import type { Event } from "@/event-store";
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
  const isSingleDay = isFirstDay && isLastDay;
  const isMiddleDay = !isFirstDay && !isLastDay;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: (1 + event.position) * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={clsx(
        "flex justify-between cursor-pointer rounded h-6 items-center border truncate font-bold text-xs",
        colorMap[event.color],
        {
          "px-1 mx-1 ": isSingleDay,
          "rounded-l-none rounded-r-none border-x-0": isMiddleDay,
          "pl-1 ml-1 border-r-0 rounded-r-none": isFirstDay && !isSingleDay,
          "pr-1 mr-1 border-l-0 rounded-l-none": isLastDay && !isSingleDay,
          "w-[calc(100%_+_2px)] z-30":
            (isFirstDay || isMiddleDay) && !isLastCell && !isSingleDay,
        },
      )}
    >
      <div className="flex gap-1">
        <span className="max-w-16 truncate">
          {(isFirstDay || isFirstCell) && event.title}
        </span>
        <span>
          {isFirstDay &&
            formatDate(new Date(event.startDate), DATE_FORMAT.timeFormat)}
        </span>
      </div>
      <span>
        {isLastDay &&
          formatDate(new Date(event.endDate), DATE_FORMAT.timeFormat)}
      </span>
    </motion.div>
  );
}
