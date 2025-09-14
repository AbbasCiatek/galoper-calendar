import {endOfMonth, endOfWeek, endOfYear, formatDate, startOfMonth, startOfWeek, startOfYear} from "date-fns";
import type {Views} from "@/types.ts";

export function rangeDisplayer(view: Views, date: Date) {
    const formatString = "MMM d, yyyy";
    let start: Date;
    let end: Date;

    switch (view) {
        case "agenda":
            start = startOfMonth(date);
            end = endOfMonth(date);
            break;
        case "year":
            start = startOfYear(date);
            end = endOfYear(date);
            break;
        case "month":
            start = startOfMonth(date);
            end = endOfMonth(date);
            break;
        case "week":
            start = startOfWeek(date,{weekStartsOn:1});
            end = endOfWeek(date,{weekStartsOn:1});
            break;
        case "day":
            return formatDate(date, formatString);
        default:
            return "Error while formatting ";
    }

    return `${formatDate(start, formatString)} - ${formatDate(end, formatString)}`;
}
