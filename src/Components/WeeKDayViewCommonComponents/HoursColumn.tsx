import {Hours} from "@/helpers.ts";
import {formatDate} from "date-fns";

export default function HoursColumn() {
    return (
        <div className="relative w-18">
            {Hours.map((hour, index) => (
                <div key={hour} className="relative h-12" >
                    <div className="absolute -top-3 right-2 flex h-6 items-center">
                        {index !== 0 && <span className="text-xs"> {formatDate(new Date().setHours(hour), "hh a")}</span>}
                    </div>
                </div>
            ))}
        </div>
    );
}