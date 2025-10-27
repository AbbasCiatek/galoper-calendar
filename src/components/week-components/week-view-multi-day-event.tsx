import { MultiDayEventDisplay } from "@/components/week-day-view-commons/multi-day-event-display.tsx";
import { MAX_ALL_AND_MULTI_DAY_EVENTS } from "@/constants";
import { useCalendar } from "@/context/calendar-context.tsx";
import { useEventStore } from "@/event-store.ts";
import {
  maxNumberOfAllAndMultiEventsPerDay,
  maxNumberOfAllAndMultiEventsPerWeek,
} from "@/lib/date-helpers.ts";
import {
  addDays,
  differenceInDays,
  endOfWeek,
  isAfter,
  isBefore,
  startOfWeek,
} from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function WeekViewMultiDayEvent() {
  const { date } = useCalendar();
  const { getMultipleDayEvents, getAllDayEvents } = useEventStore();
  const multiDayEvents = getMultipleDayEvents(
    startOfWeek(date, { weekStartsOn: 1 }),
    endOfWeek(date, { weekStartsOn: 1 }),
  );

  const allDayEvents = getAllDayEvents(
    startOfWeek(date, { weekStartsOn: 1 }),
    endOfWeek(date, { weekStartsOn: 1 }),
  );

  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const [showMore, setShowMore] = useState(false);

  const maxEventsPerWeek = maxNumberOfAllAndMultiEventsPerWeek(weekDays, [
    ...multiDayEvents,
    ...allDayEvents,
  ]);

  const processedEvents = useMemo(() => {
    return [...multiDayEvents, ...allDayEvents]
      .map((event) => {
        const start = new Date(event.startDate);
        const end = new Date(event.endDate);
        const adjustedStart = isBefore(start, weekStart) ? weekStart : start;
        const adjustedEnd = isAfter(end, weekEnd) ? weekEnd : end;
        const startIndex = differenceInDays(adjustedStart, weekStart);
        const endIndex = differenceInDays(adjustedEnd, weekStart);
        return {
          ...event,
          adjustedStart,
          adjustedEnd,
          startIndex,
          endIndex,
        };
      })
      .sort((a, b) => {
        const startDiff = a.adjustedStart.getTime() - b.adjustedStart.getTime();
        if (startDiff !== 0) return startDiff;
        return b.endIndex - b.startIndex - (a.endIndex - a.startIndex);
      });
  }, [multiDayEvents, allDayEvents, weekStart, weekEnd]);

  const eventRows = useMemo(() => {
    const rows: Array<typeof processedEvents> = [];

    processedEvents.forEach((event) => {
      let rowIndex = rows.findIndex((row) =>
        row.every(
          (e) => e.endIndex < event.startIndex || e.startIndex > event.endIndex,
        ),
      );

      if (rowIndex === -1) {
        rowIndex = rows.length;
        rows.push([]);
      }

      rows[rowIndex].push(event);
    });
    if (!showMore) {
      return rows.slice(0, MAX_ALL_AND_MULTI_DAY_EVENTS);
    }
    return rows;
  }, [processedEvents, showMore]);

  const hasEventsInWeek = useMemo(() => {
    return multiDayEvents.some((event) => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);

      return (
        // Event starts within the week
        (start >= weekStart && start <= weekEnd) ||
        // Event ends within the week
        (end >= weekStart && end <= weekEnd) ||
        // Event spans the entire week
        (start <= weekStart && end >= weekEnd)
      );
    });
  }, [multiDayEvents, weekStart, weekEnd]);

  if (!hasEventsInWeek) {
    return null;
  }

  return (
    <div className="flex">
      <AnimatePresence initial={false}>
        <motion.div
          key="content"
          animate={{ maxHeight: showMore ? 128 : 85 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex w-18 justify-center items-end border-b"
        >
          {maxEventsPerWeek - MAX_ALL_AND_MULTI_DAY_EVENTS && !showMore && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200"
              type="button"
              onClick={() => setShowMore(!showMore)}
            >
              <ChevronDown className="text-gray-700" />
            </motion.button>
          )}
          {maxEventsPerWeek - MAX_ALL_AND_MULTI_DAY_EVENTS && showMore && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200"
              type="button"
              onClick={() => setShowMore(!showMore)}
            >
              <ChevronUp className="text-gray-700" />
            </motion.button>
          )}
        </motion.div>
        <ScrollArea className=" flex-1 border-b border-l w-full max-h-32 ">
          <motion.div
            key="content"
            animate={{ maxHeight: showMore ? 128 : 85 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className=" grid grid-cols-7 divide-x"
          >
            {weekDays.map((day, dayIndex) => {
              const maxEventsDay = maxNumberOfAllAndMultiEventsPerDay(
                day,
                processedEvents,
              );
              return (
                <div
                  key={day.toISOString()}
                  className="flex h-full flex-col gap-1 py-1"
                >
                  {eventRows.map((row, rowIndex) => {
                    const event = row.find(
                      (e) => e.startIndex <= dayIndex && e.endIndex >= dayIndex,
                    );

                    if (!event) {
                      return (
                        <div
                          key={`${rowIndex}-${day.toISOString()}`}
                          className="h-6.5"
                        />
                      );
                    }

                    let position: "first" | "middle" | "last" | "none";
                    if (
                      dayIndex === event.startIndex &&
                      dayIndex === event.endIndex
                    ) {
                      position = "none";
                    } else if (dayIndex === event.startIndex) {
                      position = "first";
                    } else if (dayIndex === event.endIndex) {
                      position = "last";
                    } else {
                      position = "middle";
                    }

                    return (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: 0.1 * rowIndex,
                          type: "spring",
                          stiffness: 200,
                          damping: 20,
                          mass: 2,
                        }}
                        key={`${event.id}-${day.toISOString()}`}
                      >
                        <MultiDayEventDisplay
                          event={event}
                          position={position}
                        />
                      </motion.div>
                    );
                  })}
                  {!showMore &&
                    maxEventsDay - MAX_ALL_AND_MULTI_DAY_EVENTS > 0 && (
                      <motion.button
                        type="button"
                        onClick={() => setShowMore(true)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="flex justify-center rounded-full  text-gray-600 cursor-pointer text-xs font-semibold "
                      >
                        <span>
                          {" "}
                          +{maxEventsDay - MAX_ALL_AND_MULTI_DAY_EVENTS}{" "}
                          <span className="hidden lg:inline-block">more</span>
                        </span>
                      </motion.button>
                    )}
                </div>
              );
            })}
          </motion.div>
        </ScrollArea>
      </AnimatePresence>
    </div>
  );
}
