import { AgendaDayGroup } from "@/components/agenda-view-components/agenda-day-group.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { DATE_FORMAT } from "@/constants.ts";
import { useCalendar } from "@/context/calendar-context.tsx";
import { useEventStore } from "@/event-store";
import { mapAgendaEvents } from "@/lib/date-helpers";
import { endOfMonth, formatDate, startOfMonth } from "date-fns";
import { CalendarX2 } from "lucide-react";
import { useMemo } from "react";
import { Button } from "./ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

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
    <div className="h-[800px] border border-t-0 rounded-b-2xl ">
      <ScrollArea className="h-full" type="always">
        {hasEvents &&
          eventsByDay.map((dayGroup) => (
            <AgendaDayGroup
              key={formatDate(dayGroup.date, DATE_FORMAT.fullDate)}
              date={dayGroup.date}
              events={dayGroup.events}
              multiDayEvents={dayGroup.multiDayEvents}
            />
          ))}
        {!hasEvents && (
          <div className="flex flex-col items-center justify-center gap-2 py-20 text-muted-foreground">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CalendarX2 className="size-10" />
                </EmptyMedia>
                <EmptyTitle>No Events Scheduled</EmptyTitle>
                <EmptyDescription>
                  You don't have any event yet. Get started by creating your
                  first event.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button>Create Event</Button>
              </EmptyContent>
            </Empty>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
