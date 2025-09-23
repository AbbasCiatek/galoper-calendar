import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog.tsx";
import {type ReactNode, useState} from "react";
import {DialogTitle} from "@radix-ui/react-dialog";
import type {Event} from "@/types.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import {type EventFormData, eventSchema,} from "@/schema.ts";
import {toast} from "sonner";
import useEventStore from "@/EventStore.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {addHours} from "date-fns";
import {Input} from "@/components/ui/input.tsx";
import {CirclePlay, CircleStop} from "lucide-react";
import DatePicker from "@/components/customUi/DatePicker.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Select} from "@radix-ui/react-select";
import {SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Button} from "@/components/ui/button.tsx";
import { v4  } from 'uuid';
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
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () =>setIsOpen(false);
    const onToggle = () =>setIsOpen(!isOpen);
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
            startDate: startDateDefaults,
            endDate: endDateDefaults,
        },
    });
    const onSubmit:SubmitHandler<EventFormData> = (eventData:EventFormData) =>{
       try {
           if(event){
               editEvent(event.id,eventData);
           }else{
                const id = v4();
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
        <Dialog open={isOpen} onOpenChange={onToggle} >
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
                    <form id="form-event" onSubmit={form.handleSubmit(onSubmit)} >
                        <div className="flex flex-col gap-2">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({field,fieldState}) =>(
                        <FormItem>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <FormControl>
                                <Input
                                    id="title"
                                    placeholder="Event Title..."
                                    {...field}
                                    className={fieldState.invalid ? "border-red-500" : ""}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    />
                        <FormField
                            control={form.control}
                            name="isAllDay"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <Checkbox
                                            id="isAllDay"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel htmlFor="isAllDay">All Day</FormLabel>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='startDate'
                            render={({field,fieldState}) =>(
                                <FormItem>
                                    <div className="flex items-center gap-2">
                                        <CirclePlay size={20} strokeWidth={1.5} absoluteStrokeWidth />
                                        <FormControl>
                                            <DatePicker
                                                id="startDate"
                                                value={field.value}
                                                onSelect={date => field.onChange(date as Date)}
                                                data-invalid={fieldState.invalid}
                                                />
                                        </FormControl>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name='endDate'
                            render={({field,fieldState}) =>(
                                <FormItem>
                                    <div className="flex items-center gap-2">
                                        <CircleStop size={20} strokeWidth={1.5} absoluteStrokeWidth />
                                        <FormControl>
                                            <DatePicker
                                                id="endDate"
                                                value={field.value}
                                                onSelect={date => field.onChange(date as Date)}
                                                data-invalid={fieldState.invalid}
                                                startMonth={startDate}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage/>
                                </FormItem>
                                  )}
                        />
                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Color</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger data-invalid={fieldState.invalid}>
                                                <SelectValue placeholder="Select an option" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectItem value="blue">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-3.5 rounded-full bg-blue-600" />
                                                        Blue
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="green">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-3.5 rounded-full bg-green-600" />
                                                        Green
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="red">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-3.5 rounded-full bg-red-600" />
                                                        Red
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="yellow">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-3.5 rounded-full bg-yellow-600" />
                                                        Yellow
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="purple">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-3.5 rounded-full bg-purple-600" />
                                                        Purple
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="orange">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-3.5 rounded-full bg-orange-600" />
                                                        Orange
                                                    </div>
                                                </SelectItem>

                                                <SelectItem value="gray">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-3.5 rounded-full bg-neutral-600" />
                                                        Gray
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>

                                    <FormControl>
                                        <Textarea {...field} value={field.value} data-invalid={fieldState.invalid} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button form="form-event" type="submit">
                        {event ? `Save Changes` :`Create Event`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}