"use client";

import { useDrop } from "react-dnd";
import {  differenceInMilliseconds } from "date-fns";


import { cn } from "@/lib/utils";
import { ItemTypes } from "@/dnd/DraggableEvents";

import type { Event } from "@/types.ts";
import type {ReactNode, RefObject} from "react";
import useEventStore from "@/EventStore.ts";


type Props ={
    date: Date;
    children:ReactNode;
}

export function DroppableDayCell({date, children }: Props) {
    const {editEvent} = useEventStore();

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.EVENT,
            drop: (item: { event: Event }) => {
                const droppedEvent = item.event;

                const eventStartDate = new Date(droppedEvent.startDate);
                const eventEndDate = new Date(droppedEvent.endDate);

                const eventDurationMs = differenceInMilliseconds(eventEndDate, eventStartDate);

                const newStartDate = new Date(date);
                newStartDate.setHours(eventStartDate.getHours(), eventStartDate.getMinutes(), eventStartDate.getSeconds(), eventStartDate.getMilliseconds());
                const newEndDate = new Date(newStartDate.getTime() + eventDurationMs);

                editEvent(droppedEvent.id,{startDate:newStartDate,endDate:newEndDate});

                return { moved: true };
            },
            collect: monitor => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [date, editEvent]
    );

    return (
        <div ref={drop as unknown as RefObject<HTMLDivElement>}>
            {children}
        </div>
    );
}
