import {formatDate, isMonday, isSameDay, isToday} from "date-fns";
import {clsx} from "clsx";
import type {Event} from "@/types.ts";
import {unassignedPosition} from "@/dateHelpers.ts";

type Props = {
    day: Date;
    isFaded: boolean;
    isFirstCell?: boolean;
    isLastCell?: boolean;
    eventsForDay: (Event & { position: number; isMultiDay: boolean,isFirstDay:boolean,isLastDay:boolean })[];
    occupiedPositions:{ [p: string]: boolean[] };
};
export default function DayCell({day, isFaded,isFirstCell,isLastCell, eventsForDay,occupiedPositions}: Props) {
    const colorMap: Record<string, string> = {
        red: "bg-red-100 text-red-900 border border-red-400 ",
        green: "bg-green-100 text-green-900 border border-green-400 ",
        blue: "bg-blue-100 text-blue-900 border border-blue-400 ",
        yellow: "bg-yellow-100 text-yellow-900 border border-yellow-400 ",
        gray: "bg-gray-100 text-gray-900 border border-gray-400 ",
        purple: "bg-purple-100 text-purple-900 border border-purple-400 ",
        orange: "bg-orange-100 text-orange-900 border border-orange-400 ",
    };
    const positionMap :Record<number, string>={
        0:"",
        1:"top-[42px]",
        2:"top-[63px]",
    }
    return (
        <div
            className={clsx("relative border-l border-t  overflow-hidden h-full min-h-[120px] flex flex-col",
                isMonday(day) && "border-l-0", "bg-white")}>
            <div
                className={clsx("flex w-5 h-5 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0",
                    isFaded && "opacity-20", isToday(day) &&
                    "bg-primary font-bold text-primary-foreground")}>
                {formatDate(day, "d")}
            </div>

            <div className="flex flex-col  flex-1">
                {eventsForDay.slice(0, 3).map((event) => {
                    console.log(` before assigning ${event.position}`);
                    if(event.position === -1)  unassignedPosition(event,day,occupiedPositions);
                        return (
                        <div
                            onClick={() => console.log(event)}
                            className={clsx(`px-2 absolute left-0 right-0 flex justify-between cursor-pointer ${colorMap[event.color]} ${positionMap[event.position]}  truncate font-bold  h-5 rounded m-1 text-xs`,
                                !isSameDay(day, event.startDate) && "border-l-0 rounded-l-none ml-0 ",
                                !isSameDay(day, event.endDate) && "border-r-0 rounded-r-none mr-0 ",
                                isFaded && "opacity-40",
                            )}>
                            <span>{(!event.isMultiDay || (event.isMultiDay && (event.isFirstDay || isFirstCell))) && event.title}</span>
                            <span>{(!event.isMultiDay || (event.isMultiDay && (event.isLastDay || isLastCell))) && (formatDate(new Date(event.startDate), 'hh:mm'))}</span>
                        </div>
                    )
                })}
                {eventsForDay.length > 3 && (
                    // <EventListDialog>
                        <div className={clsx("absolute border rounded-full px-1 border-gray-200 bottom-2 right-2 text-xs  text-gray-500 font-semibold ",isFaded && "opacity-40")}><span className="px-1"> +{eventsForDay.length - 3} <span className="hidden md:inline-block">more</span></span>
                        </div>
                    // </EventListDialog>
                )}
            </div>
        </div>

    );
}