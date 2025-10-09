import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/context/calendar-context.tsx";
import {
  buttonHover,
  slideFromBot,
  slideFromLeft,
  slideFromTop,
  transition,
} from "@/lib/animations.ts";
import {
  DateAdderFunction,
  DateSubtracterFunction,
  getNumberOfEvents,
  rangeDisplayer,
} from "@/lib/date-helpers.ts";
import type { ViewTypes } from "@/types.ts";
import { formatDate } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export default function DateAndNavigators() {
  const { view, date, setDate } = useCalendar();

  const today = new Date();
  const MotionButton = motion(Button);
  const MotionBadge = motion(Badge);

  const handleTodayClick = (date: Date) => {
    if (date !== today) {
      setDate(today);
    }
  };

  const handleLeftClick = (view: ViewTypes, date: Date) => {
    const subtractedDate = DateSubtracterFunction(view, date);
    setDate(subtractedDate);
  };

  const handleRightClick = (view: ViewTypes, date: Date) => {
    const addedDate = DateAdderFunction(view, date);
    setDate(addedDate);
  };

  const eventCounter = getNumberOfEvents(date, view);

  return (
    <motion.div
      variants={slideFromLeft}
      initial="initial"
      animate="animate"
      className="flex flex-row"
    >
      <motion.button
        variants={buttonHover}
        whileHover="hover"
        whileTap="tap"
        transition={transition}
        type="button"
        onClick={() => handleTodayClick(date)}
        className="flex flex-col size-16 border text-center mr-2 pt-1 rounded-lg cursor-pointer font-bold"
      >
        <motion.p
          className="text-gray-900 dark:bg-gray-900 dark:text-white"
          variants={slideFromTop}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.1, ...transition }}
        >
          {formatDate(today, "MMM").toUpperCase()}
        </motion.p>
        <motion.p
          className="pt-1.5 w-full h-9 bg-gray-900 rounded-b-lg pb-[2px] text-white dark:text-gray-900 dark:bg-white"
          variants={slideFromBot}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2, ...transition }}
        >
          {today.getDate()}
        </motion.p>
      </motion.button>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <motion.p
            className="font-extrabold text-gray-800 dark:text-white text-2xl pb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {formatDate(date, "MMMM yyyy")}
          </motion.p>
          <div className="mx-1">
            <AnimatePresence mode="wait">
              <MotionBadge
                variant="secondary"
                className="py-1 px-3 "
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                {eventCounter} events
              </MotionBadge>
            </AnimatePresence>
          </div>
        </div>
        <div>
          <MotionButton
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            variant="secondary"
            className="size-7 cursor-pointer mr-1"
            onClick={() => {
              handleLeftClick(view, date);
            }}
          >
            <ChevronLeftIcon />
          </MotionButton>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={transition}
            className="text-gray-500 dark:text-gray-900"
          >
            {rangeDisplayer(view, date)}
          </motion.span>
          <MotionButton
            variants={buttonHover}
            whileHover="hover"
            whileTap="tap"
            variant="secondary"
            className="size-7 cursor-pointer ml-1"
            onClick={() => {
              handleRightClick(view, date);
            }}
          >
            <ChevronRightIcon />
          </MotionButton>
        </div>
      </div>
    </motion.div>
  );
}
