import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog.tsx";
import {type ReactNode, useEffect, useState} from "react";
import type {Event} from "@/types.ts";
import {DialogTitle} from "@radix-ui/react-dialog";
import {Calendar, Clock,Text} from "lucide-react";
import {formatDate} from "date-fns";
import {Button} from "@/components/ui/button.tsx";
import AddEditEventDialog from "@/Components/Dialogs/Add-Edit-EventDialog.tsx";
import useEventStore from "@/EventStore.ts";
import {toast} from "sonner";
import {detailsFromColor, titleFromColor} from "@/helpers.ts";

type EventDetailsDialogProps = {
    children: ReactNode;
    event: Event;
}

export default function EventDetailsDialog({children,event}: EventDetailsDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () =>setIsOpen(false);
    const onToggle = () =>setIsOpen(!isOpen);
    const titleColor = titleFromColor(event.color);
    const detailsColor = detailsFromColor(event.color);

    const {removeEvent} = useEventStore();
    const handleDeleteButton = (event:Event)=>{
        onClose();
        removeEvent(event.id);
        toast.error(` Event ${event.id} Deleted!`);
    }
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "Delete" ) {
                handleDeleteButton(event);
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={onToggle} >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className={`${detailsColor}`}>
                <DialogHeader>
                    <DialogTitle className={`${titleColor} font-bold `} >{event.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="flex items-start gap-2">
                        <Calendar className="mt-1 size-4 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Start Date</p>
                            <p className="text-sm text-muted-foreground">{formatDate(event.startDate, "MMM d, yyyy h:mm a")}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Clock className="mt-1 size-4 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">End Date</p>
                            <p className="text-sm text-muted-foreground">{formatDate(event.endDate, "MMM d, yyyy h:mm a")}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Text className="mt-1 size-4 shrink-0" />
                        <div>
                            <p className="text-sm font-medium">Description</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <AddEditEventDialog event={event}>
                        <Button type="button" variant="outline">
                            Edit
                        </Button>
                    </AddEditEventDialog>
                    <Button type="button" variant="destructive" onClick={()=>handleDeleteButton(event)}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}