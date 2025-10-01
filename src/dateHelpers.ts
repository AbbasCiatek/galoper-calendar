import {
    areIntervalsOverlapping,
    differenceInMinutes,
    eachDayOfInterval,
    endOfWeek,
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
    const lengthOfEvents =clippedEvents.length
    clippedEvents.forEach((currentEvent,index) => {
        const overlapping = clippedEvents.filter(otherEvent =>
        otherEvent.start !== currentEvent.start &&
            areIntervalsOverlapping({
                start: currentEvent.start,
                end: currentEvent.end,
            },{
                start:otherEvent.start,
                end:otherEvent.end,
            })
        )
            //container pixels = numberOfHours(24) * PIXELS_PER_HOUR
        console.log( `event:${currentEvent.event.title} ? ${overlapping.length} overlapping`);
        const containerPx = 24*96;
        const overlapCount = overlapping.length +1;
        const width =lengthOfEvents<15 ? 100 / overlapCount :50 / overlapCount;
        const top = (currentEvent.startMinutes / 1440) * containerPx;
        const height = (currentEvent.durationMinutes / 1440) * containerPx;
        const left =overlapping.length ? (lengthOfEvents<15 ? 10*index : 20*index ):0 ;
        placed.push({ event: currentEvent.event, top, height, left, width });
    });

    return placed;
}

