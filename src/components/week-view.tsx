import { WeekDaysDisplay } from "@/components/week-components/week-days-display.tsx";
import { WeekViewContainer } from "@/components/week-components/week-view-container.tsx";
import { DateDisplayLayout } from "./week-day-view-commons/date-display-layout";

export function WeekView() {
  return (
    <>
      <div className="flex flex-col border rounded-b-2xl">
        <div>
          <DateDisplayLayout>
            <WeekDaysDisplay />
          </DateDisplayLayout>
        </div>
        <WeekViewContainer />
      </div>
    </>
  );
}
