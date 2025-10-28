import { ItemTypes } from "@/dnd/draggable-events.tsx";
import { type Event, useEventStore } from "@/event-store.ts";
import { cn } from "@/lib/utils";
import { differenceInMilliseconds } from "date-fns";
import type { ReactNode, RefObject } from "react";
import { useDrop } from "react-dnd";

interface Props {
  date: Date;
  hour: number;
  minute: number;
  children: ReactNode;
}

export function DroppableTimeCell({ date, hour, minute, children }: Props) {
  const { editEvent } = useEventStore();

  const [_, drop] = useDrop(
    () => ({
      accept: ItemTypes.EVENT,
      drop: (item: { event: Event }) => {
        const droppedEvent = item.event;

        const eventStartDate = new Date(droppedEvent.startDate);
        const eventEndDate = new Date(droppedEvent.endDate);

        const eventDurationMs = differenceInMilliseconds(
          eventEndDate,
          eventStartDate,
        );

        const newStartDate = new Date(date);
        newStartDate.setHours(hour, minute, 0, 0);
        const newEndDate = new Date(newStartDate.getTime() + eventDurationMs);

        editEvent(droppedEvent.id, {
          startDate: newStartDate,
          endDate: newEndDate,
        });

        return { moved: true };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [date, hour, minute, editEvent],
  );

  return (
    <div
      ref={drop as unknown as RefObject<HTMLDivElement>}
      className={cn("h-[24px]")}
    >
      {children}
    </div>
  );
}
