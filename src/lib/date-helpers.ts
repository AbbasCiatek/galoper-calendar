import { DATE_FORMAT } from "@/constants.ts";
import { type Event, useEventStore } from "@/event-store";
import type { ViewTypes } from "@/types.ts";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  areIntervalsOverlapping,
  differenceInMinutes,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  formatDate,
  getDay,
  isSameDay,
  isSameMonth,
  setDate,
  startOfDay,
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

function DateSubtracterFunction(view: ViewTypes, date: Date) {
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

export default DateSubtracterFunction;

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

export function getNumberOfEvents(date: Date, view: ViewTypes) {
  const { getEventsByDateRange } = useEventStore();
  switch (view) {
    case "agenda":
      return getEventsByDateRange(startOfMonth(date), endOfMonth(date)).length;
    case "year":
      return getEventsByDateRange(startOfYear(date), endOfYear(date)).length;
    case "month":
      return getEventsByDateRange(startOfMonth(date), endOfMonth(date)).length;
    case "week":
      return getEventsByDateRange(
        startOfWeek(date, { weekStartsOn: 1 }),
        endOfWeek(date, { weekStartsOn: 1 }),
      ).length;
    case "day":
      return getEventsByDateRange(startOfDay(date), endOfDay(date)).length;
  }
}
export function getArrayOfMonthsOfYear(date: Date) {
  const year = startOfYear(date);
  const months: Array<Date> = [];
  Array.from({ length: 12 }, (_, i) => {
    months.push(addMonths(year, i));
  });

  return months;
}

export function getCalendarCellsOfMonth(
  date: Date,
  weekStartAtMonday: boolean,
) {
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const prevMonth = subMonths(firstDayOfMonth, 1);
  const nextMonth = addMonths(firstDayOfMonth, 1);
  const indexOfFirstDay = weekStartAtMonday
    ? (getDay(firstDayOfMonth) + 6) % 7
    : getDay(firstDayOfMonth);
  const daysNumber = indexOfFirstDay + lastDayOfMonth.getDate();
  const cellsNumber = daysNumber === 28 ? 28 : daysNumber <= 35 ? 35 : 42;

  const daysInPrevMonth = eachDayOfInterval({
    start: startOfMonth(prevMonth),
    end: endOfMonth(prevMonth),
  });

  const displayedDaysOfPrevMonth = daysInPrevMonth.splice(
    daysInPrevMonth.length - indexOfFirstDay,
  );

  const daysInCurrentMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const displayedDaysInNextMonth = eachDayOfInterval({
    start: nextMonth,
    end: setDate(nextMonth, cellsNumber - daysNumber),
  });

  const prevMonthObject = displayedDaysOfPrevMonth.map((day) => ({
    day,
    currentMonth: false,
  }));

  const currentMonthObject = daysInCurrentMonth.map((day) => ({
    day,
    currentMonth: true,
  }));

  const nextMonthObject =
    prevMonthObject.length + currentMonthObject.length === 28 ||
    prevMonthObject.length + currentMonthObject.length === 35
      ? null
      : displayedDaysInNextMonth.map((day) => ({
        day,
        currentMonth: false,
      }));

  if (nextMonthObject) {
    return [...prevMonthObject, ...currentMonthObject, ...nextMonthObject];
  }
  return [...prevMonthObject, ...currentMonthObject];
}

export function daysOfWeek(date: Date) {
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });
}

export function groupEvents(dayEvents: Array<Event>): Array<Array<Event>> {
  const sortedEvents = dayEvents.sort(
    (a, b) => a.startDate.getTime() - b.startDate.getTime(),
  );
  const groups: Array<Array<Event>> = [];

  for (const event of sortedEvents) {
    const eventStart = event.startDate;
    let placed = false;

    for (const group of groups) {
      const lastEventInGroup = group[group.length - 1];
      const lastEventEnd = lastEventInGroup.endDate;

      if (eventStart >= lastEventEnd) {
        group.push(event);
        placed = true;
        break;
      }
    }

    if (!placed) groups.push([event]);
  }

  return groups;
}

export function positionEventsWeekDayView(
  event: Event,
  groupIndex: number,
  groupsSize: number,
) {
  const startMinutes =
    event.startDate.getMinutes() + event.startDate.getHours() * 60;
  const durationMinutes = differenceInMinutes(event.endDate, event.startDate);
  const containerPx = 24 * 96;
  const top = (startMinutes / 1440) * containerPx;
  const height = (durationMinutes / 1440) * containerPx;
  const width = 100 / groupsSize;
  const left = groupIndex * width;

  return { top, height, left, width };
}
export function maxNumberOfAllAndMultiEventsPerDay(
  day: Date,
  eventsOfWeek: Array<Event>,
) {
  const eventsPerDay = eventsOfWeek.filter((event) => {
    return areIntervalsOverlapping(
      { start: startOfDay(day), end: endOfDay(day) },
      { start: event.startDate, end: event.endDate },
    );
  });
  return eventsPerDay.length;
}

export function maxNumberOfAllAndMultiEventsPerWeek(
  weekDays: Array<Date>,
  eventsOfWeek: Array<Event>,
) {
  let maxEventNumberPerWeek = 0;

  weekDays.forEach((day) => {
    const eventsPerDay = eventsOfWeek.filter((event) => {
      return areIntervalsOverlapping(
        { start: startOfDay(day), end: endOfDay(day) },
        { start: event.startDate, end: event.endDate },
      );
    });
    maxEventNumberPerWeek = Math.max(
      eventsPerDay.length,
      maxEventNumberPerWeek,
    );
  });

  return maxEventNumberPerWeek;
}

export function mapAgendaEvents(events: Array<Event>, date: Date) {
  const singleDayEvents = events.filter((event: Event) =>
    isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const multiDayEvents = events.filter(
    (event: Event) =>
      !isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const allDates = new Map<
    string,
    { date: Date; events: Array<Event>; multiDayEvents: Array<Event> }
  >();

  singleDayEvents.forEach((event) => {
    const eventDate = new Date(event.startDate);
    if (!isSameMonth(eventDate, date)) return;

    const dateKey = formatDate(eventDate, DATE_FORMAT.fullDate);

    if (!allDates.has(dateKey)) {
      allDates.set(dateKey, {
        date: startOfDay(eventDate),
        events: [],
        multiDayEvents: [],
      });
    }

    allDates.get(dateKey)?.events.push(event);
  });

  multiDayEvents.forEach((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);

    let currentDate = startOfDay(eventStart);
    const lastDate = endOfDay(eventEnd);

    while (currentDate <= lastDate) {
      if (isSameMonth(currentDate, date)) {
        const dateKey = formatDate(currentDate, DATE_FORMAT.fullDate);

        if (!allDates.has(dateKey)) {
          allDates.set(dateKey, {
            date: new Date(currentDate),
            events: [],
            multiDayEvents: [],
          });
        }

        allDates.get(dateKey)?.multiDayEvents.push(event);
      }
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
  });

  return Array.from(allDates.values()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
}

function positionPerDay(cells: Array<{ day: Date; currentMonth: boolean }>) {
  const positions: Record<string, Array<boolean>> = {};
  cells.forEach((cell) => {
    positions[startOfDay(cell.day).toISOString()] =
      Array(MAX_EVENTS_PER_DAY).fill(false);
  });
  return positions;
}

type Cell = {
  day: Date;
  currentMonth: boolean;
};
export function chunkCells(arr: Array<Cell>) {
  const result: Array<Array<Cell>> = [];
  for (let i = 0; i < arr.length; i += 7) {
    result.push(arr.slice(i, i + 7));
  }
  return result;
}

export function calculateEventPositionsPerDurations(
  events: Array<Event>,
  cells: Array<Cell>,
) {
  const eventPositions: Record<string, number> = {};
  const occupiedPositions = positionPerDay(cells);

  const singleDayEvents = events.filter((event) =>
    isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const multiDayEvents = events.filter(
    (event) => !isSameDay(new Date(event.startDate), new Date(event.endDate)),
  );

  const sortedEvents = [
    ...multiDayEvents.sort(
      //sort by start -> duration ->title alphabet
      (a, b) => {
        const aDuration =
          new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
        const bDuration =
          new Date(b.endDate).getTime() - new Date(b.startDate).getTime();

        const startDiff =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
        if (startDiff !== 0) return startDiff;

        const durationDiff = aDuration - bDuration;
        if (durationDiff !== 0) return durationDiff;

        return a.title.localeCompare(b.title);
      },
    ),
    ...singleDayEvents.sort((a, b) => {
      const aDuration =
        new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
      const bDuration =
        new Date(b.endDate).getTime() - new Date(b.startDate).getTime();

      const startDiff =
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (startDiff !== 0) return startDiff;

      const durationDiff = aDuration - bDuration;
      if (durationDiff !== 0) return durationDiff;

      return a.title.localeCompare(b.title);
    }),
  ];

  const firstCell = cells[0];
  const lastCell = cells.slice(-1)[0];

  sortedEvents.forEach((event) => {
    const eventStart = new Date(event.startDate);
    const eventEnd = new Date(event.endDate);
    const eventDays = eachDayOfInterval({
      start: eventStart < firstCell.day ? firstCell.day : eventStart,
      end: eventEnd > lastCell.day ? lastCell.day : eventEnd,
    });

    let position = -1;

    for (let i = 0; i < MAX_EVENTS_PER_DAY; i++) {
      if (
        eventDays.every((day) => {
          const dayPositions = occupiedPositions[startOfDay(day).toISOString()];
          return dayPositions && !dayPositions[i];
        })
      ) {
        position = i;
        break;
      }
    }
    if (position !== -1) {
      eventDays.forEach((day) => {
        const dayKey = startOfDay(day).toISOString();
        occupiedPositions[dayKey][position] = true;
      });
      eventPositions[event.id] = position;
    }
  });

  return eventPositions;
}

export function assignPositionForCellEvents(
  events: Array<Event>,
  eventPositions: Record<string, number>,
) {
  return events
    .map((event) => {
      return {
        ...event,
        position: eventPositions[event.id] ?? -1,
      };
    })
    .sort((a, b) => {
      const aMultiDay = !isSameDay(new Date(a.startDate), new Date(a.endDate));
      const bMultiDay = !isSameDay(new Date(b.startDate), new Date(b.endDate));

      const aDuration =
        new Date(a.endDate).getTime() - new Date(a.startDate).getTime();
      const bDuration =
        new Date(b.endDate).getTime() - new Date(b.startDate).getTime();

      if (aMultiDay && !bMultiDay) return -1;
      if (!aMultiDay && bMultiDay) return 1;

      const startDiff =
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (startDiff !== 0) return startDiff;

      const durationDiff = aDuration - bDuration;
      if (durationDiff !== 0) return durationDiff;

      return a.title.localeCompare(b.title);
    });
}

// normal cell height. This fn give max event count of week (used in day-cell comp)
// without this function the cell will take the height of MAX_EVENTS_PER_DAY*h-6 (if there only one event in all week)
//needed especially in if u want to give access to user to change MAX_EVENTS_PER_DAY or min to max range

export function maxNumberOfEventsPerInterval(
  interval: Array<Cell>,
  eventsOfCells: Array<Event>,
) {
  let maxEventNumberPerInterval = 0;

  interval.forEach((cell) => {
    const eventsPerCell = eventsOfCells.filter((event) => {
      return areIntervalsOverlapping(
        { start: startOfDay(cell.day), end: endOfDay(cell.day) },
        { start: event.startDate, end: event.endDate },
      );
    });
    maxEventNumberPerInterval = Math.max(
      eventsPerCell.length,
      maxEventNumberPerInterval,
    );
  });

  return maxEventNumberPerInterval;
}
