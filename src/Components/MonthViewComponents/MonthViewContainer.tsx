import daysInMonth, {
    arrayOfDaysOfNextMonth, arrayOfDaysOfPrevMonth,
    numberOfDisplayedDaysOfNextMonth,
    numberOfDisplayedDaysOfPrevMonth
} from "@/dateHelpers";
import {formatDate, isMonday, isToday} from "date-fns";
import {clsx} from "clsx";

export default function MonthViewContainer({date}:{date:Date}) {
    const days= daysInMonth(date);
    const nextMonthDaysDisplayed = numberOfDisplayedDaysOfNextMonth(days.daysInMonth,days.indexOfFirstDay);
    const daysNextMonthDisplayed =arrayOfDaysOfNextMonth(date);
    const daysPrevMonthDisplayed =arrayOfDaysOfPrevMonth(date);
    const prevMonthDaysDisplayed = numberOfDisplayedDaysOfPrevMonth(date,days.indexOfFirstDay);

    const handleClickedDate = (date:Date) => {
        alert(date);
    }
   const handleBeforeDays = (date: Date) => {
        //must trigger the arrow back
       alert(date);
   }
   const handleAfterDays = (date:Date) => {
        //must trigger the arrow next
        alert(date);
    }
    return (
        < >
            {daysPrevMonthDisplayed.daysInMonth.splice(prevMonthDaysDisplayed).map((day,index) => {
                return (
                    <div
                        onClick={()=>handleBeforeDays(day)}
                        className={clsx("h-32  gap-1 border-l border-t",
                            isMonday(date) && "border-l-0")}
                        key={`beforeMonth ${index}`}>
                        <div className="h-6 px-1 text-xs font-semibold lg:px-2 opacity-25">  {formatDate(day,'d')}</div>

                    </div>
                )
            })}


            {days.daysInMonth.map((day,index) => {
                return <div className={clsx("h-32  gap-1 border-l border-t",
                    isMonday(date) && "border-l-0")}
                            key={`month ${index}`}
                            onClick={()=>handleClickedDate(day)}
                >
                    <div className={clsx("h-6 px-1 text-xs font-semibold lg:px-2",
                        isToday(day) &&
                        "flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary px-0 font-bold text-primary-foreground")}>{formatDate(day,'d')}</div>
                </div>

            })}
            {daysNextMonthDisplayed.daysInMonth.slice(0,nextMonthDaysDisplayed).map((day,index) => {
            return <div
                onClick={()=>handleAfterDays(day)}
                className={clsx("h-32  gap-1 border-l border-t",
                    isMonday(date) && "border-l-0")}
                key={`afterMonth ${index}`}
            >
                <div className="h-6 px-1 text-xs font-semibold lg:px-2 opacity-25"> {formatDate(day,'d')}</div>
            </div>
        })}

        </>
    );
}