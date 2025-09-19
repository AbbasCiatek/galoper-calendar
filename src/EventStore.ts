import type {EventsStore} from "@/types.ts";
import { persist } from "zustand/middleware";
import { create } from "zustand";


const useEventStore = create<EventsStore>()(
    persist(
        (set)=>({
            events : [],
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
