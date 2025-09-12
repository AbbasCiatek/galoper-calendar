import {formatDate} from "date-fns";

export default function MonthYear(){
    const today =new Date();


    return (
        <p className="font-extrabold text-2xl pb-1 " >{formatDate(today,'MMMM yyyy')}</p>
    )
}