import { useCalendar } from "@/context/calendar-context.tsx";
import { getCalendarCellsOfMonth } from "@/lib/date-helpers.ts";
import { clsx } from "clsx";
import { formatDate, isMonday, isToday } from "date-fns";
import { useMemo } from "react";

export function MonthViewContainer() {
  const { date } = useCalendar();
  //for re-rendering only on year or month change
  const monthDate = new Date(date.getFullYear(), date.getMonth(), 1);

  const cells = useMemo(
    () => getCalendarCellsOfMonth(monthDate, true),
    [monthDate],
  );

  return (
    <div className="grid grid-cols-7 w-full h-full">
      {cells.map((cell) => {
        return (
          <div
            key={formatDate(cell.day, "do dd MMMM yyyy HH:mm")}
            className={clsx(
              "h-32 gap-1 border-l border-t",
              isMonday(cell.day) && "border-l-0",
              cell.currentMonth
                ? "text-gray-800 dark:text-gray-200"
                : "text-gray-400 dark:text-gray-500",
            )}
          >
            <div
              className={clsx(
                "h-6 px-1 text-xs font-semibold lg:px-2 ",
                cell.currentMonth &&
                  isToday(cell.day) &&
                  "flex w-6 translate-x-1 items-center justify-center rounded-full " +
                    "bg-gray-900 text-gray-200 dark:bg-gray-200 dark:text-gray-900 px-0 font-bold ",
              )}
            >
              {" "}
              {formatDate(cell.day, "d")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
