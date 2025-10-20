import { DayDisplay } from "./day-view-components/day-display";
import { DayViewContainer } from "./day-view-components/day-view-container";
import { DateDisplayLayout } from "./week-day-view-commons/date-display-layout";

export function DayView() {
  return (
    <div className="flex flex-col border">
      <div>
        <DateDisplayLayout>
          <DayDisplay />
        </DateDisplayLayout>
      </div>
      <DayViewContainer />
    </div>
  );
}
