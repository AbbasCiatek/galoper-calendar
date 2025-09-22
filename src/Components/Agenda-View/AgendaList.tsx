import type {Event,Events} from "@/types.ts"
import {formatDate, getDayOfYear} from "date-fns";
import AgendaEventCard from "@/Components/Agenda-View/AgendaEventCard.tsx";

export default function AgendaList({sortedEvents}: {sortedEvents: Events }) {
    return (
        <div>
            {sortedEvents.map((event:Event,index,array) => (
                <div key={event.startDate.toString()}>
                    {(array[index -1] ===null || getDayOfYear(array[index-1].startDate) !==getDayOfYear(event.startDate))
                        &&  <div className="sticky top-0 flex items-center gap-4 bg-background py-2">
                                <p className="text-sm font-semibold">{formatDate(event.startDate, "EEEE, MMMM d, yyyy")}</p>
                            </div>}
                    {sortedEvents.length > 0 && sortedEvents.map((event:Event)=>
                    <AgendaEventCard key={event.id} event={event} />
                    )}
                </div>
            ))}
        </div>
    );
}