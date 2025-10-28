import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { DATE_FORMAT } from "@/constants.ts";
import type { Event } from "@/event-store.ts";
import { formatDate } from "date-fns";
import type { ReactNode } from "react";
import { EventDetailsDialog } from "./event-details-dialog";

type Props = {
  children: ReactNode;
  events: Array<Event>;
  date: Date;
};
export function EventListDialog({ children, events, date }: Props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="data-[state=open]:slide-in-from-bottom-[50%] data-[state=closed]:slide-out-to-top-[50%] duration-500  ">
        <DialogHeader>
          <DialogTitle className="mb-2 p-1 font-bold">
            Events on{" "}
            {formatDate(
              date,
              `${DATE_FORMAT.longWeekDay} , ${DATE_FORMAT.longMonth} ${DATE_FORMAT.dayOfMonth}, ${DATE_FORMAT.longYear}`,
            )}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-28 border border-gray-200 rounded-lg ">
          <div className="flex flex-col gap-2">
            {events.map((event) => (
              <EventDetailsDialog key={event.id} event={event}>
                <div
                  key={event.id}
                  className={`bg-${event.color}-300 w-full h-8 text-white flex flex-row justify-around `}
                >
                  <span>{event.title}</span>
                  <span>
                    {formatDate(
                      new Date(event.startDate),
                      DATE_FORMAT.timeFormat,
                    )}
                  </span>
                </div>
              </EventDetailsDialog>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
