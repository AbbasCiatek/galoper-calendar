import { EventBullet } from "@/components/events/event-bullet.tsx";
import useEventStore from "@/event-store.ts";
import { useCalendar } from "@/context/calendar-context";
import { WeekDays } from "@/helpers.ts";
import { getCalendarCellsOfMonth } from "@/lib/date-helpers.ts";
import type { Event } from "@/types.ts";
import { clsx } from "clsx";
import { endOfMonth, formatDate, isSameDay, startOfMonth } from "date-fns";

export function DaysInMonth({ month }: { month: Date }) {
  const { date, setDate } = useCalendar();
  // option to path if week start at monday or sunday bool (if needed)
  const cells = getCalendarCellsOfMonth(month, true);

  const handleDayClick = (date: Date) => {
    setDate(date);
  };

  const { getEventsByDateRange } = useEventStore();
  const monthlyEvents: Array<Event> = getEventsByDateRange(
    startOfMonth(month),
    endOfMonth(month),
  );

  return (
    <div className="grid grid-cols-7 gap-6 m-4">
      {WeekDays.map((weekDay) => {
        return (
          <div
            className="text-xs font-semibold text-gray-600 dark:text-gray-200 "
            key={weekDay}
          >
            {weekDay.slice(0, 2)}
          </div>
        );
      })}
      {cells.map((cell) => {
        return (
          <button
            type={"button"}
            key={formatDate(cell.day, "do dd MMMM yyyy HH:mm")}
            onClick={() => handleDayClick(cell.day)}
            className={clsx(
              "text-center font-medium text-xs rounded-full",
              cell.currentMonth
                ? "text-gray-800 dark:text-gray-200"
                : "text-gray-400 dark:text-gray-500",
              isSameDay(date, cell.day) && cell.currentMonth && "bg-gray-300",
            )}
          >
            {formatDate(cell.day, "d")}
            {cell.currentMonth && dayEvent.length > 1 ? (
              <div className="flex flex-col justify-center items-center">
                {/*<EventListDialog events={dayEvent} date={day}>*/}
                <EventBullet color={dayEvent[0].color} />
                <span className="text-[0.6rem] text-gray-800 dark:text-gray-200 ">
                  +{dayEvent.length - 1}
                </span>
                {/*</EventListDialog>*/}
              </div>
            ) : (
              cell.currentMonth &&
              dayEvent.length > 0 && (
                <div className="flex flex-col justify-center items-center">
                  {/*<EventDetailsDialog event={dayEvent[0]}>*/}
                  <EventBullet color={dayEvent[0].color} />
                  {/*</EventDetailsDialog>*/}
                </div>
              )
            )}
          </button>
        );
      })}
    </div>
  );
}
