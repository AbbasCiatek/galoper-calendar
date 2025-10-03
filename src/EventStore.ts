import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Event } from "@/types.ts";

type EventsStore = {
	events: Event[];
	addEvent: (event: Event) => void;
	editEvent: (id: string, edited: Partial<Event>) => void;
	removeEvent: (id: string) => void;
};

const useEventStore = create<EventsStore>()(
	persist(
		(set) => ({
			events: [],
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
