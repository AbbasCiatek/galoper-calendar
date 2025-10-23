import { useCalendar } from "@/context/calendar-context.tsx";
import { DATE_FORMAT } from "@/helpers";
import { formatDate } from "date-fns";

export function DayDisplay() {
  const { date } = useCalendar();
  return (
    <div className="flex-1 border-l pt-2 pb-1 px-2">
      <div className="flex flex-col items-start text-xs font-medium  ">
        <div className="flex items-center gap-2">
          <span className="leading-none ">
            {formatDate(date, DATE_FORMAT.shortWeekDay).toUpperCase()}
          </span>
          <span className=" leading-none font-bold">
            {formatDate(date, DATE_FORMAT.dayOfMonth)}
          </span>
        </div>
      </div>
    </div>
  );
}
