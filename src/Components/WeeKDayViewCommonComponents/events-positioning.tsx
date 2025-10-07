import EventBlock from "@/Components/WeeKDayViewCommonComponents/event-block.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { positionEventsWeekDayView } from "@/dateHelpers.ts";
import { colorMap } from "@/helpers.ts";
import type { Event } from "@/types.ts";

type Props = {
	singleDayEvents: Event[];
};

export default function EventsPositioning({ singleDayEvents }: Props) {
	const { date } = useCalendar();

	const positioning = positionEventsWeekDayView(singleDayEvents, date);

	return (
		<>
			{positioning.map((p) => {
				const styles = colorMap[p.event.color];
				return (
					<div
						role="button"
						tabIndex={0}
						key={p.event.id}
						className={`border-2 rounded-lg ${styles} text-xs  absolute overflow-hidden`}
						style={{
							top: `${p.top}px`,
							height: `${p.height}px`,
							left: `${p.left}%`,
							width: `${p.width}%`,
						}}
					>
						<EventBlock event={p.event} height={p.height} />
					</div>
				);
			})}
		</>
	);
}
