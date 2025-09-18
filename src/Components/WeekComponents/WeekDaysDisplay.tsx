import {formatDate, isToday} from "date-fns";
import {daysOfWeek} from "@/dateHelpers.ts";
import {clsx} from "clsx";

export default function WeekDaysDisplay({date}:{date:Date}) {

    const weekDays = daysOfWeek(date);
    return (
        <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            <div className="grid flex-1 grid-cols-7 divide-x border-l   ">
                {weekDays.map((day, index) => (
                    <div className="py-2 flex justify-center">
                        <div
                            key={index}
                            className={clsx(
                                "flex flex-col justify-center items-center text-xs font-medium size-12 rounded-full",
                                isToday(day) ? "bg-blue-400 text-white" : "text-muted-foreground"
                            )}>
                            <span className="leading-none">{formatDate(day, "EE")}</span>
                            <span className={clsx("font-semibold  leading-none", isToday(day) ? 'text-white':'text-foreground')}>
                                {formatDate(day, "d")}
                               </span>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}