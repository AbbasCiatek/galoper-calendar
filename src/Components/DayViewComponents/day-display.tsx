import { formatDate } from "date-fns";
import { useCalendar } from "@/context/calendar-context.tsx";

export default function DayDisplay() {
	const { date } = useCalendar();
	//"text-blue-500" : "text-muted-foreground"
	return (
		<div className="flex-1 border-l pt-2 pb-1 px-2">
			<div className="flex flex-col items-start text-xs font-medium  ">
				<div className="flex items-center gap-2">
					<span className="leading-none ">
						{formatDate(date, "EE").toUpperCase()}
					</span>
					<span className=" leading-none font-bold">
						{formatDate(date, "d")}
					</span>
				</div>
			</div>
		</div>
	);
}
