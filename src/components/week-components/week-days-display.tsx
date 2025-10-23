import { useCalendar } from "@/context/calendar-context.tsx";
import { Date_Format } from "@/helpers";
import { daysOfWeek } from "@/lib/date-helpers";
import { clsx } from "clsx";
import { formatDate } from "date-fns";
import { motion } from "motion/react";

export function WeekDaysDisplay() {
  const { date } = useCalendar();
  const weekDays = daysOfWeek(date);

  return (
    <div className="grid flex-1 grid-cols-7 ">
      {weekDays.map((day, index) => (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.025 * index,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          key={day.toISOString()}
          className={clsx("flex-1 py-1 px-2", index === 0 && "border-l")}
        >
          <div className="flex flex-col items-center text-xs font-medium">
            <div className="flex items-center gap-2">
              <span className="leading-none">
                {formatDate(day, Date_Format.shortWeekDay).toUpperCase()}
              </span>
              <span className=" leading-none font-bold">
                {formatDate(day, Date_Format.dayOfMonth)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
