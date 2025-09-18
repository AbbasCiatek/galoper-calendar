import WeekDaysDisplay from "@/Components/WeekComponents/WeekDaysDisplay.tsx";
import WeekViewContainer from "@/Components/WeekComponents/WeekViewContainer.tsx";
import DateDisplayLayout from "@/Components/WeeKDayViewCommonComponents/DateDisplayLayout.tsx";
export default function WeekView({date}:{date:Date}) {

    return (
        <>
            <div className="flex flex-col ">
                <div>
                    <DateDisplayLayout>
                    <WeekDaysDisplay date={date}/>
                    </DateDisplayLayout>
                    {/*AllDayEventsDisplay*/}
                </div>
                <WeekViewContainer date={date} />
            </div>
        </>
    )
}
