import {formatDate} from "date-fns";
import {useCalendar} from "@/context/context.tsx";

export default function MonthYear(){
const {date} = useCalendar();

    return (
        <p className="font-extrabold text-2xl pb-1 " >{formatDate(date,'MMMM yyyy')}</p>
    )
}