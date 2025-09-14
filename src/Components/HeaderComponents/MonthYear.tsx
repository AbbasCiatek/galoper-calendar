import {formatDate} from "date-fns";
import {useContext} from "react";
import {DateContext} from "@/context.ts";

export default function MonthYear(){
const date:Date = useContext(DateContext);

    return (
        <p className="font-extrabold text-2xl pb-1 " >{formatDate(date,'MMMM yyyy')}</p>
    )
}