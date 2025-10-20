import { useCalendar } from "@/context/calendar-context.tsx";
import { daysOfWeek } from "@/dateHelpers.ts";
import { clsx } from "clsx";
import { formatDate } from "date-fns";

export function WeekDaysDisplay() {
  const { date } = useCalendar();
  const weekDays = daysOfWeek(date);

  return (
    <div className="grid flex-1 grid-cols-7 ">
      {weekDays.map((day, index) => (
        <div
          key={day.toISOString()}
          className={clsx("flex-1 pt-2 pb-1 px-2", index === 0 && "border-l")}
        >
          <div className="flex flex-col items-center text-xs font-medium  ">
            <div className="flex items-center gap-2">
              <span className="leading-none ">
                {formatDate(day, "EE").toUpperCase()}
              </span>
              <span className=" leading-none font-bold">
                {formatDate(day, "d")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
