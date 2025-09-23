import {
    areIntervalsOverlapping,
    differenceInMinutes,
    eachDayOfInterval,
    endOfWeek,
    intervalToDuration,
    startOfWeek
} from "date-fns";
import type {Event} from '@/types.ts'

export function daysOfWeek(date:Date) {
         return eachDayOfInterval(
        {
            start:startOfWeek(date,{weekStartsOn:1}),
            end:endOfWeek(date,{weekStartsOn:1}),
        });
}

type PositionedEvent = {
    event: Event;
    top: number;     // % from top of day
    height: number;  // % of the day
    left: number;    // % from left
    width: number;   // % of the container
}


export function clipEvent(event:Event , date:Date) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

        const start = event.startDate;
        const end = event.endDate;

        const clippedStart = start < dayStart ? dayStart : start;
        const clippedEnd = end > dayEnd ? dayEnd : end;

        const startMinutes = differenceInMinutes(clippedStart, dayStart);
        const durationMinutes = differenceInMinutes(clippedEnd, clippedStart);
        return { event, start: clippedStart, end: clippedEnd, startMinutes, durationMinutes };
    }
export function positionEventsWeekDayView  (events:Event[], day:Date ) {
    const clippedEvents= events.map((event:Event) => {
        return  clipEvent(event, day);
    })
    clippedEvents.sort((a, b) => a.start.getTime() - b.start.getTime());
    const placed: PositionedEvent[] = [];
    clippedEvents.forEach(currentEvent => {
        const equalOverlapping = clippedEvents.filter(otherEvent =>
            otherEvent !== currentEvent &&
            areIntervalsOverlapping(
                {start:currentEvent.start, end:currentEvent.end},
                {start:otherEvent.start, end:otherEvent.end},
            )
            &&
            otherEvent.start === currentEvent.start
            && otherEvent.end === currentEvent.end
        )
        const unequalOverlapping = clippedEvents.filter(otherEvent =>
            otherEvent !== currentEvent &&
            areIntervalsOverlapping(
                {start:currentEvent.start, end:currentEvent.end},
                {start:otherEvent.start, end:otherEvent.end},
            )
            &&
            intervalToDuration({start:currentEvent.start, end:currentEvent.end}) >=intervalToDuration({start:otherEvent.start, end:otherEvent.end})
        )

        const overlapCount = equalOverlapping.length+unequalOverlapping.length+1;
        const width = 100 / overlapCount;
        let columnIndex = 0;
        while (
            placed.some(p =>
                areIntervalsOverlapping({ start: currentEvent.start, end: currentEvent.end }, { start:p.event.startDate, end:p.event.endDate }) &&
                p.left === columnIndex * width &&
                p.event.startDate.getTime() === currentEvent.start.getTime() &&
                p.event.endDate.getTime() === currentEvent.end.getTime()
            )
            ){
            columnIndex++;
        }

        const top = (currentEvent.startMinutes / 1440) * 100;
        const height = (currentEvent.durationMinutes / 1440) * 100;
        const left = columnIndex * width;

        placed.push({ event: currentEvent.event, top, height, left, width });
    });

    return placed;
}

