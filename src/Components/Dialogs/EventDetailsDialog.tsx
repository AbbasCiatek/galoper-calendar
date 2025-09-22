import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog.tsx";
import {type ReactNode, useState} from "react";
import type {Event} from "@/types.ts";
import {DialogTitle} from "@radix-ui/react-dialog";
import {Calendar, Clock,Text} from "lucide-react";
import {formatDate} from "date-fns";
import {Button} from "@/components/ui/button.tsx";
import AddEditEventDialog from "@/Components/Dialogs/Add-Edit-EventDialog.tsx";
import useEventStore from "@/EventStore.ts";
import {toast} from "sonner";
type EventDetailsDialogProps = {
    children: ReactNode;
    event: Event;
}
const titleFromColor = (colorSelected:string)=>{
    switch(colorSelected){
        case "red":return "text-red-500";
        case "green":return"text-green-500";
        case "yellow":return"text-yellow-500";
        case "blue":return"text-blue-500";
        case "purple":return"text-purple-500";
        case "orange":return"text-orange-500";
        case "gray":return"text-gray-500";
        default:return "text-gray-800"
    }
}
const detailsFromColor = (colorSelected:string)=>{
    switch(colorSelected){
        case "red":return "text-red-300";
        case "green":return"text-green-300";
        case "yellow":return"text-yellow-300";
        case "blue":return"text-blue-300";
        case "purple":return"text-purple-300";
        case "orange":return"text-orange-300";
        case "gray":return"text-gray-300";
        default:return "text-white"
    }
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