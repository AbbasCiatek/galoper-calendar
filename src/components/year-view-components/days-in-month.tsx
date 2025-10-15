import { WeekDays } from "@/helpers.ts";
import { getCalendarCellsOfMonth } from "@/lib/date-helpers.ts";
import { clsx } from "clsx";
import { formatDate } from "date-fns";

export function DaysInMonth({ month }: { month: Date }) {
  // option to path if week start at monday or sunday bool (if needed)
  const daysObject = getCalendarCellsOfMonth(month, true);

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
      {daysObject.map((objectDay) => {
        return (
          <div
            key={formatDate(objectDay.day, "do dd MMMM yyyy HH:mm")}
            className={clsx(
              "gap-1 p-1  text-center font-medium",
              objectDay.currentMonth
                ? "text-gray-800 dark:text-gray-200"
                : "text-gray-400 dark:text-gray-500",
            )}
          >
            {formatDate(objectDay.day, "d")}
          </div>
        );
      })}
    </div>
  );
}
