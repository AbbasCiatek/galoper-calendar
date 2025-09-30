import {formatDate, isMonday, isSameDay, isToday} from "date-fns";
import {clsx} from "clsx";
import type {Event} from "@/types.ts";

type Props = {
    day: Date;
    isFaded: boolean;
    eventsForDay: (Event & { position: number; isMultiDay: boolean,isFirstDay:boolean,isLastDay:boolean })[];
};
export default function DayCell({day, isFaded, eventsForDay}: Props) {
    const colorMapCurrentMonth: Record<string, string> = {
        red: "bg-red-100 text-red-900 border border-red-400 ",
        green: "bg-green-100 text-green-900 border border-green-400 ",
        blue: "bg-blue-100 text-blue-900 border border-blue-400 ",
        yellow: "bg-yellow-100 text-yellow-900 border border-yellow-400 ",
        gray: "bg-gray-100 text-gray-900 border border-gray-400 ",
        purple: "bg-purple-100 text-purple-900 border border-purple-400 ",
        orange: "bg-orange-100 text-orange-900 border border-orange-400 ",
    };
        const colorMapNotCurrentMonth: Record<string, string> = {
        red: "bg-red-100/50 border border-red-300 ",
        green: "bg-green-100/50 border border-green-300 ",
        blue: "bg-blue-100/50 border border-blue-300 ",
        yellow: "bg-yellow-100/50 border border-yellow-300 ",
        gray: "bg-gray-100/50 border border-gray-300 ",
        purple: "bg-purple-100/50 border border-purple-300 ",
        orange: "bg-orange-100/50 border border-orange-300 ",
    };

    return (
        <div
            className={clsx("relative border-l border-t  overflow-hidden h-full min-h-[120px] flex flex-col",
                isMonday(day) && "border-l-0", "bg-white")}>
            <div
                className={clsx("flex w-6 h-6 items-center justify-center rounded-full mb-1 text-xs font-semibold flex-shrink-0",
                    isFaded && "opacity-40", isToday(day) &&
                    "bg-primary font-bold text-primary-foreground")}>
                {formatDate(day, "d")}
            </div>

            <div className="flex flex-col  flex-1">
                {eventsForDay.slice(0, 3).map((event) => (

                        <div className={clsx(`px-2 absolute left-0 right-0 flex justify-between  truncate font-bold  h-6 rounded m-1 text-xs`,
                            !isSameDay(day,event.startDate) && "border-l-0 rounded-l-none ml-0 ",
                            !isSameDay(day,event.endDate) && "border-r-0 rounded-r-none mr-0 ",
                            isFaded ? `${colorMapNotCurrentMonth[event.color]}`:`${colorMapCurrentMonth[event.color]}`,
                            event.position===1 && "top-[56px]",
                            event.position===2 && "top-[84px]",
                        )}>
                            <span>{(!event.isMultiDay || (event.isMultiDay && event.isFirstDay)) && event.title}</span>
                            <span>{(!event.isMultiDay || (event.isMultiDay && event.isLastDay)) && (formatDate(new Date(event.startDate),'hh:mm'))}</span>

                        </div>

                ))}
                {eventsForDay.length > 3 && (
                        <div className="text-xs text-gray-500 px-1"> +{eventsForDay.length - 3} more
                        </div>

                )}
            </div>
        </div>

    );
}