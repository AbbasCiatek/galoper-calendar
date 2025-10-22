import { WEEK_DAYS, lowerSliceWord } from "@/helpers.tsx";
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
            className="text-center text-sm"
            key={day}
          >
            {lowerSliceWord(day, 3)}
          </motion.div>
        );
      })}
    </div>
  );
}
