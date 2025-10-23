export const WEEK_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

export const DATE_FORMAT = {
  longMonth: "MMMM",
  fullDate: "dd MMM yyyy",
  dayOfMonth: "d",
};
export function lowerSliceWord(word: string, sliceAt: number) {
  if (!word) return "";
  return (word.charAt(0) + word.slice(1).toLowerCase()).slice(0, sliceAt);
}
