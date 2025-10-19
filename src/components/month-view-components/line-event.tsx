import { colorMap } from "@/helpers";
import type { Event } from "@/types";
import { clsx } from "clsx";
import { isSameDay } from "date-fns";
import { motion } from "motion/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type TProps = {
  event: Event & {
    position: number;
  };
  cell: { day: Date; currentMonth: boolean };
};

export function LineEvent({ event, cell }: TProps) {
  const isFirstDay = isSameDay(event.startDate, cell.day);
  const isLastDay = isSameDay(event.endDate, cell.day);
  const isMiddleDay = !isFirstDay && !isLastDay;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
            `flex justify-between cursor-pointer ${colorMap[event.color]} mx-1 px-1 items-center  border-4 truncate font-bold rounded text-xs`,
            !isFirstDay && "border-l-0  rounded-l-none ml-0 ",
            !isLastDay && "border-r-0  rounded-r-none mr-0 ",
            isMiddleDay && "z-20 w-[calc(100%_+_2px)]",
          )}
        />
      </TooltipTrigger>
      <TooltipContent color={colorMap[event.color]}>
        <p>{event.title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
