import {
	addDays,
	addMonths,
	addWeeks,
	addYears,
	endOfMonth,
	endOfWeek,
	endOfYear,
	formatDate,
	startOfMonth,
	startOfWeek,
	startOfYear,
	subDays,
	subMonths,
	subWeeks,
	subYears,
} from "date-fns";
import type { ViewTypes } from "@/types.ts";

export function DateAdderFunction(view: ViewTypes, date: Date) {
	switch (view) {
		case "agenda":
			return (date = addMonths(date, 1));
		case "year":
			return (date = addYears(date, 1));
		case "month":
			return (date = addMonths(date, 1));
		case "week":
			return (date = addWeeks(date, 1));
		case "day":
			return (date = addDays(date, 1));
		default:
			return (date = addMonths(date, 1));
	}
}

export function DateSubtracterFunction(view: ViewTypes, date: Date) {
	switch (view) {
		case "agenda":
			return (date = subMonths(date, 1));
		case "year":
			return (date = subYears(date, 1));
		case "month":
			return (date = subMonths(date, 1));
		case "week":
			return (date = subWeeks(date, 1));
		case "day":
			return (date = subDays(date, 1));
		default:
			return (date = subMonths(date, 1));
	}
}

export function rangeDisplayer(view: ViewTypes, date: Date) {
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
			start = startOfWeek(date, { weekStartsOn: 1 });
			end = endOfWeek(date, { weekStartsOn: 1 });
			break;
		case "day":
			return formatDate(date, formatString);
		default:
			return "Error while formatting ";
	}

	return `${formatDate(start, formatString)} - ${formatDate(end, formatString)}`;
}
