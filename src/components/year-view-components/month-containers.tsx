import MonthNameDisplayer from "@/components/year-view-components/month-name-displayer.tsx";
import DaysInMonth from "@/components/year-view-components/days-in-month.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { getArrayMonth } from "@/lib/date-helpers.ts";
import { formatDate } from "date-fns";

export default function MonthContainers() {
  const { date } = useCalendar();
  const months = getArrayMonth(date);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {months.map((month) => (< <div
        key={formatDate(month, "MMM")}
        className="flex flex-col border m-2 shadow-lg rounded-b-2xl "
        >
          <MonthNameDisplayer month={month} />
        <DaysInMonth month={month} />
      </div>

      ))}
    </div>
  );
}
