import { clsx } from "clsx";
import { formatDate } from "date-fns";
import { Clock, Text } from "lucide-react";
import { colorMap } from "@/helpers.ts";
import type { Event } from "@/types.ts";

export default function AgendaEventCard({
	event,
	eventCurrentDay,
	eventTotalDays,
}: {
	event: Event;
	eventCurrentDay?: number;
	eventTotalDays?: number;
}) {
	const startDate = new Date(event.startDate);
	const endDate = new Date(event.endDate);

	const agendaEventCardClasses = colorMap[event.color];

	return (
		// <EventDetailsDialog event={event}>
		<div
			role="button"
			tabIndex={0}
			className={clsx("p-2 m-2", agendaEventCardClasses)}
		>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-1.5">
					<p className="font-medium">
						{eventCurrentDay && eventTotalDays && (
							<span className="mr-1 text-xs">
								Day {eventCurrentDay} of {eventTotalDays} •{" "}
							</span>
						)}
						{event.title}
					</p>
				</div>

				<div className="flex items-center gap-1">
					<Clock className="size-3 shrink-0" />
					<p className="text-xs ">
						{formatDate(startDate, "h:mm a")} - {formatDate(endDate, "h:mm a")}
					</p>
				</div>

				<div className="flex items-center gap-1">
					<Text className="size-3 shrink-0" />
					<p className="text-xs ">{event.description}</p>
				</div>
			</div>
		</div>
		// </EventDetailsDialog>
	);
}
