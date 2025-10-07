import DayDisplay from "@/Components/DayViewComponents/day-display.tsx";
import DayViewContainer from "@/Components/DayViewComponents/day-view-container.tsx";
import DateDisplayLayout from "@/Components/WeeKDayViewCommonComponents/date-display-layout.tsx";

export default function DayView() {
	return (
		<div className="flex flex-col border border-b-0 rounded-b-2xl ">
			<div>
				<DateDisplayLayout>
					<DayDisplay />
				</DateDisplayLayout>
			</div>
			<DayViewContainer />
		</div>
	);
}
