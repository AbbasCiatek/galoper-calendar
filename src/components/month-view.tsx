import WeekDaysDisplay from "@/components/month-view-components/week-days-display.tsx";

export default function MonthView() {
  return (
    <div className="border rounded-b-2xl">
      <div className="grid grid-cols-7 text-xl">
        <WeekDaysDisplay />
      </div>
    </div>
  );
}
