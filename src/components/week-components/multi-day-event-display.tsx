import type { Event } from "@/event-store.ts";
import { colorMap } from "@/helpers.ts";

interface Props {
  event: Event;
  cellDate: Date;
  position: "first" | "middle" | "last" | "none";
}

export function MultiDayEventDisplay({ event, position }: Props) {
  const eventStyle = colorMap[event.color];
  const positionClasses = {
    none: "rounded-md",
    first: "rounded-l-md border-r-0  ",
    middle: "border-x-0 ",
    last: "rounded-r-md border-l-0 ",
  }[position];

  return (
    // <DraggableEvent event={event}>
    //     <EventDetailsDialog event={event}>
    <div
      className={`  flex items-center h-6.5 px-2 text-xs font-medium truncate cursor-pointer ${positionClasses}  ${eventStyle} `}
    >
      {position === "first" || position === "none" ? event.title : null}
    </div>
    // </EventDetailsDialog>
    // </DraggableEvent>
  );
}
