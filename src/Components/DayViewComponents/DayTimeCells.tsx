import TimeCells from "@/Components/WeeKDayViewCommonComponents/TimeCells.tsx";
import TimeLine from "@/Components/WeeKDayViewCommonComponents/TimeLine.tsx";
import {isToday} from "date-fns";
import {clsx} from "clsx";

export default function DayTimeCells({date}:{date:Date}) {
    return (

        <div  className={clsx("relative flex-1 border-l ",
            isToday(date) ? "bg-blue-100" : "bg-white",)}>
            {/*date and views have to be set by hook not prop*/}
            <TimeCells day={date} view={"day"} />
            {isToday(date) &&  <TimeLine/>}
        </div>
    );
}
