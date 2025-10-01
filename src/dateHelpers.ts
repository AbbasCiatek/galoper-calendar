import {type Event} from "@/types.ts"

export function isClipped(event:Event,date:Date){
    //no need to see if its clipped in both ways since will be a multiDayEvent
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    const clippedStart = start < dayStart;
    const clippedEnd =  end > dayEnd ;
    return {clippedStart, clippedEnd};
}