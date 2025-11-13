import { DayView } from "@/components/day-view.tsx";
import { MonthView } from "@/components/month-view.tsx";
import { WeekView } from "@/components/week-view.tsx";
import { YearView } from "@/components/year-view.tsx";
import { useCalendar } from "@/context/calendar-context.tsx";

export function Views() {
  const { view } = useCalendar();
  return (
    <>
      {view === "year" && <YearView />}
      {view === "month" && <MonthView />}
      {view === "week" && <WeekView />}
      {view === "day" && <DayView />}
    </>
  );
}
