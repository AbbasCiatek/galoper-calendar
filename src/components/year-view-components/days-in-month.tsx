import { useCalendar } from "@/context/calendar-context";
import { Date_Format, WEEK_DAYS, lowerSliceWord } from "@/helpers.ts";
import { getCalendarCellsOfMonth } from "@/lib/date-helpers.ts";
import { clsx } from "clsx";
import { formatDate, isSameDay } from "date-fns";

export function DaysInMonth({ month }: { month: Date }) {
  const { date, setDate } = useCalendar();
  // option to path if week start at monday or sunday bool (if needed)
  const cells = getCalendarCellsOfMonth(month, true);

  const handleDayClick = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="grid grid-cols-7 gap-6 m-4">
      {WEEK_DAYS.map((weekDay) => {
        return (
          <div
            className="text-xs font-semibold text-gray-600 dark:text-gray-200 "
            key={weekDay}
          >
            {lowerSliceWord(weekDay, 2)}
          </div>
        );
      })}
      {cells.map((cell) => {
        return (
          <button
            type={"button"}
            key={formatDate(cell.day, Date_Format.fullDate)}
            onClick={() => handleDayClick(cell.day)}
            className={clsx(
              "text-center font-medium text-xs rounded-full",
              cell.currentMonth
                ? "text-gray-800 dark:text-gray-200"
                : "text-gray-400 dark:text-gray-500",
              isSameDay(date, cell.day) && cell.currentMonth && "bg-gray-300",
            )}
          >
            {formatDate(cell.day, Date_Format.dayOfMonth)}
          </button>
        );
      })}
    </div>
  );
}
