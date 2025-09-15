import type {Views} from "@/types.ts";
import {addDays, addMonths, addWeeks, addYears} from "date-fns";

export default function DateAdderFunction(view:Views ,date:Date) {
    switch (view) {
        case "agenda":
            return date = addMonths(date, 1);
        case "year":
            return date = addYears(date, 1);
        case "month":
            return date = addMonths(date, 1);
        case "week":
            return date = addWeeks(date, 1);
        case "day":
            return date = addDays(date, 1);
        default:
            return date = addMonths(date, 1);
    }
};
