import MonthNameDisplayer from "@/components/year-view-components/month-name-displayer.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { formatDate } from "date-fns";
import { getArrayMonth } from "@/lib/date-helpers.ts";

export default function MonthContainers() {
  const { date } = useCalendar();
  const months = getArrayMonth(date);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
      {months.map((month) => (
        <MonthNameDisplayer key={formatDate(month, "MMM")} month={month} />
      ))}
    </div>
  );
}
