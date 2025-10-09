import { Button } from "@/components/ui/button.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { buttonHover, slideFromRight, transition } from "@/lib/animations.ts";
import type { ViewTypes } from "@/types.ts";
import { clsx } from "clsx";
import {
  CalendarDays,
  CalendarRange,
  ClipboardList,
  Columns4,
  Grid3x3,
  PlusIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

export default function ViewChangerCreateEventButton() {
  const { view, setView } = useCalendar();
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case "a":
          handleViewClick("agenda");
          break;
        case "d":
          handleViewClick("day");
          break;
        case "w":
          handleViewClick("week");
          break;
        case "m":
          handleViewClick("month");
          break;
        case "y":
          handleViewClick("year");
          break;
      }
    };
    window.addEventListener("keyup", handleKey);
    return () => window.removeEventListener("keyup", handleKey);
  }, []);

  const views = [
    {
      name: "Agenda",
      value: "agenda",
      icon: () => <CalendarRange className="size-5" />,
    },
    {
      name: "Day",
      value: "day",
      icon: () => <ClipboardList className="size-5" />,
    },
    {
      name: "Week",
      value: "week",
      icon: () => <Columns4 className="size-5" />,
    },
    {
      name: "Month",
      value: "month",
      icon: () => <Grid3x3 className="size-5" />,
    },
    {
      name: "Year",
      value: "year",
      icon: () => <CalendarDays className="size-5" />,
    },
  ];

  const handleViewClick = (view: ViewTypes) => {
    setView((prevView) => (prevView !== view ? view : prevView));
  };

  return (
    <motion.div
      variants={slideFromRight}
      initial="initial"
      animate="animate"
      transition={transition}
      className="flex flex-row items-center gap-4"
    >
      <div className="flex gap-4 text-sm font-semibold w-60 text-gray-500 dark:text-gray-300 ">
        {views.map(({ icon: Icon, name, value }) => {
          const isActive = view === value;
          return (
            <motion.div
              key={value}
              className={clsx(
                "flex gap-2",
                isActive && "text-gray-800 dark:text-gray-white",
              )}
              onClick={() => handleViewClick(value as ViewTypes)}
              initial={false}
              animate={{
                width: isActive ? 120 : 32,
              }}
              transition={{
                type: "tween",
                stiffness: 400,
                damping: 25,
              }}
            >
              <motion.button
                className="flex h-8 w-full items-center justify-center cursor-pointer"
                variants={buttonHover}
                whileHover={!isActive ? "hover" : undefined}
                whileTap={!isActive ? "tap" : undefined}
                transition={transition}
              >
                <Icon />
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      className="ml-2"
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ originX: 0 }}
                    >
                      {name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          );
        })}
      </div>
      <Button className="font-semibold" variant="default">
        {" "}
        <PlusIcon /> Add Event
      </Button>
    </motion.div>
  );
}
