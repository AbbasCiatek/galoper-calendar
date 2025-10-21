import { Button } from "@/components/ui/button.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
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

const views = [
  {
    name: "Agenda",
    value: "agenda",
    icon: CalendarRange,
  },
  {
    name: "Day",
    value: "day",
    icon: ClipboardList,
  },
  {
    name: "Week",
    value: "week",
    icon: Columns4,
  },
  {
    name: "Month",
    value: "month",
    icon: Grid3x3,
  },
  {
    name: "Year",
    value: "year",
    icon: CalendarDays,
  },
];

export function ViewChangerCreateEventButton() {
  const { view, setView } = useCalendar();
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      switch (event.key) {
        case "a":
          setView("agenda");
          break;
        case "d":
          setView("day");
          break;
        case "w":
          setView("week");
          break;
        case "m":
          setView("month");
          break;
        case "y":
          setView("year");
          break;
      }
    };
    window.addEventListener("keyup", handleKey);
    return () => window.removeEventListener("keyup", handleKey);
  }, [setView]);

  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="flex flex-row items-center gap-4"
    >
      <div className="flex gap-4 text-sm font-semibold w-60 text-gray-500 dark:text-gray-300 ">
        {/*<!--View Changers-->*/}
        {views.map(({ icon: Icon, name, value }) => {
          const isActive = view === value;
          return (
            <motion.div
              key={value}
              className={clsx(
                "flex gap-2",
                isActive && "text-gray-800 dark:text-white",
              )}
              onClick={() => setView(value as ViewTypes)}
              initial={false}
              animate={{
                width: isActive ? 120 : 32,
              }}
              transition={{ duration: 0.5, ease: "easeIn" }}
            >
              <button
                type="button"
                className={clsx(
                  "flex gap-2 h-8 w-full items-center justify-center cursor-pointer",
                  !isActive &&
                    " hover:scale-105 transform transition-all duration-200",
                )}
              >
                <Icon className="size-5" />
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      style={{ originX: 0 }}
                    >
                      {name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>
      {/*<!--Add Event Button-->*/}
      <Button className="font-semibold" variant="default">
        {" "}
        <PlusIcon /> Add Event
      </Button>
    </motion.div>
  );
}
