import { formatDate } from "date-fns";
import { useCalendar } from "@/context/calendar-context.tsx";

export default function monthNameDisplayer({ month }: { month: Date }) {
	const formattedMonth = formatDate(month, "MMMM");

	const { setDate, setView } = useCalendar();

	const handleMonthClick = (month: Date) => {
		setView("month");
		setDate(month);
	};
	return (
		<div
			onClick={() => {
				handleMonthClick(month);
			}}
			className="text-3xl font-bold text-center px-20 py-2 border-2 cursor-pointer  rounded-t-lg hover:bg-gray-200"
		>
			{formattedMonth}
		</div>
	);
}
