import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";

export default function MonthYearDisplay() {
	const { date, view } = useCalendar();

	//const eventCounter = getEventNumber(view,date,events);
	const eventCounter = 10;

	return (
		<div className="flex flex-row">
			<p className="font-extrabold text-2xl pb-1">
				{formatDate(date, "MMMM yyyy")}
			</p>
			<div className="mx-1">
				<Badge variant="secondary" className="py-1 px-2">
					{eventCounter} events
				</Badge>
			</div>
		</div>
	);
}
