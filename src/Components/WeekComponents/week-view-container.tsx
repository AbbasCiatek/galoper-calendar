import HoursColumn from "@/Components/WeeKDayViewCommonComponents/hours-column.tsx";
import WeekTimeCells from "@/Components/WeekComponents/week-time-cells.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

export default function WeekViewContainer() {
	return (
		<ScrollArea className="h-[500px] md:h-[800px] ">
			<div className="flex overflow-hidden">
				<HoursColumn />
				<WeekTimeCells />
			</div>
		</ScrollArea>
	);
}
