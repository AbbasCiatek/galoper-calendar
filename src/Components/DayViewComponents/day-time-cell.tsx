import { isToday } from "date-fns";
import TimeCell from "@/Components/WeeKDayViewCommonComponents/time-cell.tsx";
import TimeLine from "@/Components/WeeKDayViewCommonComponents/time-line.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";

export default function DayTimeCell() {
	const { date } = useCalendar();

	return (
		<div className="relative flex-1 border-l bg-white">
			<TimeCell />
			{isToday(date) && <TimeLine />}
		</div>
	);
}
