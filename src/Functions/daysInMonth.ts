import {eachDayOfInterval, endOfMonth, getDay, startOfMonth} from "date-fns";

export default function daysInMonth(date: Date){
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const firstDayIndex = getDay(firstDayOfMonth);
    const daysInMonth = eachDayOfInterval({
        start:firstDayOfMonth,
        end:lastDayOfMonth,
    })

    return {daysInMonth,firstDayIndex};

}