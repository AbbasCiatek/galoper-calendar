import type {Event} from '@/types.ts';
import EventDetailsDialog from "@/Components/Dialogs/EventDetailsDialog.tsx";
import {cardClassesByColor} from "@/helpers.ts";
import {Clock, Text} from "lucide-react";
import {dayDisplay} from "@/dateHelpers.ts";
export default function AgendaEventCard({event}: { event:Event }){
    console.log("Agenda Event Card", event);
    const agendaEventCardClasses = cardClassesByColor(event.color) ;


    return (
        <EventDetailsDialog event={event}>
            <div role="button" tabIndex={0} className={agendaEventCardClasses}>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5">
                        <p className="font-medium">
                            {event.title}
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="size-3 shrink-0" />
                        <p className="text-xs text-foreground">
                            {dayDisplay(event.startDate,event.endDate)}
                        </p>
                    </div>

                    <div className="flex items-center gap-1">
                        <Text className="size-3 shrink-0" />
                        <p className="text-xs text-foreground">{event.description}</p>
                    </div>
                </div>
            </div>
        </EventDetailsDialog>
    );
}