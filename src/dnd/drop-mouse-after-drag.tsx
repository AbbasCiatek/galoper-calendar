import {type ReactNode, useCallback, useMemo, useState} from "react";
import {addMinutes, differenceInMinutes, formatDate, setMinutes} from "date-fns";
import {Resizable, type ResizeCallback} from "re-resizable";
import {clsx} from "clsx";

type TProps = {
    children: ReactNode;
    startDateEvent: Date;
}
const Min_Duration = 15;
const PIXELS_PER_HOUR = 96;
const MINUTES_PER_PIXEL = 60 / PIXELS_PER_HOUR;
export default function DropMouseAfterDrag({children, startDateEvent}: TProps) {
    const [isResizing, setIsResizing] = useState(false);
    const [resizePreview, setResizePreview] = useState<{
        start: string,
        end: string,
    } | null>(null);
    const endDateEvent = setMinutes(startDateEvent, Min_Duration);

    const end = useMemo(() => new Date(endDateEvent), [endDateEvent]);

    const durationInMinutes = useMemo(
        () => differenceInMinutes(end, startDateEvent),
        [end]);

    const [resizableEdge, setResizableEdge] = useState<"top" | "bottom">("bottom");


    const handleResizeStart = useCallback(() => {
        setIsResizing(true);
    }, []);
    const handleResize: ResizeCallback = useCallback(
        (_, _direction, ref) => {
            const newHeight = parseInt(ref.style.height, 10);
            const newDuration = newHeight * MINUTES_PER_PIXEL;

            let newStart = startDateEvent;
            let newEnd = end;

            if (resizableEdge === "top") {
                const proposedStart = addMinutes(startDateEvent, -(newDuration - durationInMinutes));

                if (newDuration < Min_Duration) {
                    // Flip: bottom becomes resizable, top fixed
                    setResizableEdge("bottom");
                    const excess = Min_Duration - newDuration;
                    newEnd = addMinutes(end, excess);
                } else {
                    newStart = proposedStart;
                }

            } else if (resizableEdge === "bottom") {
                const proposedEnd = addMinutes(end, newDuration - durationInMinutes);

                if (newDuration < Min_Duration) {
                    // Flip: top becomes resizable, bottom fixed
                    setResizableEdge("top");
                    const excess = Min_Duration - newDuration;
                    newStart = addMinutes(startDateEvent, -excess);
                } else {
                    newEnd = proposedEnd;
                }
            }

            setResizePreview({
                start: formatDate(newStart, "HH:mm"),
                end: formatDate(newEnd, "HH:mm"),
            });

        },
        [startDateEvent, end, durationInMinutes, resizableEdge,]
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
                top:resizableEdge ==="top",
                bottom:resizableEdge ==="bottom",
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
        [handleResizeStart, handleResize, handleResizeStop, isResizing],
    )



    return (
        <div className="relative group" >
         <Resizable {...resizeConfig} >
             {children}
         </Resizable>
        </div>
    );
}