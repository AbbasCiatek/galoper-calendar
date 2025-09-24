import type {Events} from "@/types.ts";
import {positionEventsWeekDayView} from "@/dateHelpers.ts";
import EventDayBlock from "@/Components/DayViewComponents/EventDayBlock.tsx";
import {backgroundFromColor} from "@/helpers.ts";

type Props= {
    singleDayEvents: Events,
    day:Date,
}

export default function EventsPositioning({singleDayEvents,day}: Props) {

    const positioning = positionEventsWeekDayView(singleDayEvents, day);

    return (
        <>
            {positioning.map(p=>{

                const bgColor=backgroundFromColor(p.event.color);
                return(
                <div
                    key={p.event.id}
                    className={` rounded-lg ${bgColor} text-xs text-white  absolute `}
                    style={{
                        top: `${p.top}%`,
                        height: `${p.height}%`,
                        left: `${p.left}%`,
                        width: `${p.width}%`,
                    }}
                >
                    <EventDayBlock event={p.event}  />
                </div>
            )})}
        </>
    );
}