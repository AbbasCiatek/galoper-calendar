import { useCalendar } from "@/context/calendar-context.tsx";
import { formatDate } from "date-fns";

export function monthNameDisplayer({ month }: { month: Date }) {
  const formattedMonth = formatDate(month, "MMMM");

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
      className="text-[16px] font-semibold text-gray-800 dark:text-gray-200  text-center px-20 py-2 border-b cursor-pointer hover:bg-gray-100"
    >
      {formattedMonth}
    </button>
  );
}
