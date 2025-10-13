import { useCalendar } from "@/context/calendar-context.tsx";
import { getCalendarCellsOfMonth } from "@/lib/date-helpers.ts";
import { clsx } from "clsx";
import { formatDate, isMonday, isToday } from "date-fns";

export default function MonthViewContainer() {
  const { date } = useCalendar();

  const daysObject = getCalendarCellsOfMonth(date, true);

  return (
    <div className="grid grid-cols-7 w-full h-full">
      {daysObject.map((objectDay) => {
        return (
          <div
            key={formatDate(objectDay.day, "do dd MMMM yyyy HH:mm")}
            className={clsx(
              "h-32 gap-1 border-l border-t",
              isMonday(objectDay.day) && "border-l-0",
              objectDay.currentMonth
                ? "text-gray-800 dark:text-gray-200"
                : "text-gray-400 dark:text-gray-500",
            )}
          >
            <div
              className={clsx(
                "h-6 px-1 text-xs font-semibold lg:px-2 ",
                objectDay.currentMonth &&
                  isToday(objectDay.day) &&
                  "flex w-6 translate-x-1 items-center justify-center rounded-full " +
                    "bg-gray-900 text-gray-200 dark:bg-gray-200 dark:text-gray-900 px-0 font-bold ",
              )}
            >
              {" "}
              {formatDate(objectDay.day, "d")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
