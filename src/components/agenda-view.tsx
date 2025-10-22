import { AgendaDayGroup } from "@/components/agenda-view-components/agenda-day-group.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";
import { useEventStore } from "@/event-store";
import { Date_Format } from "@/helpers.ts";
import { mapAgendaEvents } from "@/lib/date-helpers";
import { endOfMonth, formatDate, startOfMonth } from "date-fns";
import { CalendarX2 } from "lucide-react";
import { useMemo } from "react";

export function AgendaView() {
  const { date } = useCalendar();
  const { getEventsByDateRange } = useEventStore();

  //getting the events by date making a map for them with the key as date string for each day in the range
  const monthDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const events = getEventsByDateRange(
    startOfMonth(monthDate),
    endOfMonth(monthDate),
  );

  const eventsByDay = useMemo(() => {
    return mapAgendaEvents(events, monthDate);
  }, [events, monthDate]);

  const hasEvents = events.length > 0;
  return (
    // <div className="mx-auto  max-w-screen-2xl  gap-4 px-8 py-4">
    // <div className="overflow-hidden rounded-xl border mx-auto"> these must be wrapped by the calendar provider
    <div className="h-[800px] border border-t-0 rounded-b-2xl ">
      <ScrollArea className="h-full" type="always">
        {hasEvents &&
          eventsByDay.map((dayGroup) => (
            <AgendaDayGroup
              key={formatDate(dayGroup.date, Date_Format.fullDate)}
              date={dayGroup.date}
              events={dayGroup.events}
              multiDayEvents={dayGroup.multiDayEvents}
            />
          ))}
        {!hasEvents && (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
            <CalendarX2 className="size-10" />
            <p className="text-sm md:text-base">No events scheduled</p>
          </div>
        )}
      </ScrollArea>
    </div>
    // </div>
    // </div>
  );
}
