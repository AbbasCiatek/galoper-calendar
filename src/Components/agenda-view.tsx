import {
	endOfDay,
	endOfMonth,
	formatDate,
	isSameDay,
	isSameMonth,
	startOfDay,
	startOfMonth,
} from "date-fns";
import { CalendarX2 } from "lucide-react";
import { useMemo } from "react";
import { AgendaDayGroup } from "@/Components/AgendaViewComponents/agenda-day-group.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import useEventStore from "@/EventStore.ts";
import type { Event } from "@/types.ts";
export default function AgendaView() {
	const { date } = useCalendar();
	const { getEventsByDateRange } = useEventStore();

	const events: Event[] = getEventsByDateRange(
		startOfMonth(date),
		endOfMonth(date),
	);

	const singleDayEvents = events.filter((event: Event) =>
		isSameDay(new Date(event.startDate), new Date(event.endDate)),
	);
	const multiDayEvents = events.filter(
		(event: Event) =>
			!isSameDay(new Date(event.startDate), new Date(event.endDate)),
	);
	//getting the events by date making a map for them with the key as date string for each day in the range
	const eventsByDay = useMemo(() => {
		const allDates = new Map<
			string,
			{ date: Date; events: Event[]; multiDayEvents: Event[] }
		>();

		singleDayEvents.forEach((event) => {
			const eventDate = new Date(event.startDate);
			if (!isSameMonth(eventDate, date)) return;

			const dateKey = formatDate(eventDate, "yyyy-MM-dd");

			if (!allDates.has(dateKey)) {
				allDates.set(dateKey, {
					date: startOfDay(eventDate),
					events: [],
					multiDayEvents: [],
				});
			}

			allDates.get(dateKey)?.events.push(event);
		});

		multiDayEvents.forEach((event) => {
			const eventStart = new Date(event.startDate);
			const eventEnd = new Date(event.endDate);

			let currentDate = startOfDay(eventStart);
			const lastDate = endOfDay(eventEnd);

			while (currentDate <= lastDate) {
				if (isSameMonth(currentDate, date)) {
					const dateKey = formatDate(currentDate, "yyyy-MM-dd");

					if (!allDates.has(dateKey)) {
						allDates.set(dateKey, {
							date: new Date(currentDate),
							events: [],
							multiDayEvents: [],
						});
					}

					allDates.get(dateKey)?.multiDayEvents.push(event);
				}
				currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
			}
		});

		return Array.from(allDates.values()).sort(
			(a, b) => a.date.getTime() - b.date.getTime(),
		);
	}, [singleDayEvents, multiDayEvents, date]);

	const hasEvents = events.length > 0;
	return (
		// <div className="mx-auto  max-w-screen-2xl  gap-4 px-8 py-4">
		// <div className="overflow-hidden rounded-xl border mx-auto"> these must be wrapped by the calendar provider
		<div className="h-[800px] border border-t-0 rounded-b-2xl ">
			<ScrollArea className="h-full" type="always">
				{hasEvents &&
					eventsByDay.map((dayGroup) => (
						<AgendaDayGroup
							key={formatDate(dayGroup.date, "yyyy-MM-dd")}
							date={dayGroup.date}
							events={dayGroup.events}
							multiDayEvents={dayGroup.multiDayEvents}
						/>
					))}
				{!hasEvents && (
					<div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
						<CalendarX2 className="size-10" />
						<p className="text-sm md:text-base">No events scheduled</p>
					</div>
				)}
			</ScrollArea>
		</div>
		// </div>
		// </div>
	);
}
