import daysInMonth, {
    arrayOfDaysOfNextMonth, arrayOfDaysOfPrevMonth,
    numberOfDisplayedDaysOfNextMonth,
    numberOfDisplayedDaysOfPrevMonth
} from "@/dateHelpers";
import  {formatDate} from "date-fns";

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
                        className="border bg-gray-400 h-32 "
                        key={`beforeMonth ${index}`}>
                            {formatDate(day,'d')}
                    </div>
                )
            })}


            {days.daysInMonth.map((day,index) => {
                return <div className="bg-gray-300 border h-32 "
                            key={`month ${index}`}
                            onClick={()=>handleClickedDate(day)}
                >
                    {formatDate(day,'d')}
                </div>
            })}
            {daysNextMonthDisplayed.daysInMonth.slice(0,afterTheEndOfMonth).map((day,index) => {
            return <div
                onClick={()=>handleAfterDays(day)}
                className="border bg-gray-400 h-32 "
                key={`afterMonth ${index}`}
            >
                {formatDate(day,'d')}
            </div>
        })}

        </>
    );
}