export type COLORS = "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";

export type Event = {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    color: COLORS;
    isAllDay? : boolean;
};
export type Events = Event[];
export type EventsStore = {
    events: Events;
    addEvent: (event: Event) => void;
    editEvent: (id: string, edited: Partial<Event>) => void;
    removeEvent: (id: string) => void;
};