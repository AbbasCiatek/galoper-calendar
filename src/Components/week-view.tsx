import DateDisplayLayout from "@/Components/WeeKDayViewCommonComponents/date-display-layout.tsx";
import WeekDaysDisplay from "@/Components/WeekComponents/week-days-display.tsx";
import WeekViewContainer from "@/Components/WeekComponents/week-view-container.tsx";

export default function WeekView() {
	return (
		<>
			<div className="flex flex-col border rounded-b-2xl">
				<div>
					<DateDisplayLayout>
						<WeekDaysDisplay />
					</DateDisplayLayout>
				</div>
				<WeekViewContainer />
			</div>
		</>
	);
}
