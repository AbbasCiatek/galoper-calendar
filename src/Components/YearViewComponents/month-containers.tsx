import { useCalendar } from "@/context/calendar-context.tsx";
import getArrayMonth from "@/Functions/getArrayMonth.ts";

export default function MonthContainers() {
	const { date } = useCalendar();
	const months = getArrayMonth(date);
	console.log(months);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 "></div>
	);
}
