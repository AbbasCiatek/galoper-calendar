import { MultiDayEventDisplay } from "@/components/week-day-view-commons/multi-day-event-display.tsx";
import { useCalendar } from "@/context/calendar-context";
import { type Event, useEventStore } from "@/event-store.ts";
import { MAX_ALL_AND_MULTI_DAY_EVENTS } from "@/lib/date-helpers";
import { differenceInDays, endOfDay, isSameDay, startOfDay } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function DayViewMultiDayEvent() {
  const { date } = useCalendar();
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);

  const { getMultipleDayEvents, getAllDayEvents } = useEventStore();
  const multiDayEvents: Array<Event> = getMultipleDayEvents(dayStart, dayEnd);
  const allDayEvents: Array<Event> = getAllDayEvents(dayStart, dayEnd);

  const [showMore, setShowMore] = useState(false);

  const memoizedEvents = useMemo(() => {
    const allAndMultiDayEventsInDay: Array<Event> = [
      ...multiDayEvents.sort((a, b) => {
        const durationA = differenceInDays(
          new Date(a.endDate),
          new Date(a.startDate),
        );
        const durationB = differenceInDays(
          new Date(b.endDate),
          new Date(b.startDate),
        );
        return durationB - durationA;
      }),
      ...allDayEvents,
    ];
    if (!showMore) {
      return allAndMultiDayEventsInDay.slice(0, MAX_ALL_AND_MULTI_DAY_EVENTS);
    }
    return allAndMultiDayEventsInDay;
  }, [multiDayEvents, allDayEvents, showMore]);

  return (
    <div className="flex border-b">
      <AnimatePresence initial={false}>
        <motion.div
          key="content"
          animate={{ maxHeight: showMore ? 128 : 85 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex w-18 justify-center items-end "
        >
          {multiDayEvents.length +
            allDayEvents.length -
            MAX_ALL_AND_MULTI_DAY_EVENTS >
            0 &&
            !showMore && (
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
          {multiDayEvents.length +
            allDayEvents.length -
            MAX_ALL_AND_MULTI_DAY_EVENTS >
            0 &&
            showMore && (
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
        <ScrollArea className=" flex-1 border-l w-full max-h-32 ">
          <div className="flex flex-col gap-1 py-1">
            {memoizedEvents.map((event, index) => {
              if (!isSameDay(event.startDate, event.endDate)) {
                const eventStart = startOfDay(new Date(event.startDate));
                const eventEnd = startOfDay(new Date(event.endDate));
                const currentDate = startOfDay(date);

                const eventTotalDays =
                  differenceInDays(eventEnd, eventStart) + 1;
                const eventCurrentDay =
                  differenceInDays(currentDate, eventStart) + 1;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      mass: 2,
                    }}
                    key={event.id}
                  >
                    <MultiDayEventDisplay
                      event={event}
                      eventCurrentDay={eventCurrentDay}
                      eventTotalDays={eventTotalDays}
                    />
                  </motion.div>
                );
              }

              return (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    mass: 2,
                  }}
                  key={event.id}
                >
                  <MultiDayEventDisplay event={event} />
                </motion.div>
              );
            })}
            {!showMore &&
              multiDayEvents.length +
                allDayEvents.length -
                MAX_ALL_AND_MULTI_DAY_EVENTS >
                0 && (
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
                    +
                    {multiDayEvents.length +
                      allDayEvents.length -
                      MAX_ALL_AND_MULTI_DAY_EVENTS}{" "}
                    <span className="hidden lg:inline-block">more</span>
                  </span>
                </motion.button>
              )}
          </div>
        </ScrollArea>
      </AnimatePresence>
    </div>
  );
}
