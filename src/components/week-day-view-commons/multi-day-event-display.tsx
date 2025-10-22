import type { Event } from "@/event-store.ts";
import { colorMap } from "@/helpers.ts";

interface Props {
  event: Event;
  eventCurrentDay?: number;
  eventTotalDays?: number;
  position: "first" | "middle" | "last" | "none";
}

export function MultiDayEventDisplay({
  event,
  eventCurrentDay,
  eventTotalDays,
  position,
}: Props) {
  if (!position) {
    position = "none";
  }
  const positionClasses = {
    none: "rounded-md mx-2",
    first: "rounded-l-md border-r-0 z-10 ml-2 w-[calc(100%_+_4px)]",
    middle: "border-x-0 z-10 w-[calc(100%_+_4px)] ",
    last: "rounded-r-md border-l-0 mr-2 ",
  }[position];

  return (
    <div
      className={`flex items-center h-6.5 px-2 text-[6px] font-thin sm:text-xs sm:font-medium truncate cursor-pointer  ${positionClasses} ${colorMap[event.color]} `}
    >
      <p>
        {eventCurrentDay && (
          <span className="text-xs">
            Day {eventCurrentDay} of {eventTotalDays} •{" "}
          </span>
        )}
        {position === "first" || position === "none" ? event.title : null}
      </p>
    </div>
  );
}
