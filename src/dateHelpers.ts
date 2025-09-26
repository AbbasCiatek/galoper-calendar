import {addMonths, eachDayOfInterval, endOfMonth, getDay, startOfMonth, startOfYear} from "date-fns";

export  function daysInMonth(date: Date){
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    const firstDayIndex = getDay(firstDayOfMonth);
    const daysInMonth = eachDayOfInterval({
        start:firstDayOfMonth,
        end:lastDayOfMonth,
    })

    return {daysInMonth,firstDayIndex};
}

export  function getArrayMonth(date: Date) {
    const year = startOfYear(date);
    let i = 0;
    const months: Date[] = [];
    for (i = 0; i < 12; i++){
        months.push( addMonths(year, i));
    }
    return months;
}