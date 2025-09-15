
import {useCalendar} from "@/context/context.tsx";
import type {Views} from "@/types.ts";
import {CalendarDays, CalendarRange, ClipboardList, Columns4, Grid3x3} from "lucide-react";
import {clsx} from "clsx";


export default function ViewChanger(){

    const {view , setView} = useCalendar();

    const handleYearClick = (view:Views) => {
        if (view !== "year") {
            view = "year";
            setView(view);
        }
    };
    const handleMonthClick = (view:Views) => {
        if (view !== "month") {
            view = "month";
            setView(view);
        }
    };
    const handleWeekClick = (view:Views) => {
        if (view !== "week") {
            view = "week";
            setView(view);
        }
    };
    const handleDayClick = (view:Views) => {
        if (view !== "day") {
            view = "day";
            setView(view);
        }
    };
    const handleAgendaClick = (view:Views) => {
        if (view !== "agenda") {
            view = "agenda";
            setView(view);
        }
    };

    return (
        <div className="flex gap-4 text-sm  text-gray-600 ">
        <button className={clsx ("flex gap-2 active:scale-50 duration-500 ",
            view==='agenda' && "mx-2"
            )}
                value="agenda">
            <CalendarRange className="size-5" onClick={()=> handleAgendaClick(view)} />
            {view==='agenda' && <span> Agenda </span>}
        </button>
            <button  className={clsx ("flex gap-2 active:scale-50 duration-500 ",
                view==='day' && "mx-2"
            )}  value='day' >
                <ClipboardList className="size-5 "  onClick={()=>handleDayClick(view)}/>
                {view==='day'  && <span> Day </span>}
            </button>
            <button  className={clsx ("flex gap-2 active:scale-50 duration-500 ",
                view==='week' && "mx-2"
            )}  value='week'  >
                <Columns4  className="size-5 "  onClick={()=>handleWeekClick(view)}/>
                {view==='week' && <span> Week </span>}
            </button>
            <button className={clsx ("flex gap-2 active:scale-50 duration-500 ",
                view==='month' && "mx-2"
            )}  value='month' >
                <Grid3x3 className="size-5 "  onClick={()=>handleMonthClick(view)}  />
                { view==='month' &&   <span> Month </span> }
            </button>
            <button  className={clsx ("flex gap-2 active:scale-50 duration-500 ",
                view==='year' && "mx-2"
            )}  value='year' >
                <CalendarDays className="size-5 " onClick={()=>handleYearClick(view)} />
                { view==='year' && <span> Year </span>}
            </button>
        </div>
    );
}