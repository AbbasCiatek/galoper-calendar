import type {Events} from "@/types.ts";
import {positionEventsWeekDayView} from "@/dateHelpers.ts";
import EventDayBlock from "@/Components/DayViewComponents/EventDayBlock.tsx";

type Props= {
    singleDayEvents: Events,
    day:Date,
}

export default function EventsPositioning({singleDayEvents,day}: Props) {

    const positioning = positionEventsWeekDayView(singleDayEvents, day);

    return (
        <>
            {positioning.map(p=>(
                <div
                    key={p.event.id}
                    className="absolute "
                    style={{
                        top: `${p.top}%`,
                        height: `${p.height}%`,
                        left: `${p.left}%`,
                        width: `${p.width}%`,
                    }}
                >
                    <EventDayBlock event={p.event}  />
                </div>
            ))}
        </>
    );
}