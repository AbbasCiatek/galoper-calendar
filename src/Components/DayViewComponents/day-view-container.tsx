import DayTimeCell from "@/Components/DayViewComponents/day-time-cell.tsx";
import HoursColumn from "@/Components/WeeKDayViewCommonComponents/hours-column.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export default function DayViewContainer() {
	return (
		<ScrollArea className="h-[500px] md:h-[800px] border-b rounded-b-2xl">
			<div className="flex overflow-hidden">
				<HoursColumn />
				<DayTimeCell />
			</div>
		</ScrollArea>
	);
}
