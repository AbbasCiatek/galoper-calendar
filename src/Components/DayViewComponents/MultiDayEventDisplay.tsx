import type {Event} from "@/types.ts";

interface Props {
    event: Event;
    eventCurrentDay?:number;
    eventTotalDays?:number;
}

export function MultiDayEventDisplay({ event ,eventCurrentDay,eventTotalDays }: Props) {

    const colorMap:Record<string, string>={
        red: 'bg-red-200 text-red-800 border border-red-500 ',
        green: 'bg-green-200 text-green-800 border border-green-500 ',
        orange: 'bg-orange-200 text-orange-800 border border-orange-500 ',
        yellow: 'bg-yellow-200 text-yellow-800 border border-yellow-500 ',
        purple: 'bg-purple-200 text-purple-800 border border-purple-500 ',
        gray: 'bg-gray-200 text-gray-800 border border-gray-500 ',
        blue: 'bg-blue-200 text-blue-800 border border-blue-500 ',
    }
    return (
        // <EventDetailsDialog event={event}>
            <div className={  `flex items-center h-6.5 px-2 text-xs font-medium truncate cursor-pointer rounded-lg ${colorMap[event.color]} `}>
                 <p className="flex-1 truncate font-semibold">
                {eventCurrentDay && (
                    <span className="text-xs">
                    Day {eventCurrentDay} of {eventTotalDays} •{" "}
                  </span>
                )}
                {event.title}
            </p>
            </div>
        //</EventDetailsDialog>
    );
}