import { endOfDay, isToday, startOfDay } from "date-fns";
import EventsPositioning from "@/Components/WeeKDayViewCommonComponents/events-positioning.tsx";
import TimeCell from "@/Components/WeeKDayViewCommonComponents/time-cell.tsx";
import TimeLine from "@/Components/WeeKDayViewCommonComponents/time-line.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import useEventStore from "@/EventStore.ts";
import type { Event } from "@/types.ts";

export default function DayTimeCell() {
	const { date } = useCalendar();
	const { getSingleDayEvents } = useEventStore();

	const events: Event[] = getSingleDayEvents(startOfDay(date), endOfDay(date));

	const singleDayEvents = events.map((e) => ({
		...e,
		startDate: new Date(e.startDate),
		endDate: new Date(e.endDate),
	}));

	return (
		<div className="relative flex-1 border-l bg-white">
			<TimeCell />
			{singleDayEvents.length > 0 && (
				<EventsPositioning singleDayEvents={singleDayEvents} date={date} />
			)}
			{isToday(date) && <TimeLine />}
		</div>
	);
}
