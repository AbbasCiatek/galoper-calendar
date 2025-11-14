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
import { clsx } from "clsx";
import { formatDate } from "date-fns";
import type { ReactNode } from "react";
import { EventDetailsDialog } from "./event-details-dialog";

type Props = {
  children: ReactNode;
  events: Array<Event>;
  date: Date;
};

const colorMap = {
  red: "bg-red-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  gray: "bg-gray-500",
  orange: "bg-orange-500",
};

export function EventListDialog({ children, events, date }: Props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="data-[state=open]:slide-in-from-bottom-[50%] data-[state=closed]:slide-out-to-top-[50%] duration-500  ">
        <DialogHeader>
          <DialogTitle className="font-bold">
            Events on{" "}
            {formatDate(
              date,
              `${DATE_FORMAT.longWeekDay} , ${DATE_FORMAT.longMonth} ${DATE_FORMAT.dayOfMonth}, ${DATE_FORMAT.longYear}`,
            )}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea scrollHideDelay={1} className=" max-h-40 rounded-md ">
          <div className="flex flex-col gap-0.5 rounded-md">
            {events.map((event) => (
              <EventDetailsDialog key={event.id} event={event}>
                <div
                  className={clsx(
                    colorMap[event.color],
                    "w-full h-10 border text-gray-100 flex flex-row items-center justify-between",
                  )}
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
