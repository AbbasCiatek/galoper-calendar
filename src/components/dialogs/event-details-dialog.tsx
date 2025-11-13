import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { DATE_FORMAT } from "@/constants";
import { type Event, useEventStore } from "@/event-store.ts";
import { clsx } from "clsx";
import { formatDate } from "date-fns";
import { Calendar, Clock, Text } from "lucide-react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { AddEditEventDialog } from "./add-edit-event-dialog";

type EventDetailsDialogProps = {
  children: ReactNode;
  event: Event;
};

const colorMap = {
  red: { title: "text-red-500", details: "text-red-900" },
  green: { title: "text-green-500", details: "text-green-900" },
  yellow: { title: "text-yellow-500", details: "text-yellow-900" },
  blue: { title: "text-blue-500", details: "text-blue-900" },
  purple: { title: "text-purple-500", details: "text-purple-900" },
  orange: { title: "text-orange-500", details: "text-orange-900" },
  gray: { title: "text-gray-500", details: "text-gray-900" },
};
export function EventDetailsDialog({
  children,
  event,
}: EventDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { removeEvent } = useEventStore();
  const handleDeleteButton = useCallback(
    (event: Event) => {
      setIsOpen(false);
      removeEvent(event.id);
      toast.error(` Event ${event.title} Deleted!`);
    },
    [removeEvent],
  );
  // TODO confirmation delete on "Delete" button press dialog
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Delete") {
        handleDeleteButton(event);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [event, handleDeleteButton]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="data-[state=open]:slide-in-from-bottom-[50%] data-[state=closed]:slide-out-to-top-[50%] duration-500">
        <DialogHeader>
          <DialogTitle className={`${colorMap[event.color].title} font-bold `}>
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className={clsx(colorMap[event.color].details, "space-y-4")}>
          <div className="flex items-start gap-2">
            <Calendar className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(event.startDate, DATE_FORMAT.fullDateAndTime)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(event.endDate, DATE_FORMAT.fullDateAndTime)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Text className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {event.description === ""
                  ? "No Description"
                  : event.description}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          {/* clicking edit triggers add edit event dialog component */}
          <AddEditEventDialog event={event}>
            <Button type="button" variant="outline">
              Edit
            </Button>
          </AddEditEventDialog>
          <Button
            type="button"
            variant="destructive"
            onClick={() => handleDeleteButton(event)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
