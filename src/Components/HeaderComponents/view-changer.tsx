import { clsx } from "clsx";
import {
	CalendarDays,
	CalendarRange,
	ClipboardList,
	Columns4,
	Grid3x3,
} from "lucide-react";
import { useEffect } from "react";
import { useCalendar } from "@/context/calendar-context.tsx";
import type { ViewTypes } from "@/types.ts";

export default function ViewChanger() {
	const { view, setView } = useCalendar();
	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			switch (event.key) {
				case "a":
					handleViewClick("agenda");
					break;
				case "d":
					handleViewClick("day");
					break;
				case "w":
					handleViewClick("week");
					break;
				case "m":
					handleViewClick("month");
					break;
				case "y":
					handleViewClick("year");
					break;
			}
		};
		window.addEventListener("keyup", handleKey);
		return () => window.removeEventListener("keyup", handleKey);
	}, []);

	const handleViewClick = (view: ViewTypes) => {
		setView((prevView) => (prevView !== view ? view : prevView));
	};

	return (
		<div className="flex gap-4 text-sm font-semibold text-gray-500">
			<button
				className={clsx(
					"flex gap-2 active:scale-50 duration-500 ",
					view === "agenda" && "mx-2 text-gray-800 ",
				)}
				value="agenda"
			>
				<CalendarRange
					className="size-5"
					onClick={() => handleViewClick("agenda")}
				/>
				{view === "agenda" && <span> Agenda </span>}
			</button>
			<button
				className={clsx(
					"flex gap-2 active:scale-50 duration-500 ",
					view === "day" && "mx-2 text-gray-800",
				)}
				value="day"
			>
				<ClipboardList
					className="size-5 "
					onClick={() => handleViewClick("day")}
				/>
				{view === "day" && <span> Day </span>}
			</button>
			<button
				className={clsx(
					"flex gap-2 active:scale-50 duration-500 ",
					view === "week" && "mx-2 text-gray-800",
				)}
				value="week"
			>
				<Columns4 className="size-5 " onClick={() => handleViewClick("week")} />
				{view === "week" && <span> Week </span>}
			</button>
			<button
				className={clsx(
					"flex gap-2 active:scale-50 duration-500 ",
					view === "month" && "mx-2 text-gray-800",
				)}
				value="month"
			>
				<Grid3x3 className="size-5 " onClick={() => handleViewClick("month")} />
				{view === "month" && <span> Month </span>}
			</button>
			<button
				className={clsx(
					"flex gap-2 active:scale-50 duration-500 ",
					view === "year" && "mx-2 text-gray-800",
				)}
				value="year"
			>
				<CalendarDays
					className="size-5 "
					onClick={() => handleViewClick("year")}
				/>
				{view === "year" && <span> Year </span>}
			</button>
		</div>
	);
}
