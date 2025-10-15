import type { Event } from "@/types.ts";
import { areIntervalsOverlapping } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type EventsStore = {
  events: Array<Event>;
  getEventsByDateRange: (startDate: Date, endDate: Date) => Array<Event>;
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
                start: new Date(event.startDate),
                end: new Date(event.endDate),
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
    }),
    { name: "Event-Storage" },
  ),
);
