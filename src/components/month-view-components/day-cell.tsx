import { colorMap } from "@/helpers";
import { getMonthCellEvents } from "@/lib/date-helpers";
import type { Event } from "@/types";
import { clsx } from "clsx";
import { formatDate, isMonday, isSameDay, isToday } from "date-fns";
type TProps = {
  cell: { day: Date; currentMonth: boolean };
  events: Array<Event>;
  eventPositions: Record<string, number>;
};
export default function DayCell({ cell, events, eventPositions }: TProps) {
  const eventsForDay = getMonthCellEvents(cell.day, events, eventPositions);
  const positionMap: Record<number, string> = {
    0: "",
    1: "top-[42px]",
    2: "top-[63px]",
  };
  return (
    <div
      className={clsx(
        "relative border-l border-t  overflow-hidden h-full min-h-[120px] flex flex-col",
        isMonday(cell.day) && "border-l-0",
        "bg-white",
      )}
    >
      <div
        className={clsx(
          "flex w-5 h-5 items-center justify-center rounded-full text-xs font-semibold flex-shrink-0",
          !cell.currentMonth && "opacity-20",
          isToday(cell.day) && "bg-primary font-bold text-primary-foreground",
        )}
      >
        {formatDate(cell.day, "d")}
      </div>

      <div className="flex flex-col  flex-1">
        {eventsForDay.length > 0 &&
          eventsForDay.slice(0, 3).map((event) => {
            return (
              <div
                key={event.id}
                className={clsx(
                  `px-2 absolute left-0 right-0 flex justify-between cursor-pointer ${colorMap[event.color]} ${positionMap[event.position]}  truncate font-bold  h-5 rounded m-1 text-xs`,
                  !isSameDay(cell.day, event.startDate) &&
                    "border-l-0 rounded-l-none ml-0 ",
                  !isSameDay(cell.day, event.endDate) &&
                    "border-r-0 rounded-r-none mr-0 ",
                  !cell.currentMonth && "opacity-40",
                )}
              >
                <span>
                  {(!event.isMultiDay ||
                    (event.isMultiDay && event.isFirstDay)) &&
                    event.title}
                </span>
                <span>
                  {(!event.isMultiDay ||
                    (event.isMultiDay && event.isLastDay)) &&
                    formatDate(new Date(event.startDate), "hh:mm")}
                </span>
              </div>
            );
          })}
        {eventsForDay.length > 3 && (
          // <EventListDialog>
          <div
            className={clsx(
              "absolute border rounded-full px-1 border-gray-200 bottom-2 right-2 text-xs  text-gray-500 font-semibold ",
              !cell.currentMonth && "opacity-40",
            )}
          >
            <span className="px-1">
              {" "}
              +{eventsForDay.length - 3}{" "}
              <span className="hidden md:inline-block">more</span>
            </span>
          </div>
          // </EventListDialog>
        )}
      </div>
    </div>
  );
}
