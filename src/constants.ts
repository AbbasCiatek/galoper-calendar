export const HOURS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
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
  fullDateWithWeek: "EEEE MMMM d yyyy",
  dayOfMonth: "d",
  shortWeekDay: "EE",
  hours24Format: "HH",
  timeFormat: "hh:mm a",
  fullDateAndTime: "dd MMM yyyy hh:mm a",
};

export const colorMap: Record<string, string> = {
  red: "bg-red-100 text-red-900 border border-red-400 ",
  green: "bg-green-100 text-green-900 border border-green-400 ",
  blue: "bg-blue-100 text-blue-900 border border-blue-400 ",
  yellow: "bg-yellow-100 text-yellow-900 border border-yellow-400 ",
  gray: "bg-gray-100 text-gray-900 border border-gray-400 ",
  purple: "bg-purple-100 text-purple-900 border border-purple-400 ",
  orange: "bg-orange-100 text-orange-900 border border-orange-400 ",
};

export const MAX_ALL_AND_MULTI_DAY_EVENTS = 2;
export const MAX_EVENTS_PER_DAY = 4;
