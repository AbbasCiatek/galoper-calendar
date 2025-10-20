import DateDisplayLayout from "@/Components/WeeKDayViewCommonComponents/date-display-layout.tsx";
import WeekDaysDisplay from "@/Components/WeekComponents/week-days-display.tsx";
import WeekViewContainer from "@/Components/WeekComponents/week-view-container.tsx";
import WeekViewMultiDayEvent from "@/Components/WeekComponents/week-view-multi-day-event.tsx";

export default function WeekView() {
  return (
    <>
      <div className="flex flex-col border rounded-b-2xl">
        <div>
          <DateDisplayLayout>
            <WeekDaysDisplay />
          </DateDisplayLayout>
          <WeekViewMultiDayEvent />
        </div>
        <WeekViewContainer />
      </div>
    </>
  );
}
