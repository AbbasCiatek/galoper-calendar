import { DATE_FORMAT } from "@/constants";
import { useCalendar } from "@/context/calendar-context.tsx";
import { formatDate } from "date-fns";

export function MonthNameDisplayer({ month }: { month: Date }) {
  const { setDate, setView } = useCalendar();

  return (
    <button
      type="button"
      onClick={() => {
        setDate(month);
        setView("month");
      }}
      className="text-sm font-semibold h-9 rounded-t-2xl text-gray-800 dark:text-gray-200 text-center border-b cursor-pointer hover:bg-gray-100"
    >
      {formatDate(month, DATE_FORMAT.longMonth)}
    </button>
  );
}
