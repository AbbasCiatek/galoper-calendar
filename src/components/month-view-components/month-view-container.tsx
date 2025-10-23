import { useCalendar } from "@/context/calendar-context.tsx";
import { DATE_FORMAT } from "@/helpers";
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
            key={formatDate(cell.day, DATE_FORMAT.fullDate)}
            className={clsx("h-32 gap-1 border-l border-t", {
              "border-l-0": isMonday(cell.day),
              "text-gray-800 dark:text-gray-200": cell.currentMonth,
              "text-gray-400 dark:text-gray-500": !cell.currentMonth,
            })}
          >
            <div
              className={clsx("h-6 px-1 text-xs font-semibold lg:px-2 ", {
                "flex w-6 translate-x-1 items-center justify-center rounded-full bg-gray-900 text-gray-200 dark:bg-gray-200dark:text-gray-900 px-0 font-bold ":
                  cell.currentMonth && isToday(cell.day),
              })}
            >
              {" "}
              {formatDate(cell.day, DATE_FORMAT.dayOfMonth)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
