import {formatDate, isToday} from "date-fns";
import {clsx} from "clsx";

export default function DayDisplay({date}:{date:Date}){
    //"text-blue-500" : "text-muted-foreground"
    return(
        <div className="flex-1 border-l pt-2 pb-1 px-2">
        <div className="flex flex-col items-start text-xs font-medium  ">
            <div className="flex flex-col items-center gap-1">
            <span className={clsx("leading-none ",
                isToday(date) ? "text-blue-500" : "text-muted-foreground")}>
                {formatDate(date, "EE").toUpperCase()}
            </span>
            <span className={clsx("flex  justify-center items-center size-10 rounded-full", isToday(date) ? ' bg-blue-500 text-white':'text-foreground')}>
                <span className=" leading-none font-bold text-lg" >{formatDate(date, "d")}</span>
                               </span>
            </div>
        </div>
        </div>
    )
}