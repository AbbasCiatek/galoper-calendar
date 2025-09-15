import {formatDate} from "date-fns";
import {today} from "@/helpers.ts";
import {useCalendar} from "@/context/context.tsx";

export default function TodayButton(){

    const {date,setDate} = useCalendar();

    const handleClick = (date:Date,)=>{
    if(date !== today){
        setDate(today);
        console.log(date);
    }
    };

    return(
        <button
            onClick={()=>handleClick(date)}
            className="border text-center size-16 pt-1 rounded-lg cursor-pointer dark:bg-black dark:text-white">
            { formatDate(today,"MMM").toUpperCase() }
            <p className="pt-1.5 w-full h-9 bg-black rounded-b-lg pb-[2px] text-white dark:text-black dark:bg-white ">
                {today.getDate()}
            </p>
        </button>
    )
}