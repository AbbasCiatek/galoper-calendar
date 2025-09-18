import WeekDaysDisplay from "@/Components/WeekComponents/WeekDaysDisplay.tsx";
import WeekViewContainer from "@/Components/WeekComponents/WeekViewContainer.tsx";
export default function WeekView({date}:{date:Date}) {

    return (
        <>
            <div className="flex flex-col ">
                <div>
                    <WeekDaysDisplay date={date}/>
                    {/*AllDayEventsDisplay*/}
                </div>
                <WeekViewContainer date={date} />
            </div>
        </>
    )
}