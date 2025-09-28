import WeekDaysDisplay from "@/Components/WeekComponents/WeekDaysDisplay.tsx";
import WeekViewContainer from "@/Components/WeekComponents/WeekViewContainer.tsx";
import DateDisplayLayout from "@/Components/WeeKDayViewCommonComponents/DateDisplayLayout.tsx";
import WeekViewMultiDayEvent from "@/Components/WeekComponents/WeekViewMultiDayEvent.tsx";
export default function WeekView({date}:{date:Date}) {

    return (
        <>
            <div className="flex flex-col ">
                <div>
                    <DateDisplayLayout>
                    <WeekDaysDisplay date={date}/>
                    </DateDisplayLayout>
                    <WeekViewMultiDayEvent date={date} />
                </div>
                <WeekViewContainer date={date} />
            </div>
        </>
    )
}
