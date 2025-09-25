import type {Event} from "@/types.ts";
import {formatDate} from "date-fns";

export default function EventWeekBlock({event}: { event:Event }) {

    return (
        <div >
            <div className="truncate font-semibold">
                {event.title}
            </div>
           <div className="px-1">
               {`${formatDate(event.startDate, " hh:mm a")} - ${formatDate(event.endDate, "hh:mm a")}`}
            </div>
        </div>
    )
}