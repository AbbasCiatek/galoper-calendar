import { formatDate } from "date-fns";
import { useCalendar } from "@/context/calendar-context.tsx";

export default function TodayButton() {
	const { selectedDate, setSelectedDate } = useCalendar();
	const today = new Date();

	const handleClick = (selectedDate: Date) => {
		if (selectedDate !== today) {
			selectedDate = today;
			setSelectedDate(selectedDate);
		}
	};

	return (
		<button
			onClick={() => handleClick(selectedDate)}
			className="border text-center size-16 pt-1 rounded-lg cursor-pointer font-bold text-gray-900 dark:bg-gray-900 dark:text-white"
		>
			{formatDate(today, "MMM").toUpperCase()}
			<p className="pt-1.5 w-full h-9 bg-gray-900 rounded-b-lg pb-[2px] text-white dark:text-gray-900 dark:bg-white ">
				{today.getDate()}
			</p>
		</button>
	);
}
