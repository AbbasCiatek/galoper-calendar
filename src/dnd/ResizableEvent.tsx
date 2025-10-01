import type {Event} from "@/types.ts";
import {type ReactNode, useCallback, useMemo, useState} from "react";
import {Resizable, type ResizeCallback} from "re-resizable";
import { differenceInMinutes} from "date-fns";
import useEventStore from "@/EventStore.ts";
import {clsx} from "clsx";

type Props = {
    event:Event,
    children:ReactNode,
    selectedDate:Date;
}

const PIXELS_PER_HOUR = 96;
const MINUTES_PER_PIXEL = 60 / PIXELS_PER_HOUR;
const MIN_DURATION = 15; // in minutes

export default function ResizableEvent({event,children,selectedDate}:Props){

    const {editEvent} = useEventStore();

    console.log(selectedDate);//will use to see if the end or start date is the same day as selectedDate can get from hook
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

    const resizeBoundaries = useMemo(() => {
        const dayStart = new Date(selectedDate);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(selectedDate);
        dayEnd.setHours(23, 59, 59, 999);

        return { dayStart, dayEnd };
    }, [selectedDate]);

    const handleResizeStart = useCallback(() => {
        setIsResizing(true);
    }, []);

    const handleResize:ResizeCallback = useCallback(
        (_, direction,ref)=>{
            const newHeight = parseInt(ref.style.height,10);
            const newDuration = Math.max(MIN_DURATION,(newHeight + 8)*MINUTES_PER_PIXEL);
            const delta = newDuration - durationInMinutes;

            let newStart = start;
            let newEnd = end;

            if (direction.includes("top")) {
                newStart = addMinutes(start, -delta);
            } else if (direction.includes("bottom")) {
                newEnd = addMinutes(end, delta);
            }
            //ensure in day
            // may be deleted it in future
            if (isBefore(newStart, resizeBoundaries.dayStart)) {
                newStart = resizeBoundaries.dayStart;
            }
            if (isAfter(newEnd, resizeBoundaries.dayEnd)) {
                newEnd = resizeBoundaries.dayEnd;
            }

            setResizePreview({
                start: format(newStart, "HH:mm"),
                end: format(newEnd,  "HH:mm"),
            });

            const isAllDay = 24*60*60*1000 -(end.getTime()-start.getTime()) <0;

            editEvent(event.id,{startDate:start,endDate:end,isAllDay:isAllDay});
        },
        [   start,
            end,
            durationInMinutes,
            resizeBoundaries,
            editEvent,
            event,]
    );

    const handleResizeStop = useCallback(() => {
        setIsResizing(false);
        setResizePreview(null);
    }, []);

    const resizeConfig = useMemo(
        ()=>({
            minHeight: 15,
            maxHeight: 1440,
            enable:{
                top:true,
                bottom:true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
            },
            //resize cursor designing
            handleStyles: {
                top: {
                    cursor: "ns-resize",
                    height: "8px",
                    top: "-4px",
                    backgroundColor: "transparent",
                },
                bottom: {
                    cursor: "ns-resize",
                    height: "8px",
                    bottom: "-4px",
                    backgroundColor: "transparent",
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
        [isResizing,handleResize,handleResizeStart,handleResizeStop],
    )


    return (
        <div className={clsx("relative group",className)} >
            <Resizable {...resizeConfig}>
                {children}
            </Resizable>
            {isResizing && resizePreview && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs shadow-lg px-2 py-1 rounded z-50 whitespace-nowrap " >
                    {resizePreview.end} - {resizePreview.start}
                </div>
            )}
        </div>
    );
}

