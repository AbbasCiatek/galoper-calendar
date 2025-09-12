import MonthYearDisplay from "@/Components/HeaderComponents/month-year-display.tsx";
import NavigationArrows from "@/Components/HeaderComponents/navigation-arrows.tsx";

export default function CalendarHeader() {
	return (
		<div className="flex items-center border p-5 m-5 rounded-t-2xl">
			<div className="flex flex-col ">
				<MonthYearDisplay />
				<NavigationArrows />
			</div>
		</div>
	);
}
