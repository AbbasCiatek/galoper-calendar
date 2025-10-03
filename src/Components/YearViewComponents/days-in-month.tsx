import { clsx } from "clsx";
import {
	endOfMonth,
	formatDate,
	isSameDay,
	isToday,
	startOfMonth,
} from "date-fns";
import { EventBullet } from "@/Components/Events/EventBullet.tsx";
import { daysInMonth } from "@/dateHelpers.ts";
import useEventStore from "@/EventStore.ts";
import { WeekDays } from "@/helpers.ts";
import type { Event } from "@/types.ts";

export default function DaysInMonth({ month }: { month: Date }) {
	const { getEventsByDateRange } = useEventStore();
	const monthlyEvents: Event[] = getEventsByDateRange(
		startOfMonth(month),
		endOfMonth(month),
	);
	const days = daysInMonth(month);
	const firstDayIndex = days.firstDayIndex;

	return (
		<div className="border rounded-b-2xl grid grid-cols-7 gap-6 m-3 p-4 shadow-xl">
			{WeekDays.map((day) => {
				return (
					<div
						className=" pb-4 font-medium text-sm text-muted-foreground gap-2  "
						key={day}
					>
						{day}
					</div>
				);
			})}
			{Array.from({ length: firstDayIndex - 1 }).map((_, index) => {
				return <div key={index} />;
			})}
			{days.daysInMonth.map((day, index) => {
				const dayEvent = monthlyEvents.filter((event: Event) =>
					isSameDay(new Date(event.startDate), day),
				);
				return (
					<div key={`b${index}`}>
						<div
							className={clsx(
								" text-center text-xs font-bold",
								isToday(day) &&
									"rounded-full bg-primary text-primary-foreground",
							)}
						>
							{formatDate(day, "d")}
						</div>
						{dayEvent.length > 1 ? (
							<div className="flex flex-col justify-center items-center">
								{/*<EventListDialog events={dayEvent} date={day}>*/}
								<EventBullet color={dayEvent[0].color} />
								<span className="text-[0.6rem]">+{dayEvent.length - 1}</span>
								{/*</EventListDialog>*/}
							</div>
						) : (
							dayEvent.length > 0 && (
								<div className="flex flex-col justify-center items-center">
									{/*<EventDetailsDialog event={dayEvent[0]}>*/}
									<EventBullet color={dayEvent[0].color} />
									{/*</EventDetailsDialog>*/}
								</div>
							)
						)}
					</div>
				);
			})}
		</div>
	);
}
