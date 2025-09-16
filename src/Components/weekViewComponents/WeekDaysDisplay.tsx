import {WeekDays} from "@/helpers.tsx";
import {weekHelper} from "@/dateHelpers.ts";
import {formatDate} from "date-fns";
export default function WeekDaysDisplay() {
    // date will be passed by useCalendar hoolllk
    const date = new Date();
    const week = weekHelper(date);
    return (<>
            {week.map((day, index) => (
                <div className="text-center text-[30px]" key={index}>
                    <div>{WeekDays[index].slice(0, 3)}</div>
                    <div>{formatDate(day, "d")}</div>
                </div>
            ))}
        </>
    );
}