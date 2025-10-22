import { useCalendar } from "@/context/calendar-context.tsx";
import { Date_Format } from "@/helpers";
import { formatDate } from "date-fns";

export function DayDisplay() {
  const { date } = useCalendar();
  return (
    <div className="flex-1 border-l pt-2 pb-1 px-2">
      <div className="flex flex-col items-start text-xs font-medium  ">
        <div className="flex items-center gap-2">
          <span className="leading-none ">
            {formatDate(date, Date_Format.shortWeekDay).toUpperCase()}
          </span>
          <span className=" leading-none font-bold">
            {formatDate(date, Date_Format.dayOfMonth)}
          </span>
        </div>
      </div>
    </div>
  );
}
