import { differenceInDays, formatDate, startOfDay } from "date-fns";
import AgendaEventCard from "@/Components/AgendaViewComponents/agenda-event-card.tsx";
import type { Event } from "@/types.ts";

interface Props {
	date: Date;
	events: Event[];
	multiDayEvents: Event[];
}

export function AgendaDayGroup({ date, events, multiDayEvents }: Props) {
	const sortedEvents = [...events].sort(
		(a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
	);

	return (
		<div className="space-y-4 px-1">
			<div className="sticky top-0 flex items-center gap-4 bg-background py-2">
				<p className="text-sm font-semibold">
					{formatDate(date, "EEEE, MMMM d, yyyy")}
				</p>
			</div>

			<div className="space-y-2">
				{multiDayEvents.length > 0 &&
					multiDayEvents.map((event) => {
						const eventStart = startOfDay(new Date(event.startDate));
						const eventEnd = startOfDay(new Date(event.endDate));
						const currentDate = startOfDay(date);

						const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
						const eventCurrentDay =
							differenceInDays(currentDate, eventStart) + 1;
						return (
							<AgendaEventCard
								key={event.id}
								event={event}
								eventCurrentDay={eventCurrentDay}
								eventTotalDays={eventTotalDays}
							/>
						);
					})}

				{sortedEvents.length > 0 &&
					sortedEvents.map((event) => (
						<AgendaEventCard key={event.id} event={event} />
					))}
			</div>
		</div>
	);
}
