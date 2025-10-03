import { isToday } from "date-fns";
import TimeCells from "@/Components/WeeKDayViewCommonComponents/time-cell.tsx";
import TimeLine from "@/Components/WeeKDayViewCommonComponents/time-line.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { daysOfWeek } from "@/dateHelpers.ts";

export default function WeekTimeCells() {
	const { date } = useCalendar();
	const weekDays = daysOfWeek(date);
	return (
		<div className="relative flex-1 border-l">
			<div className="grid grid-cols-7 divide-x">
				{weekDays.map((day, dayIndex) => {
					return (
						<div key={dayIndex} className="relative">
							<TimeCells />
							{isToday(day) && <TimeLine />}
						</div>
					);
				})}
			</div>
		</div>
	);
}
