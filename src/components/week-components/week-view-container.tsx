import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { WeekTimeCells } from "@/components/week-components/week-time-cells.tsx";
import { HoursColumn } from "../week-day-view-commons/hours-column";

export function WeekViewContainer() {
  return (
    <ScrollArea className="h-[500px] md:h-[800px] ">
      <div className="flex overflow-hidden">
        <HoursColumn />
        <WeekTimeCells />
      </div>
    </ScrollArea>
  );
}
