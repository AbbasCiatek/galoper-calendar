import {formatDate, isMonday, isToday} from "date-fns";
import {clsx} from "clsx";
import type {Event} from "@/types.ts";

type Props = {
    day: Date;
    isFaded: boolean;
    eventsForDay: (Event & { position: number; isMultiDay: boolean })[];
};
export default function DayCell({day, isFaded, eventsForDay}: Props) {
    const colorMap: Record<string, string> = {
        red: "bg-red-100 text-red-900 border border-red-400 ",
        green: "bg-green-100 text-green-900 border border-green-400 ",
        blue: "bg-blue-100 text-blue-900 border border-blue-400 ",
        yellow: "bg-yellow-100 text-yellow-900 border border-yellow-400 ",
        gray: "bg-gray-100 text-gray-900 border border-gray-400 ",
        purple: "bg-purple-100 text-purple-900 border border-purple-400 ",
        orange: "bg-orange-100 text-orange-900 border border-orange-400 ",
    };
    return (
        <AddEditEventDialog startDate={day.setHours(8)} endDate={day.setHours(9)} >
        <div
            className={clsx("relative border-l border-t p-1 overflow-hidden h-full min-h-[120px] flex flex-col",
                isMonday(day) && "border-l-0", "bg-white")}>
            <div
                className={clsx("mb-1 text-xs font-semibold flex-shrink-0",
                    isFaded && "opacity-40", isToday(day) &&
                    "flex w-6 h-6 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground")}>
                {formatDate(day, "d")}
            </div>

            <div className="flex flex-col  gap-0.5 flex-1">
                {eventsForDay.slice(0, 3).map((event) => (
                    // <EventDetailsDialog event={event} >
                    <div key={event.id}
                         className={`truncate font-bold  h-6 rounded px-1 text-xs  ${colorMap[event.color]}`}> {event.title}
                    </div>
                    //</EventDetailsDialog>
                ))}
                {eventsForDay.length > 3 && (
                    // <EventListDialog events={eventsForDay} date={day}  >
                        <div className="text-xs text-gray-500 px-1"> +{eventsForDay.length - 3} more
                        </div>
                    // </EventListDialog>
                )}
            </div>
        </div>
        </AddEditEventDialog>
    );
}