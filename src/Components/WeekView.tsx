import WeekDaysDisplay from "@/Components/weekViewComponents/WeekDaysDisplay.tsx";

export default function WeekView (){
    return (
        <div className="grid grid-cols-7 text-xl">
            <WeekDaysDisplay />
        </div>
    );
}
