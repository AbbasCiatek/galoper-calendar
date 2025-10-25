import { WEEK_DAYS } from "@/constants";
import { motion } from "motion/react";
export function WeekDaysDisplay() {
  return (
    <div className="grid grid-cols-7 text-xl justify-between items-center divide-x  ">
      {WEEK_DAYS.map((day, index) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.05 * index,
              type: "spring",
              stiffness: 200,
              damping: 20,
              mass: 2,
            }}
            className="text-center capitalize text-sm"
            key={day}
          >
            {day.toLowerCase().slice(0, 3)}
          </motion.div>
        );
      })}
    </div>
  );
}
