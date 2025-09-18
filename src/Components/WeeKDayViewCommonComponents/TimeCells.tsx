import {Hours} from "@/helpers.ts";
import {clsx} from "clsx";
import {isToday} from "date-fns";

export default function TimeCells({day,view}:{day:Date,view:string} ) {

    return (
        <>
            {Hours.map((hour, index) => {
                return (
                    <div key={hour} className="relative h-12" >
                        {index !== 0 && <div className="pointer-events-none absolute inset-x-0 top-0 border-b"></div>}
                        <div className={clsx("absolute inset-x-0 top-0 h-6 cursor-pointer ", view==="week" && isToday(day) ? "hover:bg-blue-50 ": "  hover:bg-accent")} />
                        <div className={clsx("pointer-events-none absolute inset-x-0 top-1/2 border-b ", view==="week" && isToday(day) ? " border-dashed border-gray-300 " : "border-dashed" )}></div>
                        <div className={clsx("absolute inset-x-0 top-6 h-6 cursor-pointer ", view==="week" && isToday(day) ? "hover:bg-blue-50": "  hover:bg-accent")} />
                    </div>
                );
            })}
        </>
    )
}