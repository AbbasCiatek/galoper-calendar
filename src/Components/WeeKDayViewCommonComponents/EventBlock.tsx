import  type {Event} from "@/types.ts";
import {formatDate} from "date-fns";
//import ResizableEvent from "@/Components/ResizableEvent.tsx";
// import ResizableEvent from "@/Components/ResizableEvent.tsx";

export default function EventBlock({event,height}: { event:Event ,height:number }) {

    return (
        // <ResizableEvent event={event} height={height} selectedDate={new Date()}>
        <div className=" overflow-hidden text-ellipsis" >
            <div className="truncate font-semibold">
                {event.title}
            </div>
            <div className="  px-1">
                {`${formatDate(event.startDate, " hh:mm a")} - ${formatDate(event.endDate, "hh:mm a")}`}
            </div>
        </div>
       //  </ResizableEvent>
    )
}