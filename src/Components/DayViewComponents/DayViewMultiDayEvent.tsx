import useEventStore from "@/EventStore.ts";
import {differenceInDays, endOfDay, isWithinInterval, startOfDay} from "date-fns";
import {MultiDayEventDisplay} from "@/Components/DayViewComponents/MultiDayEventDisplay.tsx";

export default function DayViewMultiDayEvent({date}:{date:Date}) {

    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);

    const {getMultipleDayEvents}= useEventStore();
    const multiDayEvents = getMultipleDayEvents(dayStart,dayEnd);


    const multiDayEventsInDay = multiDayEvents
        .filter(event => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);

            const isOverlapping =
                isWithinInterval(dayStart, { start: eventStart, end: eventEnd }) ||
                isWithinInterval(dayEnd, { start: eventStart, end: eventEnd }) ||
                (eventStart <= dayStart && eventEnd >= dayEnd);

            return isOverlapping;
        })
        .sort((a, b) => {
            const durationA = differenceInDays(new Date(a.endDate), new Date(a.startDate));
            const durationB = differenceInDays(new Date(b.endDate), new Date(b.startDate));
            return durationB - durationA;
        });

    if (multiDayEventsInDay.length === 0) return null;

    return (
        <div className="flex border-b">
            <div className="w-18"></div>
            <div className="flex flex-1 flex-col gap-1 border-l py-1">
                {multiDayEventsInDay.map(event => {
                    const eventStart = startOfDay(new Date(event.startDate));
                    const eventEnd = startOfDay(new Date(event.endDate));
                    const currentDate = startOfDay(date);

                    const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
                    const eventCurrentDay = differenceInDays(currentDate, eventStart) + 1;

                    return <MultiDayEventDisplay key={event.id} event={event} eventCurrentDay={eventCurrentDay} eventTotalDays={eventTotalDays} />;
                })}
            </div>
        </div>
    );
}