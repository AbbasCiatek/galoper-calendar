import { endOfMonth, startOfMonth } from "date-fns";
import DayCell from "@/Components/MonthViewComponents/day-cell.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import daysInMonth, {
	arrayOfDaysOfNextMonth,
	arrayOfDaysOfPrevMonth,
	calculateMonthEventPositions,
	getMonthCellEvents,
	numberOfDisplayedDaysOfNextMonth,
	numberOfDisplayedDaysOfPrevMonth,
} from "@/dateHelpers";
import useEventStore from "@/EventStore.ts";
import type { Event } from "@/types.ts";

export default function MonthViewContainer() {
	const { date } = useCalendar();
	const days = daysInMonth(date);
	const nextMonthDaysDisplayed = numberOfDisplayedDaysOfNextMonth(
		days.daysInMonth,
		days.indexOfFirstDay,
	);
	const daysNextMonthDisplayed = arrayOfDaysOfNextMonth(date);
	const daysPrevMonthDisplayed = arrayOfDaysOfPrevMonth(date);
	const prevMonthDaysDisplayed = numberOfDisplayedDaysOfPrevMonth(
		date,
		days.indexOfFirstDay,
	);

	const { getEventsByDateRange } = useEventStore();

	const allMonthEvents: Event[] = getEventsByDateRange(
		startOfMonth(date),
		endOfMonth(date),
	);

	const { eventPositions, occupiedPositions } = calculateMonthEventPositions(
		allMonthEvents,
		date,
	);

	return (
		<div className="grid grid-cols-7 w-full h-full">
			{/* Previous month trailing days */}
			{daysPrevMonthDisplayed.daysInMonth
				.splice(prevMonthDaysDisplayed)
				.map((day, index) => (
					<DayCell
						key={`before-${index}`}
						day={day}
						isFaded={true}
						isFirstCell={index === 0}
						eventsForDay={getMonthCellEvents(
							day,
							allMonthEvents,
							eventPositions,
						)}
						occupiedPositions={occupiedPositions}
					/>
				))}
			{/* Current month days */}
			{days.daysInMonth.map((day, index, array) => {
				//if the start of month is current month
				if (prevMonthDaysDisplayed === 0 && nextMonthDaysDisplayed !== 0)
					return (
						<DayCell
							key={`current-${index}`}
							day={day}
							isFaded={false}
							isFirstCell={index === 0}
							eventsForDay={getMonthCellEvents(
								day,
								allMonthEvents,
								eventPositions,
							)}
							occupiedPositions={occupiedPositions}
						/>
					);
				//if the end of month is current month
				else if (nextMonthDaysDisplayed === 0 && prevMonthDaysDisplayed !== 0)
					return (
						<DayCell
							key={`current-${index}`}
							day={day}
							isFaded={false}
							isLastCell={index === array.length - 1}
							eventsForDay={getMonthCellEvents(
								day,
								allMonthEvents,
								eventPositions,
							)}
							occupiedPositions={occupiedPositions}
						/>
					);
				//if the start and the end of month is current month
				else if (nextMonthDaysDisplayed === 0 && prevMonthDaysDisplayed === 0)
					return (
						<DayCell
							key={`current-${index}`}
							day={day}
							isFaded={false}
							isFirstCell={index === 0}
							isLastCell={index === array.length - 1}
							eventsForDay={getMonthCellEvents(
								day,
								allMonthEvents,
								eventPositions,
							)}
							occupiedPositions={occupiedPositions}
						/>
					);
				// if having a prevMonth days and nextMonth days
				else
					return (
						<DayCell
							key={`current-${index}`}
							day={day}
							isFaded={false}
							eventsForDay={getMonthCellEvents(
								day,
								allMonthEvents,
								eventPositions,
							)}
							occupiedPositions={occupiedPositions}
						/>
					);
			})}
			{/* Next month leading days */}
			{daysNextMonthDisplayed.daysInMonth
				.slice(0, nextMonthDaysDisplayed)
				.map((day, index, array) => {
					return (
						<DayCell
							key={`after-${index}`}
							day={day}
							isFaded={true}
							isLastCell={index === array.length - 1}
							eventsForDay={getMonthCellEvents(
								day,
								allMonthEvents,
								eventPositions,
							)}
							occupiedPositions={occupiedPositions}
						/>
					);
				})}
		</div>
	);
}
