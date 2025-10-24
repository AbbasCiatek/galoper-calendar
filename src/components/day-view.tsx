import { DayViewMultiDayEvent } from "@/components/day-view-components/day-view-multi-day-event.tsx";
import { DayDisplay } from "./day-view-components/day-display";
import { DayViewContainer } from "./day-view-components/day-view-container";
import { DateDisplayLayout } from "./week-day-view-commons/date-display-layout";

export function DayView() {
  return (
    <div className="flex flex-col border border-b-0 rounded-b-2xl">
      <div>
        <DateDisplayLayout>
          <DayDisplay />
        </DateDisplayLayout>
        <DayViewMultiDayEvent />
      </div>
      <DayViewContainer />
    </div>
  );
}
