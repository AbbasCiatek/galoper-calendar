import type {Event} from "@/types.ts"
import {
    addMonths,
    differenceInDays,
    eachDayOfInterval,
    endOfMonth,
    getDay,
    isSameDay,
    startOfDay,
    startOfMonth,
    subMonths
} from "date-fns";

export default function daysInMonth(date: Date){
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    //the Start of the week is Monday
    const indexOfDays =((getDay(firstDayOfMonth)+6)%7);
    const daysInMonth = eachDayOfInterval({
        start:firstDayOfMonth,
        end:lastDayOfMonth,
    })

    return {daysInMonth,indexOfDays};
}

export function  numberOfDisplayedDaysOfNextMonth(daysOfCurrentMonth:Date[],indexOfCurrentMonthInWeekdays:number) {
    const lengthOfCurrentMonth = daysOfCurrentMonth.length;
    if( lengthOfCurrentMonth+ indexOfCurrentMonthInWeekdays > 35 )
        return  42 - lengthOfCurrentMonth-indexOfCurrentMonthInWeekdays;
        return 35 - lengthOfCurrentMonth - indexOfCurrentMonthInWeekdays;
}


export function arrayOfDaysOfNextMonth(date:Date) {
    const nextMonth =addMonths(date,1);
    console.log(nextMonth);
    return  daysInMonth(nextMonth);
}
export function arrayOfDaysOfPrevMonth(date: Date) {
	const prevMonth = subMonths(date, 1);
	return daysInMonth(prevMonth);
}

export function numberOfDisplayedDaysOfPrevMonth(currentDate:Date,indexOfCurrentMonthInWeekdays:number) {
    return arrayOfDaysOfPrevMonth(currentDate).daysInMonth.length - indexOfCurrentMonthInWeekdays;
}


export function calculateMonthEventPositions(events:Event[], selectedDate: Date) {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);

    const eventPositions: { [key: string]: number } = {};
    const occupiedPositions: { [key: string]: boolean[] } = {};

    eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach(day => {
        occupiedPositions[day.toISOString()] = [false, false, false];
    });

    const sortedEvents = [
        ...multiDayEvents.sort((a, b) => {
            const aDuration = differenceInDays(new Date(a.endDate), new Date(a.startDate));
            const bDuration = differenceInDays(new Date(b.endDate), new Date(b.startDate));
            return bDuration - aDuration || new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        }),
        ...singleDayEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
    ];

    sortedEvents.forEach(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        const eventDays = eachDayOfInterval({
            start: eventStart < monthStart ? monthStart : eventStart,
            end: eventEnd > monthEnd ? monthEnd : eventEnd,
        });

        let position = -1;

        for (let i = 0; i < 3; i++) {
            if (
                eventDays.every(day => {
                    const dayPositions = occupiedPositions[startOfDay(day).toISOString()];
                    return dayPositions && !dayPositions[i];
                })
            ) {
                position = i;
                break;
            }
        }

        if (position !== -1) {
            eventDays.forEach(day => {
                const dayKey = startOfDay(day).toISOString();
                occupiedPositions[dayKey][position] = true;
            });
            eventPositions[event.id] = position;
        }
    });

    return eventPositions;
}

export function getMonthCellEvents(date: Date, events: Event[], eventPositions: Record<string, number>) {
    const eventsForDate = events.filter(event => {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        return (date >= eventStart && date <= eventEnd) || isSameDay(date, eventStart) || isSameDay(date, eventEnd);
    });

    return eventsForDate
        .map(event => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);
            const isMultiDay = !isSameDay(eventStart, eventEnd);
            const isFirstDay = isSameDay(date, eventStart);
            const isLastDay = isSameDay(date, eventEnd);

            return {
                ...event,
                position: eventPositions[event.id]  ?? -1,
                isMultiDay,
                isFirstDay,
                isLastDay,
            };
        })
        .sort((a, b) => {
            if (a.isMultiDay && !b.isMultiDay) return -1;
            if (!a.isMultiDay && b.isMultiDay) return 1;

            const posA = a.position === -1 ? 3 : a.position;
            const posB = b.position === -1 ? 3 : b.position;
            return posA - posB;
        });
}