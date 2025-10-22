import type { COLORS } from "@/types.ts";
import { areIntervalsOverlapping } from "date-fns";
import { v4 } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Event = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  color: COLORS;
};

type EventsStore = {
  events: Array<Event>;
  getEventsByDateRange: (startDate: Date, endDate: Date) => Array<Event>;
  addEvent: (event: Omit<Event, "id">) => void;
  editEvent: (id: string, edited: Partial<Event>) => void;
  removeEvent: (id: string) => void;
};

export const useEventStore = create<EventsStore>()(
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
        set((state) => {
          const id = v4();
          return {
            events: [...state.events, { id, ...event }],
          };
        }),

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
    { name: "event-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
