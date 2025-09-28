import useEventStore from "@/EventStore.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";

import type {Event} from "@/types.ts"
import {CalendarX2} from "lucide-react";
import {useMemo} from "react";
import {endOfDay, formatDate, isSameDay, isSameMonth, startOfDay} from "date-fns";
import {AgendaDayGroup} from "@/Components/Agenda-View/AgendaDayGroup.tsx";
export default function AgendaView() {

    const selectedDate = new Date();//from hook
    const {getEventsByDateRange} = useEventStore();

    const events:Event[] = getEventsByDateRange(new Date(2025,8,0),new Date(2025,9,0));

    const singleDayEvents = events.filter((event: Event) =>
        isSameDay(new Date(event.startDate), new Date(event.endDate))
    )
    const multiDayEvents = events.filter((event: Event) =>
        !isSameDay(new Date(event.startDate), new Date(event.endDate))
    )
    //getting the events by date making a map for them with the key as date string for each day in the range
    const eventsByDay = useMemo(() => {
        const allDates = new Map<string, { date: Date; events: Event[]; multiDayEvents: Event[] }>();

        singleDayEvents.forEach(event => {
            const eventDate = new Date(event.startDate);
            if (!isSameMonth(eventDate, selectedDate)) return;

            const dateKey = formatDate(eventDate, "yyyy-MM-dd");

            if (!allDates.has(dateKey)) {
                allDates.set(dateKey, { date: startOfDay(eventDate), events: [], multiDayEvents: [] });
            }

            allDates.get(dateKey)?.events.push(event);
        });

        multiDayEvents.forEach(event => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);

            let currentDate = startOfDay(eventStart);
            const lastDate = endOfDay(eventEnd);

            while (currentDate <= lastDate) {
                if (isSameMonth(currentDate, selectedDate)) {
                    const dateKey = formatDate(currentDate, "yyyy-MM-dd");

                    if (!allDates.has(dateKey)) {
                        allDates.set(dateKey, { date: new Date(currentDate), events: [], multiDayEvents: [] });
                    }

                    allDates.get(dateKey)?.multiDayEvents.push(event);
                }
                currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
            }
        });

        return Array.from(allDates.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
    }, [singleDayEvents, multiDayEvents, selectedDate]);

    const hasEvents = events.length > 0;
    return(
        // <div className="mx-auto  max-w-screen-2xl  gap-4 px-8 py-4">
        // <div className="overflow-hidden rounded-xl border mx-auto"> these must be wrapped by the calendar provider
            <div className="h-[800px]">
                <ScrollArea className="h-full" type="always">
                    {hasEvents && eventsByDay.map(dayGroup => (
                        <AgendaDayGroup key={formatDate(dayGroup.date, "yyyy-MM-dd")} date={dayGroup.date} events={dayGroup.events} multiDayEvents={dayGroup.multiDayEvents} />
                    ))}
                    {!hasEvents &&
                        <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
                        <CalendarX2 className="size-10" />
                        <p className="text-sm md:text-base">No events scheduled</p>
                        </div>}
                </ScrollArea>
            </div>
        // </div>
        // </div>
    );
}