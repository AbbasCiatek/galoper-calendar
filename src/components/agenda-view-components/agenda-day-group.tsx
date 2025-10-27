import { AgendaEventCard } from "@/components/agenda-view-components/agenda-event-card.tsx";
import { DATE_FORMAT } from "@/constants.ts";
import type { Event } from "@/event-store.ts";
import { differenceInDays, formatDate, startOfDay } from "date-fns";

interface Props {
  date: Date;
  events: Array<Event>;
  multiDayEvents: Array<Event>;
}

export function AgendaDayGroup({ date, events, multiDayEvents }: Props) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  return (
    <div>
      <div className="mt-4 mb-2">
        <p className="text-xs text-muted-foreground font-semibold  ">
          {formatDate(date, DATE_FORMAT.fullDateWithWeek)}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {multiDayEvents.length > 0 &&
          multiDayEvents.map((event) => {
            const eventStart = startOfDay(new Date(event.startDate));
            const eventEnd = startOfDay(new Date(event.endDate));
            const currentDate = startOfDay(date);

            const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
            const eventCurrentDay =
              differenceInDays(currentDate, eventStart) + 1;
            return (
              <AgendaEventCard
                key={event.id}
                event={event}
                eventCurrentDay={eventCurrentDay}
                eventTotalDays={eventTotalDays}
              />
            );
          })}

        {sortedEvents.length > 0 &&
          sortedEvents.map((event) => (
            <AgendaEventCard key={event.id} event={event} />
          ))}
      </div>
    </div>
  );
}
