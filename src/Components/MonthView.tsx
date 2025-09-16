import WeekDaysDisplay from "@/Components/MonthViewComponents/WeekDaysDisplay.tsx";


export default function MonthView() {
    return (
        <div className="container m-auto shadow-lg">
            <div className="grid grid-cols-7 text-xl">
                <WeekDaysDisplay />
            </div>
        </div>
    );
}