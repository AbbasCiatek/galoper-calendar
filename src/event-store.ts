import type { Event } from "@/types.ts";
import { areIntervalsOverlapping } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type EventsStore = {
  events: Array<Event>;
  getEventsByDateRange: (startDate: Date, endDate: Date) => Array<Event>;
  addEvent: (event: Event) => void;
  editEvent: (id: string, edited: Partial<Event>) => void;
  removeEvent: (id: string) => void;
};

const useEventStore = create<EventsStore>()(
  persist(
    (set, get) => ({
      events: [],
      getEventsByDateRange: (startDate: Date, endDate: Date) => {
        if (!startDate || !endDate) return get().events;

        return get().events.filter((event) => {
          if (
            areIntervalsOverlapping(
              {
                start: event.startDate,
                end: event.endDate,
              },
              {
                start: startDate,
                end: endDate,
              },
            )
          )
            return event;
        });
      },
      addEvent: (event) =>
        set((state) => ({
          events: [...state.events, event],
        })),
      editEvent: (id, edited) =>
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...edited } : e,
          ),
        })),
      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),
    }),
    { name: "Event-Storage" },
  ),
);

export default useEventStore;
