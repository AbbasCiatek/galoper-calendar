import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/context/calendar-context.tsx";
import {
	DateAdderFunction,
	DateSubtracterFunction,
	rangeDisplayer,
} from "@/dateHelpers.ts";
import type { ViewTypes } from "@/types.ts";

export default function NavigationArrows() {
	const { view, date, setDate } = useCalendar();

	const handleLeftClick = (view: ViewTypes, date: Date) => {
		date = DateSubtracterFunction(view, date);
		setDate(date);
	};
	const handleRightClick = (view: ViewTypes, date: Date) => {
		date = DateAdderFunction(view, date);
		setDate(date);
	};
	return (
		<div>
			<Button
				variant="secondary"
				size="icon"
				className="size-8 cursor-pointer"
				onClick={() => {
					handleLeftClick(view, date);
				}}
			>
				<ChevronLeftIcon />
			</Button>
			<span className="text-gray-500">{rangeDisplayer(view, date)}</span>
			<Button
				variant="secondary"
				size="icon"
				className="size-8 cursor-pointer "
				onClick={() => {
					handleRightClick(view, date);
				}}
			>
				<ChevronRightIcon />
			</Button>
		</div>
	);
}
