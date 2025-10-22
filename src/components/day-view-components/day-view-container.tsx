import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { HoursColumn } from "../week-day-view-commons/hours-column";
import { DayTimeCell } from "./day-time-cell";

export function DayViewContainer() {
  return (
    <ScrollArea className="h-[500px] md:h-[800px] border-b rounded-b-2xl">
      <div className="flex overflow-hidden">
        <HoursColumn />
        <DayTimeCell />
      </div>
    </ScrollArea>
  );
}
