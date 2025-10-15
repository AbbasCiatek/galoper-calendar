import { WeekDays } from "@/helpers.tsx";
export function WeekDaysDisplay() {
  return (
    <div className="grid grid-cols-7 text-xl justify-between items-center divide-x  ">
      {WeekDays.map((day) => {
        return (
          <div className="text-center" key={day}>
            {day.slice(0, 3)}{" "}
          </div>
        );
      })}
    </div>
  );
}
