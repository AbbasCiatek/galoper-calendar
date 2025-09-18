import {formatDate, isToday} from "date-fns";
import {daysOfWeek} from "@/dateHelpers.ts";
import {clsx} from "clsx";

export default function WeekDaysDisplay({date}: { date: Date }) {
    const weekDays = daysOfWeek(date);

    function handleClickedDate(day: Date) {
        //must navigate to clicked date in day views
        console.log(day);
    }

    return (
        <div className="grid flex-1 grid-cols-7 divide-x border-l   ">
            {weekDays.map((day, index) => (
                <div key={index} className="pt-2 pb-1 px-2">
                    <div className="flex flex-col items-center text-xs font-medium  ">
                        <div className="flex flex-col items-center gap-1">
            <span className={clsx("leading-none ",
                isToday(day) ? "text-blue-500" : "text-muted-foreground")}>
                {formatDate(day, "EE").toUpperCase()}
            </span>
                            <button
                                onClick={() => handleClickedDate(day)}
                                className={clsx("flex text-gray-700  justify-center cursor-pointer items-center size-10 rounded-full",
                                    isToday(day) ? ' bg-blue-500 hover:bg-blue-600  text-white'
                                        : ' hover:bg-gray-200 hover:text-black text-foreground')}
                            >
                                  <span className=" leading-none font-bold text-lg">
                                      {formatDate(day, "d")}
                                  </span>
                            </button>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}