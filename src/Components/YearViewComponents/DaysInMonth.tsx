import { WeekDays } from "@/helpers.ts";
import { daysInMonth } from "@/lib/date-helpers";
import { clsx } from "clsx";
import { formatDate, isToday } from "date-fns";

export default function DaysInMonth({ month }: { month: Date }) {
  const days = daysInMonth(month);
  const firstDayIndex = days.firstDayIndex;
  const handleDayClicked = (day: Date) => {
    alert(day);
    //must navigate to the day in the dayView
  };
  return (
    <div className="border rounded-b-2xl grid grid-cols-7 gap-5  p-2 shadow-xl">
      {WeekDays.map((day) => {
        return (
          <div
            className=" pb-4 font-medium text-sm text-muted-foreground gap-2  "
            key={day}
          >
            {day}
          </div>
        );
      })}
      {Array.from({ length: firstDayIndex - 1 }).map((_, index) => {
        return <div key={index} />;
      })}
      {days.daysInMonth.map((day, index) => {
        return (
          <div
            className={clsx(
              "cursor-pointer hover:inset-shadow-sm text-center text-xs font-bold  rounded-sm",
              isToday(day)
                ? "bg-black text-white "
                : " hover:inset-shadow-gray-500 hover:bg-gray-200",
            )}
            key={index}
            onClick={() => handleDayClicked(day)}
          >
            {formatDate(day, "d")}
          </div>
        );
      })}
    </div>
  );
}
