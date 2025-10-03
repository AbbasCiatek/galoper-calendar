import { clsx } from "clsx";
import { useCalendar } from "@/context/calendar-context.tsx";

export default function CalendarHeader() {
	const { view } = useCalendar();
	return (
		<div
			className={clsx(
				"flex items-center border p-5 rounded-t-2xl",
				view === "month" && "border-b-0",
			)}
		/>
	);
}
