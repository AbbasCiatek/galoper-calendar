import { useCalendar } from "@/context/calendar-context.tsx";
import { daysOfWeek } from "@/lib/date-helpers.ts";
import { isToday } from "date-fns";
import { TimeCells } from "../week-day-view-commons/time-cell";
import { TimeLine } from "../week-day-view-commons/time-line";

export function WeekTimeCells() {
  const { date } = useCalendar();
  const weekDays = daysOfWeek(date);
  return (
    <div className="relative flex-1 border-l">
      <div className="grid grid-cols-7 divide-x">
        {weekDays.map((day) => {
          return (
            <div key={day.toISOString()} className="relative">
              <TimeCells />
              {isToday(day) && <TimeLine />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
