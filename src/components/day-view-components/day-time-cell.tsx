import { TimeCells } from "@/components/week-day-view-commons/time-cell.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { isToday } from "date-fns";
import { TimeLine } from "../week-day-view-commons/time-line";

export function DayTimeCell() {
  const { date } = useCalendar();

  return (
    <div className="relative flex-1 border-l bg-white">
      <TimeCells />
      {isToday(date) && <TimeLine />}
    </div>
  );
}
