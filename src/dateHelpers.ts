import type { ViewTypes } from "@/types.ts";
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

export function DateAdderFunction(view: ViewTypes, date: Date) {
  switch (view) {
    case "agenda":
      return addMonths(date, 1);
    case "year":
      return addYears(date, 1);
    case "month":
      return addMonths(date, 1);
    case "week":
      return addWeeks(date, 1);
    case "day":
      return addDays(date, 1);
    default:
      return addMonths(date, 1);
  }
}

export function DateSubtracterFunction(view: ViewTypes, date: Date) {
  switch (view) {
    case "agenda":
      return subMonths(date, 1);
    case "year":
      return subYears(date, 1);
    case "month":
      return subMonths(date, 1);
    case "week":
      return subWeeks(date, 1);
    case "day":
      return subDays(date, 1);
    default:
      return subMonths(date, 1);
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
