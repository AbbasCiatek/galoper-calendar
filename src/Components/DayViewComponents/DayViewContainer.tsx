import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import HoursColumn from "@/Components/WeeKDayViewCommonComponents/HoursColumn.tsx";
import DayTimeCells from "@/Components/DayViewComponents/DayTimeCells.tsx";

export default function DayViewContainer({date}:{date:Date}){
    return (
        <ScrollArea className="h-[500px] md:h-[800px] border-b">
            <div className="flex overflow-hidden">
                <HoursColumn/>
                <DayTimeCells date={date}  />
            </div>

        </ScrollArea>
    );
}