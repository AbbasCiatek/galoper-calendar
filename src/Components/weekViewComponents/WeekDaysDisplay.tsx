import {WeekDays} from "@/helpers.tsx";
export default function WeekDaysDisplay() {
    return (<>
            {WeekDays.map((day) => {
                return (
                    <div className="text-center" key={day}>{day.slice(0,3)} </div>
                )
            })}
        </>
    );
}