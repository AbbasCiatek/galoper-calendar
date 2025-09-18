import { ScrollArea } from "@/components/ui/scroll-area";
import {eachDayOfInterval, endOfWeek, formatDate, startOfWeek} from "date-fns";
const hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
import WeekDaysDisplay from "@/Components/WeekComponents/WeekDaysDisplay.tsx";
import WeekViewContainer from "@/Components/WeekComponents/WeekViewContainer.tsx";
import DateDisplayLayout from "@/Components/WeeKDayViewCommonComponents/DateDisplayLayout.tsx";
export default function WeekView({date}:{date:Date}) {
    const weekDays = eachDayOfInterval(
        {
            start:startOfWeek(date,{weekStartsOn:1}),
            end:endOfWeek(date,{weekStartsOn:1}),
        });

    return (
        <>
            <div className="flex flex-col ">
                <div>
                    <DateDisplayLayout>
                    <WeekDaysDisplay date={date}/>
                    </DateDisplayLayout>
                    {/*AllDayEventsDisplay*/}

                    {/* Week header */}
                    <div className="relative z-20 flex border-b">
                        <div className="w-18"></div>
                        <div className="grid flex-1 grid-cols-7 divide-x border-l">
                            {weekDays.map((day, index) => (
                                <span key={index} className="py-2 text-center text-xs font-medium text-muted-foreground">
                                         {formatDate(day, "EE")}
                                    <span className="ml-1 font-semibold text-foreground">
                                        {formatDate(day, "d")}
                                    </span>
                    </span>))}
                        </div>
                    </div>
                </div>

                <ScrollArea className="h-[500px] md:h-[800px] border-b-gray-400 border-b rounded-lg " type="always">
                    <div className="flex overflow-hidden">
                        {/* Hours column */}
                        <div className="relative w-18">
                            {hours.map((hour, index) => (
                                <div key={hour} className="relative" style={{ height: "96px" }}>
                                    <div className="absolute -top-3 right-2 flex h-6 items-center">
                                        {index !== 0 && <span className="text-xs">{formatDate(new Date().setHours(hour, 0, 0, 0), "hh a")}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Week grid */}
                        <div className="relative flex-1 border-l">
                            <div className="grid grid-cols-7 divide-x">
                                {weekDays.map((day, dayIndex) => {
                                    return (
                                        <div key={dayIndex} className="relative">
                                            {hours.map((hour, index) => {

                                                return (
                                                    <div key={hour} className="relative" style={{ height: "96px" }}>
                                                        {index !== 0 && <div className="pointer-events-none absolute inset-x-0 top-0 border-b"></div>}
                                                        <div className="absolute inset-x-0 top-0 h-[48px] cursor-pointer transition-colors hover:bg-accent" />
                                                        <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b border-dashed"></div>
                                                        <div className="absolute inset-x-0 top-[48px] h-[48px] cursor-pointer transition-colors hover:bg-accent" />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </ScrollArea>
                </div>
                <WeekViewContainer date={date} />
            </div>
        </>
    )
}