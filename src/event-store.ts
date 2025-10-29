import type { COLORS } from "@/types.ts";
import { areIntervalsOverlapping, isSameDay } from "date-fns";
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
  getSingleDayEvents: (startDate: Date, endDate: Date) => Array<Event>;
  getMultipleDayEvents: (startDate: Date, endDate: Date) => Array<Event>;
  getAllDayEvents: (startDate: Date, endDate: Date) => Array<Event>;
  getEventsByDateRange: (startDate: Date, endDate: Date) => Array<Event>;
  addEvent: (event: Omit<Event, "id">) => void;
  editEvent: (id: string, edited: Partial<Event>) => void;
  removeEvent: (id: string) => void;
};

export const useEventStore = create<EventsStore>()(
  persist(
    (set, get) => ({
      events: [],
      getSingleDayEvents: (startDate: Date, endDate: Date) => {
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
            ) &&
            isSameDay(new Date(event.startDate), new Date(event.endDate)) &&
            new Date(event.endDate).getMinutes() +
              new Date(event.endDate).getHours() * 60 -
              new Date(event.startDate).getMinutes() +
              new Date(event.startDate).getHours() * 60 !==
              1439
          )
            return event;
        });
      },
      getMultipleDayEvents: (startDate: Date, endDate: Date) => {
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
            ) &&
            !isSameDay(event.startDate, event.endDate)
          )
            return event;
        });
      },
      getAllDayEvents: (startDate: Date, endDate: Date) => {
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
            ) &&
            isSameDay(event.startDate, event.endDate) &&
            new Date(event.endDate).getMinutes() +
              new Date(event.endDate).getHours() * 60 -
              new Date(event.startDate).getMinutes() +
              new Date(event.startDate).getHours() * 60 ===
              1439
          )
            return event;
        });
      },
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
