import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import HoursColumn from "@/Components/WeeKDayViewCommonComponents/HoursColumn.tsx";
import WeekTimeCells from "@/Components/WeekComponents/WeekTimeCells";



export default function WeekViewContainer({date}:{date:Date}) {
    return (
        <ScrollArea className="h-[500px] md:h-[800px] border-b">
            <div className="flex overflow-hidden">
                <HoursColumn/>
                <WeekTimeCells date={date} />
            </div>
        </ScrollArea>
    )
}