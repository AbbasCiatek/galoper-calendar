import {
	addMonths,
	eachDayOfInterval,
	endOfMonth,
	getDay,
	startOfMonth,
	subMonths,
} from "date-fns";

export default function daysInMonth(date: Date) {
	const firstDayOfMonth = startOfMonth(date);
	const lastDayOfMonth = endOfMonth(date);
	//the Start of the week is Monday
	const indexOfFirstDay = (getDay(firstDayOfMonth) + 6) % 7;
	const daysInMonth = eachDayOfInterval({
		start: firstDayOfMonth,
		end: lastDayOfMonth,
	});
import {addMonths, eachDayOfInterval, endOfMonth, getDay, startOfMonth, subMonths} from "date-fns";

export default function daysInMonth(date: Date){
    const firstDayOfMonth = startOfMonth(date);
    const lastDayOfMonth = endOfMonth(date);
    //the Start of the week is Monday
    const indexOfDays =((getDay(firstDayOfMonth)+6)%7);
    const daysInMonth = eachDayOfInterval({
        start:firstDayOfMonth,
        end:lastDayOfMonth,
    })

    return {daysInMonth,indexOfDays};
}

export function  numberOfDisplayedDaysOfNextMonth(daysOfCurrentMonth:Date[],indexOfCurrentMonthInWeekdays:number) {
    const lengthOfCurrentMonth = daysOfCurrentMonth.length;
    if( lengthOfCurrentMonth+ indexOfCurrentMonthInWeekdays > 35 )
        return  42 - lengthOfCurrentMonth-indexOfCurrentMonthInWeekdays;
        return 35 - lengthOfCurrentMonth - indexOfCurrentMonthInWeekdays;
}


export function arrayOfDaysOfNextMonth(date:Date) {
    const nextMonth =addMonths(date,1);
    console.log(nextMonth);
    return  daysInMonth(nextMonth);
}
export function arrayOfDaysOfPrevMonth(date: Date) {
	const prevMonth = subMonths(date, 1);
	return daysInMonth(prevMonth);
}

export function numberOfDisplayedDaysOfPrevMonth(currentDate:Date,indexOfCurrentMonthInWeekdays:number) {
    return arrayOfDaysOfPrevMonth(currentDate).daysInMonth.length - indexOfCurrentMonthInWeekdays;
export function numberOfDisplayedDaysOfPrevMonth(
	currentDate: Date,
	indexOfCurrentMonthInWeekdays: number,
) {
	return (
		arrayOfDaysOfPrevMonth(currentDate).daysInMonth.length -
		indexOfCurrentMonthInWeekdays
	);
}
