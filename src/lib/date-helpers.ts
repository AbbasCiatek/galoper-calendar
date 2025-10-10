import { addMonths, startOfYear } from "date-fns";

export default function getArrayMonth(date: Date) {
  const year = startOfYear(date);
  const months: Array<Date> = [];
  for (let i = 0; i < 12; i++) {
    months.push(addMonths(year, i));
  }
  return months;
}
