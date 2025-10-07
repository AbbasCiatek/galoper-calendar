import type {Event} from "@/types.ts";
import {colorMap} from "@/helpers.ts";

interface Props {
    event: Event;
    eventCurrentDay?:number;
    eventTotalDays?:number;
}

export function MultiDayEventDisplay({ event ,eventCurrentDay,eventTotalDays }: Props) {

    const eventStyle = colorMap[event.color];
    return (
        // <DraggableEvent event={event}>
        //  <EventDetailsDialog event={event}>
            <div className={  `flex items-center h-6.5 px-2 text-xs font-medium truncate cursor-pointer rounded-lg ${eventStyle} `}>
                 <p>
                {eventCurrentDay && (
                    <span className="text-xs">
                    Day {eventCurrentDay} of {eventTotalDays} •{" "}
                  </span>
                )}
                {event.title}
            </p>
            </div>
        // </EventDetailsDialog>
        //     </DraggableEvent>
    );
}