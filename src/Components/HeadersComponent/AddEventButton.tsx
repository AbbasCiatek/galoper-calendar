import {PlusIcon} from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddEventDialog() {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">  <PlusIcon />  Add Event</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Event Details</DialogTitle>
                        <DialogDescription>
                           Create Event
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="event-title">Event Title</Label>
                            <Input id="event-title" name="event-title" defaultValue="Event" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="event-description">Event Description</Label>
                            <Input id="event-description" name="event-description" defaultValue="" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create Event</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
