import { DATE_FORMAT, HOURS } from "@/constants";
import { formatDate } from "date-fns";

export function HoursColumn() {
  return (
    <div className="relative w-18">
      {HOURS.map((hour, index) => (
        <div key={hour} className="relative h-24">
          <div className="absolute -top-6 right-2 flex h-12 items-center">
            {index !== 0 && (
              <span className="text-xs text-muted-foreground">
                {" "}
                {formatDate(
                  new Date().setHours(hour),
                  DATE_FORMAT.hours24Format,
                )}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
