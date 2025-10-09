import { useCalendar } from "@/context/calendar-context.tsx";
import { formatDate } from "date-fns";

export default function TodayButton() {
  const { date, setDate } = useCalendar();
  const today = new Date();

  const handleClick = (date: Date) => {
    if (date !== today) {
      setDate(today);
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleClick(date)}
      className="border text-center size-16 pt-1 rounded-lg cursor-pointer font-bold text-gray-900 dark:bg-gray-900 dark:text-white"
    >
      {formatDate(today, "MMM").toUpperCase()}
      <p className="pt-1.5 w-full h-9 bg-gray-900 rounded-b-lg pb-[2px] text-white dark:text-gray-900 dark:bg-white ">
        {today.getDate()}
      </p>
    </button>
  );
}
