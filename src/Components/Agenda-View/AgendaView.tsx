import useEventStore from "@/EventStore.ts";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import { getDayOfYear} from "date-fns";
import AgendaList from "@/Components/Agenda-View/AgendaList.tsx";

import type {Events} from "@/types.ts"
import {CalendarX2} from "lucide-react";
export default function AgendaView() {
    const startRange = new Date();
    const endRange = new Date(2025,9);
    const {getEventsByDateRange} = useEventStore();
    const events:Events = getEventsByDateRange(startRange,endRange)
    const eventsSortedByDate:Events = [...events].sort((a,b) => getDayOfYear(a.startDate) - getDayOfYear(b.startDate));
    return(
        <div className="h-[800px]">
            <ScrollArea className="h-full" type="always">
                <div className="space-y-6 p-4">
                        <AgendaList  sortedEvents={eventsSortedByDate}  />
                </div>
                {eventsSortedByDate.length <= 0 &&
                    <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
                    <CalendarX2 className="size-10" />
                    <p className="text-sm md:text-base">No events scheduled for the selected month</p>
                    </div>}
            </ScrollArea>
        </div>
    );
}