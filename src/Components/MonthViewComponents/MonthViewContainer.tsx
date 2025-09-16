import daysInMonth, {
    arrayOfDaysOfNextMonth, arrayOfDaysOfPrevMonth,
    numberOfDisplayedDaysOfNextMonth,
    numberOfDisplayedDaysOfPrevMonth
} from "@/dateHelpers";
import {formatDate, isToday} from "date-fns";
import {clsx} from "clsx";

export default function MonthViewContainer({date}:{date:Date}) {
    const days= daysInMonth(date);
    const afterTheEndOfMonth = numberOfDisplayedDaysOfNextMonth(days.daysInMonth,days.indexOfDays);
    const daysNextMonthDisplayed =arrayOfDaysOfNextMonth(date);
    const daysPrevMonthDisplayed =arrayOfDaysOfPrevMonth(date);
    const prevMonthDaysDisplayed = numberOfDisplayedDaysOfPrevMonth(date,days.indexOfDays);

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
        <>
            {daysPrevMonthDisplayed.daysInMonth.splice(prevMonthDaysDisplayed).map((day,index) => {
                return (
                    <div
                        onClick={()=>handleBeforeDays(day)}
                        className="border bg-gray-300 h-32 hover:bg-gray-400  "
                        key={`beforeMonth ${index}`}>
                            {formatDate(day,'d')}
                    </div>
                )
            })}


            {days.daysInMonth.map((day,index) => {
                return <div className={clsx(" border border-white h-32 ",
                isToday(day) ?  "bg-cyan-200 hover:bg-cyan-300 ":"bg-gray-10 hover:bg-white ")}
                            key={`month ${index}`}
                            onClick={()=>handleClickedDate(day)}
                >
                    {formatDate(day,'d')}
                </div>
            })}
            {daysNextMonthDisplayed.daysInMonth.slice(0,afterTheEndOfMonth).map((day,index) => {
            return <div
                onClick={()=>handleAfterDays(day)}
                className="border bg-gray-300 h-32  hover:bg-gray-400"
                key={`afterMonth ${index}`}
            >
                {formatDate(day,'d')}
            </div>
        })}

        </>
    );
}