import {eachDayOfInterval, endOfWeek, startOfWeek} from "date-fns";

export function weekHelper (date:Date){

    const weekStart = startOfWeek(date,{weekStartsOn:1});
    const weekEnd = endOfWeek(date,{weekStartsOn:1});
    return eachDayOfInterval({
        start: weekStart,
        end: weekEnd,
    });
}
