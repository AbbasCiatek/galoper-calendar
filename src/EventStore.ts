import type {Event} from "@/types.ts";
import { persist } from "zustand/middleware";
import { create } from "zustand";
import {areIntervalsOverlapping} from "date-fns";

type EventsStore = {
    events: Event[];
    getSingleDayEvents:(startDate:Date,endDate:Date)=>Event[];
    getMultipleDayEvents:(startDate:Date,endDate:Date)=>Event[];
    getEventsByDateRange: (startDate:Date, endDate:Date) => Event[];
    addEvent: (event: Event) => void;
    editEvent: (id: string, edited: Partial<Event>) => void;
    removeEvent: (id: string) => void;
};

const useEventStore = create<EventsStore>()(
    persist(
        (set,get)=>({
            events : [],
            getSingleDayEvents:(startDate:Date,endDate:Date)=>{
                return get().events.filter((event) => {
                    if(areIntervalsOverlapping({
                        start:new Date(event.startDate),
                        end:new Date(event.endDate),
                    },{
                        start:startDate,
                        end:endDate,
                    }) && event.isAllDay ===false)
                        return (event);
                });
            },
            getMultipleDayEvents:(startDate:Date,endDate:Date)=>{
                return get().events.filter((event) => {
                    if(areIntervalsOverlapping({
                        start:new Date(event.startDate),
                        end:new Date(event.endDate),
                    },{
                        start:startDate,
                        end:endDate,
                    }) && event.isAllDay ===true)
                        return (event);
                });
            },
            getEventsByDateRange: (startDate:Date, endDate:Date) => {
                if (!startDate || !endDate) return get().events;

                return get().events.filter((event) => {
                    if(areIntervalsOverlapping({
                        start:new Date(event.startDate),
                        end:new Date(event.endDate),
                    },{
                        start:startDate,
                        end:endDate,
                    }))
                        return (event);
                });
            },

            addEvent : (event)=>
                set((state)=>({
                    events:[...state.events, event],
                })),
            editEvent: (id, edited) =>
                set((state) => ({
                    events: state.events.map((e) =>
                        e.id === id ? { ...e, ...edited } : e
                    ),
                })),

            removeEvent: (id) =>
                set((state) => ({
                    events: state.events.filter((e) => e.id !== id),
                })),
        }),
        { name: "Event-Storage" }
    )
);

export default useEventStore;