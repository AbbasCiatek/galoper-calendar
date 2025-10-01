import type {Event} from "@/types.ts";
import {type ReactNode, useCallback, useMemo, useState} from "react";
import {Resizable, type ResizeCallback} from "re-resizable";
import {addMinutes, differenceInMinutes, formatDate, isAfter, isBefore} from "date-fns";
import useEventStore from "@/EventStore.ts";
import {clsx} from "clsx";
import { isClipped} from "@/dateHelpers.ts";

type Props = {
    event:Event,
    children:ReactNode,
    selectedDate:Date;
    height?:number;
}

const PIXELS_PER_HOUR = 96;
const MINUTES_PER_PIXEL = 60 / PIXELS_PER_HOUR;
const MIN_DURATION = 15; // in minutes

export default function ResizableEvent({event,children,selectedDate,height}:Props){

    const {editEvent} = useEventStore();

    //will use to see if the end or start date is the same day as selectedDate can get from hook

    const {clippedStart,clippedEnd} = isClipped(event,selectedDate);



    const [isResizing, setIsResizing] = useState(false);
    const [resizePreview, setResizePreview] = useState<{
        start:string,
        end:string,
    }|null>(null);

    const start = useMemo(() => new Date(event.startDate), [event.startDate]);
    const end = useMemo(() => new Date(event.endDate), [event.endDate]);

    const durationInMinutes = useMemo(
        () => differenceInMinutes(end,start),
        [start,end]);

    const handleResizeStart = useCallback(() => {
        setIsResizing(true);
    }, []);

    const handleResize:ResizeCallback = useCallback(
        (_, direction,ref)=>{
            const newHeight = parseInt(ref.style.height,10);
            const newDuration = Math.max(MIN_DURATION,(newHeight)*MINUTES_PER_PIXEL);
            const delta = newDuration - durationInMinutes;

            let newStart = start;
            let newEnd = end;

            if (direction.includes("top")) {
                newStart = addMinutes(start, -delta);
            } else if (direction.includes("bottom")) {
                newEnd = addMinutes(end, delta);
            }

            setResizePreview({
                start: formatDate(newStart, "HH:mm"),
                end: formatDate(newEnd,  "HH:mm"),
            });

            const isAllDay = 24*60*60*1000 -(end.getTime()-start.getTime()) <0;

            editEvent(event.id, { startDate: newStart, endDate: newEnd, isAllDay });
        },
        [start, end, durationInMinutes, editEvent, event]
    );

    const handleResizeStop = useCallback(() => {
        setIsResizing(false);
        setResizePreview(null);
    }, []);

    const resizeConfig = useMemo(
        ()=>({
            minHeight: 15,
            maxHeight: 2304,
            enable:{
                top:!clippedStart,
                bottom:!clippedEnd,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
            },
            //resize cursor designing
            handleStyles: {
                top: {
                    cursor: "ns-resize",
                    height: "10px",
                    top: "-4px",
                    backgroundColor: "border-2 border-gray-700",
                },
                bottom: {
                    cursor: "ns-resize",
                    height: "10px",
                    bottom: "-4px",
                    backgroundColor: "border-2 border-gray-700",
                },
            },
            handleClasses: {
                top: "transition-colors rounded-sm",
                bottom: "transition-colors rounded-sm",
            },
            onResizeStart:handleResizeStart,
            onResize:handleResize,
            onResizeStop:handleResizeStop,
            className:clsx("transition-all duration-200",
                isResizing && "z-50 shadow-lg"),
        }),
        [clippedStart, clippedEnd, handleResizeStart, handleResize, handleResizeStop, isResizing],
    )

    console.log(resizePreview);
    console.log(isResizing);
    return (
        <div className="relative group" >
            <Resizable
                defaultSize={{width:"100%", height:height}}
                {...resizeConfig}>
                {children}
            </Resizable>
            { resizePreview && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2
		   bg-gray-900 text-white text-xs px-2 py-1
		   rounded shadow-lg z-50 whitespace-nowrap"  >
                    {resizePreview.end} - {resizePreview.start}
                </div>
            )}
        </div>
    );
}


