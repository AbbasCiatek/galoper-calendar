import daysInMonth, {
    arrayOfDaysOfNextMonth, arrayOfDaysOfPrevMonth,
    numberOfDisplayedDaysOfNextMonth,
    numberOfDisplayedDaysOfPrevMonth
} from "@/dateHelpers";
import {endOfMonth, isSameDay, startOfMonth} from "date-fns";
import useEventStore from "@/EventStore.ts";
import type {Event} from "@/types.ts";
import DayCell from "@/Components/MonthViewComponents/DayCell.tsx";

export default function MonthViewContainer({date}:{date:Date}) {
    const days= daysInMonth(date);
    const afterTheEndOfMonth = numberOfDisplayedDaysOfNextMonth(days.daysInMonth,days.indexOfDays);
    const daysNextMonthDisplayed =arrayOfDaysOfNextMonth(date);
    const daysPrevMonthDisplayed =arrayOfDaysOfPrevMonth(date);
    const prevMonthDaysDisplayed = numberOfDisplayedDaysOfPrevMonth(date,days.indexOfDays);
export default function MonthViewContainer({date}: { date: Date }) {
    const days = daysInMonth(date);
    const nextMonthDaysDisplayed = numberOfDisplayedDaysOfNextMonth(days.daysInMonth, days.indexOfFirstDay);
    const daysNextMonthDisplayed = arrayOfDaysOfNextMonth(date);
    const daysPrevMonthDisplayed = arrayOfDaysOfPrevMonth(date);
    const prevMonthDaysDisplayed = numberOfDisplayedDaysOfPrevMonth(date, days.indexOfFirstDay);

    const {getEventsByDateRange} = useEventStore();

    const allMonthEvents: Event[] = getEventsByDateRange(startOfMonth(date), endOfMonth(date));

    const singleDayEvents = allMonthEvents.filter((event) =>
        isSameDay(new Date(event.startDate), new Date(event.endDate))
    )
    const multiDayEvents = allMonthEvents.filter((event) =>
        !isSameDay(new Date(event.startDate), new Date(event.endDate))
    )

    const eventPositions = calculateMonthEventPositions(multiDayEvents, singleDayEvents, date);



    return (
        < >
            {daysPrevMonthDisplayed.daysInMonth.splice(prevMonthDaysDisplayed).map((day,index) => {
                return (
                    <div
                        onClick={()=>handleBeforeDays(day)}
                        className={clsx("h-32  gap-1 border-l border-t",
                            isMonday(date) && "border-l-0")}
                        className="border bg-gray-400 h-32 "
                        key={`beforeMonth ${index}`}>
                        <div className="h-6 px-1 text-xs font-semibold lg:px-2 opacity-25">  {formatDate(day,'d')}</div>

                    </div>
                )
            })}


            {days.daysInMonth.map((day,index) => {
                return <div className={clsx("h-32  gap-1 border-l border-t",
                    isMonday(date) && "border-l-0")}
                return <div className="bg-gray-300 border h-32 "
                            key={`month ${index}`}
                            onClick={()=>handleClickedDate(day)}
                >
                    <div className={clsx("h-6 px-1 text-xs font-semibold lg:px-2",
                        isToday(day) &&
                        "flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary px-0 font-bold text-primary-foreground")}>{formatDate(day,'d')}</div>
                </div>

            })}
            {daysNextMonthDisplayed.daysInMonth.slice(0,afterTheEndOfMonth).map((day,index) => {
            return <div
                onClick={()=>handleAfterDays(day)}
                className={clsx("h-32  gap-1 border-l border-t",
                    isMonday(date) && "border-l-0")}
                className="border bg-gray-400 h-32 "
                key={`afterMonth ${index}`}
            >
                <div className="h-6 px-1 text-xs font-semibold lg:px-2 opacity-25"> {formatDate(day,'d')}</div>
            </div>
        })}

        </>
        <div className="grid grid-cols-7 w-full h-full">
            {/* Previous month trailing days */}
            {daysPrevMonthDisplayed.daysInMonth.splice(prevMonthDaysDisplayed).map((day, index) => (
                <DayCell key={`before-${index}`} day={day} isFaded={true}
                         eventsForDay={getMonthCellEvents(day, allMonthEvents, eventPositions)}/>))}
            {/* Current month days */}
            {days.daysInMonth.map((day, index) => (
                <DayCell key={`current-${index}`} day={day} isFaded={false}
                         eventsForDay={getMonthCellEvents(day, allMonthEvents, eventPositions)}/>))}
            {/* Next month leading days */}
            {daysNextMonthDisplayed.daysInMonth.slice(0, nextMonthDaysDisplayed).map((day, index) => (
                <DayCell key={`after-${index}`} day={day} isFaded={true}
                         eventsForDay={getMonthCellEvents(day, allMonthEvents, eventPositions)}/>))}
        </div>
    );
}