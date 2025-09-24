import EventsPositioning from "@/Components/WeeKDayViewCommonComponents/EventsPositioning.tsx";
import useEventStore from "@/EventStore.ts";
import type {Events} from "@/types.ts";
import {endOfDay, startOfDay} from "date-fns";

export default function EventPerDay({day}:{day:Date}){
    const {getSingleDayEvents} = useEventStore();


    const events:Events = getSingleDayEvents(startOfDay(day),endOfDay(day));

    //the date is saved in store as Date and got as string .. need to cast it date object
    const singleDayEvents=events.map(e => ({
        ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate),
    }));
    return (
        <>
            {singleDayEvents.length>0 && <EventsPositioning singleDayEvents={singleDayEvents} day={day}/>}
        </>
    )
}