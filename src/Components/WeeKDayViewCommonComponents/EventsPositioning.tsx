import type {Events} from "@/types.ts";
import {positionEventsWeekDayView} from "@/dateHelpers.ts";
import EventBlock from "@/Components/WeeKDayViewCommonComponents/EventBlock.tsx";
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

                const styles=backgroundFromColor(p.event.color);
                return(

                        <div
                            role="button"
                            tabIndex={0}
                            key={p.event.id}
                            className={`border-2 rounded-lg ${styles} text-xs  absolute `}
                            style={{
                                top: `${p.top}px`,
                                height: `${p.height}px`,
                                left: `${p.left}%`,
                                width: `${p.width}%`,
                            }}
                        >
                            <EventBlock event={p.event} height={p.height}  />
                        </div>

                )})}
        </>
    );
}