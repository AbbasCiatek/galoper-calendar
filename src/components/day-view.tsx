import { DayDisplay } from "./day-view-components/day-display";
import { DayViewContainer } from "./day-view-components/day-view-container";
import { DayViewMultiDayEvent } from "./day-view-components/day-view-multi-day-event";
import { DateDisplayLayout } from "./week-day-view-commons/date-display-layout";

export function DayView() {
  return (
    <div className="flex flex-col border border-b-0 rounded-b-2xl">
      <DateDisplayLayout>
        <DayDisplay />
      </DateDisplayLayout>
      <DayViewMultiDayEvent />
      <DayViewContainer />
    </div>
  );
}
