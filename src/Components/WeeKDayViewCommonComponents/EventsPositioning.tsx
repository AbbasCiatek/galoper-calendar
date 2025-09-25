import type {Events} from "@/types.ts";
import {positionEventsWeekDayView} from "@/dateHelpers.ts";
import EventWeekBlock from "@/Components/WeekComponents/EventWeekBlock.tsx";
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
                        className={` rounded-lg ${bgColor} text-xs text-white  absolute overflow-hidden text-ellipsis `}
                        style={{
                            top: `${p.top}%`,
                            height: `${p.height}%`,
                            left: `${p.left}%`,
                            width: `${p.width}%`,
                        }}
                    >
                        <EventWeekBlock event={p.event}  />
                    </div>
                )})}
        </>
    );
}