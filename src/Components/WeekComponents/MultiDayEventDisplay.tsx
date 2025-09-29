import { cn } from "@/lib/utils"; // className joiner
import type {Event} from "@/types.ts";

interface Props {
    event: Event;
    cellDate: Date;
    position: "first" | "middle" | "last" | "none";
}

export function MultiDayEventDisplay({ event, position }: Props) {

    const colorMap:Record<string, string>={
        red: 'bg-red-200 text-red-500 border border-red-500 ',
        green: 'bg-green-200 text-green-500 border border-green-500 ',
        orange: 'bg-orange-200 text-orange-500 border border-orange-500 ',
        yellow: 'bg-yellow-200 text-yellow-500 border border-yellow-500 ',
        purple: 'bg-purple-200 text-purple-500 border border-purple-500 ',
        gray: 'bg-gray-200 text-gray-500 border border-gray-500 ',
        blue: 'bg-blue-200 text-blue-500 border border-blue-500 ',
    }

    const positionClasses = {
        none: "rounded-md",
        first: "rounded-l-md border-r-0  ",
        middle: "border-x-0 ",
        last: "rounded-r-md border-l-0 ",
    }[position];

    return (
        <div className={  `  flex items-center h-6.5 px-2 text-xs font-medium truncate cursor-pointer ${positionClasses}  ${colorMap[event.color]} `}>
            {position === "first" || position === "none" ? event.title : null}
        </div>
    );
}
