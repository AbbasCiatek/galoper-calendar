import { type Event, useEventStore } from "@/event-store.ts";
import { clsx } from "clsx";
import { addMinutes, differenceInMinutes, formatDate } from "date-fns";
import { Resizable, type ResizeCallback } from "re-resizable";
import { type ReactNode, useCallback, useMemo, useState } from "react";

type Props = {
  event: Event;
  children: ReactNode;
  height?: number;
};

const PIXELS_PER_HOUR = 96;
const MINUTES_PER_PIXEL = 60 / PIXELS_PER_HOUR;
const MIN_DURATION = 15; // in minutes

export function ResizableEvent({ event, children, height }: Props) {
  const { editEvent } = useEventStore();

  const [isResizing, setIsResizing] = useState(false);
  const [resizePreview, setResizePreview] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const start = useMemo(() => new Date(event.startDate), [event.startDate]);
  const end = useMemo(() => new Date(event.endDate), [event.endDate]);

  const durationInMinutes = useMemo(
    () => differenceInMinutes(end, start),
    [start, end],
  );

  const handleResizeStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResize: ResizeCallback = useCallback(
    (_, direction, ref) => {
      const newHeight = Number.parseInt(ref.style.height, 10);
      const newDuration = Math.max(MIN_DURATION, newHeight * MINUTES_PER_PIXEL);
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
        end: formatDate(newEnd, "HH:mm"),
      });

      editEvent(event.id, { startDate: newStart, endDate: newEnd });
    },
    [start, end, durationInMinutes, editEvent, event],
  );

  const handleResizeStop = useCallback(() => {
    setIsResizing(false);
    setResizePreview(null);
  }, []);

  const resizeConfig = useMemo(
    () => ({
      minHeight: 15,
      maxHeight: 2304,
      enable: {
        top: true,
        bottom: true,
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
      onResizeStart: handleResizeStart,
      onResize: handleResize,
      onResizeStop: handleResizeStop,
      className: clsx(
        "transition-all duration-200",
        isResizing && "z-50 shadow-lg",
      ),
    }),
    [handleResizeStart, handleResize, handleResizeStop, isResizing],
  );
  return (
    <div className="relative group">
      <Resizable
        defaultSize={{ width: "100%", height: height }}
        {...resizeConfig}
      >
        {children}
      </Resizable>
    </div>
  );
}
