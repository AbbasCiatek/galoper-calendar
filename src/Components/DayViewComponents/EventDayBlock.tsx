import type {Event} from "@/types.ts";
import {backgroundFromColor} from "@/helpers.ts";
import {formatDate, isSameDay} from "date-fns";

export default function EventDayBlock({event}: { event:Event }) {

    const bgColor=backgroundFromColor(event.color);
    return (
        <div className={`rounded-lg ${bgColor} text-xs text-white mr-1 `}>
            <div className="px-4">{event.title}</div>
            <div className="px-4">  {isSameDay(event.startDate, event.endDate)
                ? `${formatDate(event.startDate, "hh:mm a")} - ${formatDate(event.endDate, "hh:mm a")}`
                : `${formatDate(event.startDate, "do, hh:mm a")} - ${formatDate(event.endDate, "hh:mm a")}`}
            </div>
        </div>
    )
}