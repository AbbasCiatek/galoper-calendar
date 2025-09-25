import {daysOfWeek} from "@/dateHelpers.ts";
import { isToday} from "date-fns";
import TimeLine from "@/Components/WeeKDayViewCommonComponents/TimeLine.tsx";
import TimeCells from "@/Components/WeeKDayViewCommonComponents/TimeCells.tsx";

import EventPerDay from "@/Components/WeekComponents/EventPerDay.tsx";

export default function WeekTimeCells({date}:{date:Date}){


    const weekDays = daysOfWeek(date);
    return (
        <div className="relative flex-1 border-l">
            <div className="grid grid-cols-7 divide-x">
                {weekDays.map((day, dayIndex) => {
                    return (
                        <div key={dayIndex} className="relative bg-white">
                                    <TimeCells day={day}  />
                            <EventPerDay day={day} />
                            {isToday(day) &&  <TimeLine/>}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}