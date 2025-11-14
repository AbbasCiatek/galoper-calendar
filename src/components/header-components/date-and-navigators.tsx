import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATE_FORMAT } from "@/constants.ts";
import { useCalendar } from "@/context/calendar-context.tsx";
import DateSubtracterFunction, {
  DateAdderFunction,
  getNumberOfEvents,
  rangeDisplayer,
} from "@/lib/date-helpers.ts";
import { formatDate } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback } from "react";

export function DateAndNavigators() {
  const { view, date, setDate } = useCalendar();
  const today = new Date();
  const MotionBadge = motion(Badge);

  const handleTodayClick = (date: Date) => {
    if (date !== today) {
      setDate(today);
    }
  };

  const handleLeftClick = useCallback(() => {
    const subtractedDate = DateSubtracterFunction(view, date);
    setDate(subtractedDate);
  }, [view, date, setDate]);
  const handleRightClick = useCallback(() => {
    const addedDate = DateAdderFunction(view, date);
    setDate(addedDate);
  }, [view, date, setDate]);

  const eventCounter = getNumberOfEvents(date, view);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex md:flex-row flex-col gap-2"
    >
      {/* <!-- Today Button --> */}
      <button
        type="button"
        onClick={() => handleTodayClick(date)}
        className="flex flex-col size-16 border rounded-lg cursor-pointer font-bold hover:scale-105 transform transition-all duration-150"
      >
        <p className="text-gray-900 dark:bg-gray-900 dark:text-white p-0.5">
          {formatDate(today, DATE_FORMAT.shortMonth).toUpperCase()}
        </p>
        <p className="grow text-center flex items-center justify-center bg-gray-900 rounded-b-lg  text-white dark:text-gray-900 dark:bg-white">
          {today.getDate()}
        </p>
      </button>

      {/* <!-- Date and Range Display --> */}
      <div className="flex flex-col gap-1 justify-end ">
        <div className="flex flex-row gap-2 items-center">
          <p className="font-semibold text-gray-800 dark:text-white text-lg">
            {formatDate(date, DATE_FORMAT.longMonthYear)}
          </p>

          <AnimatePresence mode="wait">
            <MotionBadge
              variant="secondary"
              className="px-3 h-fit"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {eventCounter} events
            </MotionBadge>
          </AnimatePresence>
        </div>

        <div className="flex flex-row gap-1 items-center">
          <Button
            variant="secondary"
            className="size-7 cursor-pointer hover:scale-105 transform transition-all duration-150"
            onClick={handleLeftClick}
          >
            <ChevronLeftIcon />
          </Button>
          <AnimatePresence mode="wait">
            <motion.span
              key={rangeDisplayer(view, date)}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-gray-500 text-sm dark:text-gray-900"
            >
              {rangeDisplayer(view, date)}
            </motion.span>
          </AnimatePresence>
          <Button
            variant="secondary"
            className="size-7 cursor-pointer hover:scale-105  transform transition-all duration-150"
            onClick={handleRightClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
