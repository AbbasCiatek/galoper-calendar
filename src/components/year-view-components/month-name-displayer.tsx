import { useCalendar } from "@/context/calendar-context.tsx";
import { Date_Format } from "@/helpers";
import { formatDate } from "date-fns";

export function MonthNameDisplayer({ month }: { month: Date }) {
  const { setDate, setView } = useCalendar();

  const handleMonthClick = (month: Date) => {
    setView("month");
    setDate(month);
  };

  return (
    <button
      type="button"
      onClick={() => {
        handleMonthClick(month);
      }}
      className="text-sm font-semibold h-9 text-gray-800 dark:text-gray-200 text-center border-b cursor-pointer hover:bg-gray-100"
    >
      {formatDate(month, Date_Format.longMonth)}
    </button>
  );
}
