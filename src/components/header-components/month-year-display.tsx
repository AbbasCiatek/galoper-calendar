import { formatDate } from "date-fns";
import { useCalendar } from "@/context/calendar-context.tsx";

export default function MonthYearDisplay() {
  const { date } = useCalendar();

  return (
    <p className="font-extrabold text-2xl pb-1 ">
      {formatDate(date, "MMMM yyyy")}
    </p>
  );
}
