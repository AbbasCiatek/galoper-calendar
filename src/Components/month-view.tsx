import MonthViewContainer from "@/Components/MonthViewComponents/month-view-container.tsx";

export default function MonthView() {
	return (
		<div className="shadow-lg">
			<div className="grid grid-cols-7 text-xl">
				<MonthViewContainer />
			</div>
		</div>
	);
}
