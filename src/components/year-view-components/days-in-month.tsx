import { DATE_FORMAT, WEEK_DAYS } from "@/constants";
import { useCalendar } from "@/context/calendar-context";
import { getCalendarCellsOfMonth } from "@/lib/date-helpers.ts";
import { clsx } from "clsx";
import { formatDate, isSameDay } from "date-fns";

export function DaysInMonth({ month }: { month: Date }) {
  const { date, setDate } = useCalendar();
  // option to path if week start at monday or sunday bool (if needed)
  const cells = getCalendarCellsOfMonth(month, true);

  return (
    <div className="grid grid-cols-7 gap-6 p-4">
      {WEEK_DAYS.map((weekDay) => {
        return (
          <div
            className="text-xs font-semibold capitalize text-gray-600 dark:text-gray-200 "
            key={weekDay}
          >
            {weekDay.toLowerCase().slice(0, 2)}
          </div>
        );
      })}
      {cells.map((cell) => {
        return (
          <button
            type={"button"}
            key={formatDate(cell.day, DATE_FORMAT.fullDate)}
            onClick={() => setDate(cell.day)}
            className={clsx("text-center font-medium text-xs rounded-full", {
              "text-gray-800 dark:text-gray-200": cell.currentMonth,
              "text-gray-400 dark:text-gray-500": !cell.currentMonth,
              "bg-gray-300": isSameDay(date, cell.day) && cell.currentMonth,
            })}
          >
            {formatDate(cell.day, DATE_FORMAT.dayOfMonth)}
          </button>
        );
      })}
    </div>
  );
}
