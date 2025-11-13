import { AgendaEventCard } from "@/components/agenda-view-components/agenda-event-card.tsx";
import { DATE_FORMAT } from "@/constants.ts";
import type { Event } from "@/event-store.ts";
import { formatDate } from "date-fns";

interface Props {
  date: Date;
  events: Array<Event>;
  multiDayEvents: Array<Event>;
}

export function AgendaDayGroup({ date, events, multiDayEvents }: Props) {
  const sortedEvents = events.toSorted(
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
            return <AgendaEventCard key={event.id} event={event} date={date} />;
          })}

        {sortedEvents.length > 0 &&
          sortedEvents.map((event) => (
            <AgendaEventCard key={event.id} event={event} date={date} />
          ))}
      </div>
    </div>
  );
}
