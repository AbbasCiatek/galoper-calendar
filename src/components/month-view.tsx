import { MonthViewContainer } from "@/components/month-view-components/month-view-container.tsx";
import { WeekDaysDisplay } from "@/components/month-view-components/week-days-display.tsx";

export function MonthView() {
  return (
    <div className="border z-30 rounded-b-2xl">
      <WeekDaysDisplay />
      <MonthViewContainer />
    </div>
  );
}
