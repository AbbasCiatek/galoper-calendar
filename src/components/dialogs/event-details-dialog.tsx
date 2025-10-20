// import { AddEditEventDialog } from "@/components/dialogs/Add-Edit-EventDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { type Event, useEventStore } from "@/event-store.ts";
import { formatDate } from "date-fns";
import { Calendar, Clock, Text } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";

type EventDetailsDialogProps = {
  children: ReactNode;
  event: Event;
};

const titleColorMap: Record<string, string> = {
  red: "text-red-500",
  green: "text-green-500",
  yellow: "text-yellow-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
  gray: "text-gray-500",
};
export const detailsColorMap: Record<string, string> = {
  red: "text-red-300",
  green: "text-green-300",
  yellow: "text-yellow-300",
  blue: "text-blue-300",
  purple: "text-purple-300",
  orange: "text-orange-300",
  gray: "text-gray-300",
};

export function EventDetailsDialog({
  children,
  event,
}: EventDetailsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);

  const { removeEvent } = useEventStore();
  const handleDeleteButton = (event: Event) => {
    onClose();
    removeEvent(event.id);
    toast.error(` Event ${event.id} Deleted!`);
  };
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
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className={detailsColorMap[event.color]}>
        <DialogHeader>
          <DialogTitle className={`${titleColorMap[event.color]} font-bold `}>
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <Calendar className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Start Date</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(event.startDate, "MMM d, yyyy h:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">End Date</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(event.endDate, "MMM d, yyyy h:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Text className="mt-1 size-4 shrink-0" />
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {event.description}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          {/* clicking edit triggers add edit event dialog component */}
          {/*<AddEditEventDialog event={event}>*/}
          {/*  <Button type="button" variant="outline">*/}
          {/*    Edit*/}
          {/*  </Button>*/}
          {/*</AddEditEventDialog>*/}
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
