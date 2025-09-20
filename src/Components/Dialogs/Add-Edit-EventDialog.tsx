import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger} from "@/components/ui/dialog.tsx";
import {type ReactNode, useId, useState} from "react";
import {DialogTitle} from "@radix-ui/react-dialog";
import type {Event} from "@/types.ts";
import {Form} from "@/components/ui/form.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {type EventFormData, eventSchema,} from "@/schema.ts";
import {toast} from "sonner";
import useEventStore from "@/EventStore.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {addHours} from "date-fns";
// for all option (when clicking on a button, clicking on a time cell, or clicking on event edit button)

type AddEventDialogProps = {
    children: ReactNode;
    startDate?: Date;
    endDate?: Date;
    event?: Event;
}

// the start time  will be got from the cell clicked
export default function AddEditEventDialog({
                                               children,
                                               startDate,
                                               endDate,
                                               event
                                           }:AddEventDialogProps ) {

    const date = new Date(); // will be used for now but when implementing useCalendar hook get the date from it ...
    const generatedId = useId();
    const id = event ? event.id : generatedId;
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () =>setIsOpen(false);
    const {addEvent, editEvent} = useEventStore();
    const oneHourAdded = addHours(date,1);
    const startDateDefaults = startDate ? startDate : event ? event?.startDate : date ;
    const endDateDefaults = endDate ? endDate : event ? event?.endDate : oneHourAdded ;


    const form = useForm<EventFormData>({
        resolver:zodResolver(eventSchema),
        defaultValues:{
            title: event ? event.title :"",
            description: event ? event.description :"",
            isAllDay: event ? event.isAllDay : false,
            color: event ? event.color :"blue",
            startDate: startDateDefaults,
            endDate: endDateDefaults,
        }
    });
    const onSubmit:SubmitHandler<EventFormData> = (eventData:EventFormData) =>{
       try {
           if(event){
               editEvent(id,eventData);
           }else{
               addEvent({id, ...eventData});
           }
           console.log("event", eventData);
           toast.success(`Event ${event ? "edited!" :"created! "}`);
            onClose();
            form.reset();
       }catch(e){
           console.error(e);
           toast.error(`failed to ${event ?"edit event" : "add event" }`)
       }
    }


    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{event ? `Edit Event ${event.title}`: "Add Event"} </DialogTitle>
                    <DialogDescription>
                        {event ?"Modify your existing event":"Create a new event for your calendar." }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >

                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
}