import { DaysInMonth } from "@/components/year-view-components/days-in-month.tsx";
import { MonthNameDisplayer } from "@/components/year-view-components/month-name-displayer.tsx";
import { DATE_FORMAT } from "@/constants";
import { useCalendar } from "@/context/calendar-context.tsx";
import { getArrayOfMonthsOfYear } from "@/lib/date-helpers.ts";
import { formatDate } from "date-fns";
import { motion } from "motion/react";

export function MonthContainers() {
  const { date } = useCalendar();
  const months = getArrayOfMonthsOfYear(date);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2"
    >
      {months.map((month, index) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ staggerChildren: 0.25, delay: 0.05 * index }}
          key={formatDate(month, DATE_FORMAT.longMonth)}
          className="flex flex-col border shadow-lg rounded-2xl"
        >
          <MonthNameDisplayer month={month} />
          <DaysInMonth month={month} />
        </motion.div>
      ))}
    </motion.div>
  );
}
