import { WeekDays } from "@/helpers.ts";
import {
  arrayOfDaysOfNextMonth,
  arrayOfDaysOfPrevMonth,
  daysInMonth,
  numberOfDisplayedDaysOfNextMonth,
  numberOfDisplayedDaysOfPrevMonth,
} from "@/lib/date-helpers.ts";
import { formatDate } from "date-fns";

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
        return (
          <div
            key={formatDate(day, "dd MMM")}
            className=" gap-1 p-1  text-center text-xs font-medium text-gray-800 dark:text-gray-200 rounded-full"
          >
            {formatDate(day, "d")}
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
