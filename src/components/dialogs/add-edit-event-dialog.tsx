import { useCalendar } from "@/context/calendar-context";
import { type Event, useEventStore } from "@/event-store.ts";
import { type EventFormData, eventSchema } from "@/schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import { addHours } from "date-fns";
import { CirclePlay, CircleStop } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { DatePicker } from "../custom-ui/date-picker";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

type AddEventDialogProps = {
  children: ReactNode;
  startDate?: Date;
  endDate?: Date;
  event?: Event;
};

// the start time  will be got from the cell clicked
export function AddEditEventDialog({
  children,
  startDate,
  endDate,
  event,
}: AddEventDialogProps) {
  const { date } = useCalendar();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(!isOpen);
  const { addEvent, editEvent } = useEventStore();
  const oneHourAdded = addHours(date, 1);

  const startDateDefaults = startDate
    ? startDate
    : event
      ? event?.startDate
      : date;

  const endDateDefaults = endDate
    ? endDate
    : event
      ? event?.endDate
      : oneHourAdded;

  useEffect(() => {
    form.reset({
      title: event ? event.title : "",
      description: event ? event.description : "",
      startDate: startDateDefaults,
      endDate: endDateDefaults,
      color: event ? event.color : "blue",
    });
  }, [event, startDateDefaults, endDateDefaults]);

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event ? event.title : "",
      description: event ? event.description : "",
      startDate: startDateDefaults,
      endDate: endDateDefaults,
    },
  });

  const onSubmit: SubmitHandler<EventFormData> = (eventData: EventFormData) => {
    try {
      if (isChecked) {
        eventData.startDate.setHours(0, 0, 0, 0);
        eventData.endDate.setHours(23, 59, 0, 0);
      }
      eventData.startDate.setSeconds(0, 0);
      eventData.endDate.setSeconds(0, 0);
      if (event) {
        editEvent(event.id, eventData);
      } else {
        addEvent(eventData);
        toast.success(`Event ${event ? "edited!" : "created! "}`);
        onClose();
        form.reset();
      }
    } catch (e) {
      toast.error(`${e} failed to $event ? "edit event" : "add event"`);
    }
  };

  const [isChecked, setChecked] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {event ? `Edit Event ${event.title} ` : "Add Event"}{" "}
          </DialogTitle>
          <DialogDescription>
            {event
              ? `Modify ${event.title}`
              : "Create a new event for your calendar."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="form-event" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={clsx("flex gap-3", {
                  "flex-row": isChecked,
                  "flex-col": !isChecked,
                })}
              >
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <CirclePlay
                          size={20}
                          strokeWidth={1.5}
                          absoluteStrokeWidth
                        />
                        <FormControl>
                          <DatePicker
                            id="startDate"
                            value={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            data-invalid={fieldState.invalid}
                            isChecked={isChecked}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <CircleStop
                          size={20}
                          strokeWidth={1.5}
                          absoluteStrokeWidth
                        />
                        <FormControl>
                          <DatePicker
                            id="endDate"
                            value={field.value}
                            onSelect={(date) => field.onChange(date as Date)}
                            data-invalid={fieldState.invalid}
                            startMonth={startDate}
                            isChecked={isChecked}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="allDayCheckBox"
                  checked={isChecked}
                  onCheckedChange={(checked) => setChecked(!!checked)}
                />
                <label htmlFor="allDayCheckBox" className="text-sm font-medium">
                  All Day
                </label>
              </div>
              <FormField
                control={form.control}
                name="color"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
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
                      <Textarea
                        {...field}
                        value={field.value}
                        data-invalid={fieldState.invalid}
                      />
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
            {event ? "Save Changes" : "Create Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
