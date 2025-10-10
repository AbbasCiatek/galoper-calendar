import useEventStore from "@/EventStore.ts";
import { EventBullet } from "@/components/events/event-bullet.tsx";
import { WeekDays } from "@/helpers.ts";
import {
  arrayOfDaysOfNextMonth,
  arrayOfDaysOfPrevMonth,
  daysInMonth,
  numberOfDisplayedDaysOfNextMonth,
  numberOfDisplayedDaysOfPrevMonth,
} from "@/lib/date-helpers.ts";
import type { Event } from "@/types.ts";
import { endOfMonth, formatDate, isSameDay, startOfMonth } from "date-fns";

export default function DaysInMonth({ month }: { month: Date }) {
  const days = daysInMonth(month);
  const nextMonthDaysDisplayed = numberOfDisplayedDaysOfNextMonth(
    days.daysInMonth,
    days.indexOfFirstDay,
  );
  const daysNextMonthDisplayed = arrayOfDaysOfNextMonth(month);
  const daysPrevMonthDisplayed = arrayOfDaysOfPrevMonth(month);
  const prevMonthDaysDisplayed = numberOfDisplayedDaysOfPrevMonth(
    month,
    days.indexOfFirstDay,
  );

  const { getEventsByDateRange } = useEventStore();
  const monthlyEvents: Array<Event> = getEventsByDateRange(
    startOfMonth(month),
    endOfMonth(month),
  );

  return (
    <div className="grid grid-cols-7 px-3 py-2 gap-4">
      {WeekDays.map((weekDay) => {
        return (
          <div
            className="p-1.5 flex-grow text-xs font-semibold text-gray-600 dark:text-gray-200 gap-1 "
            key={weekDay}
          >
            {weekDay}
          </div>
        );
      })}
      {daysPrevMonthDisplayed.daysInMonth
        .splice(prevMonthDaysDisplayed)
        .map((day) => {
          return (
            <div
              key={formatDate(day, "dd MMM")}
              className=" gap-1 p-1  text-center text-xs rounded-sm text-gray-400 dark:text-gray-500"
            >
              {" "}
              {formatDate(day, "d")}
            </div>
          );
        })}
      {days.daysInMonth.map((day) => {
        const dayEvent = monthlyEvents.filter((event: Event) =>
          isSameDay(new Date(event.startDate), day),
        );
        return (
          <div key={formatDate(day, "dd MMM")}>
            <div className=" gap-1 p-1  text-center text-xs font-medium text-gray-800 dark:text-gray-200 rounded-full">
              {formatDate(day, "d")}
            </div>
            {dayEvent.length > 1 ? (
              <div className="flex flex-col justify-center items-center">
                {/*<EventListDialog events={dayEvent} date={day}>*/}
                <EventBullet color={dayEvent[0].color} />
                <span className="text-[0.6rem] text-gray-800 dark:text-gray-200 ">
                  +{dayEvent.length - 1}
                </span>
                {/*</EventListDialog>*/}
              </div>
            ) : (
              dayEvent.length > 0 && (
                <div className="flex flex-col justify-center items-center">
                  {/*<EventDetailsDialog event={dayEvent[0]}>*/}
                  <EventBullet color={dayEvent[0].color} />
                  {/*</EventDetailsDialog>*/}
                </div>
              )
            )}
          </div>
        );
      })}
      {daysNextMonthDisplayed.daysInMonth
        .slice(0, nextMonthDaysDisplayed)
        .map((day) => {
          return (
            <div
              key={formatDate(day, "dd MMM")}
              className=" gap-1 p-1  text-center text-xs rounded-sm text-gray-400 dark:text-gray-500"
            >
              {formatDate(day, "d")}
            </div>
          );
        })}
    </div>
  );
}
