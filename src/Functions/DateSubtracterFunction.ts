import type {Views} from "@/types.ts";
import {subDays, subMonths, subWeeks, subYears} from "date-fns";

export default function DateSubtracterFunction(view:Views ,date:Date) {
    switch (view) {
        case "agenda":
            return date = subMonths(date, 1);
        case "year":
            return date = subYears(date, 1);
        case "month":
            return date = subMonths(date, 1);
        case "week":
            return date = subWeeks(date, 1);
        case "day":
            return date = subDays(date, 1);
        default:
            return date = subMonths(date, 1);
    }
};
