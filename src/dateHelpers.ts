import {formatDate, isSameDay, isSameMonth, isSameWeek} from "date-fns";

export function  dayDisplay(start:Date,end:Date){
    if(isSameDay(start, end)){
        return formatDate(start, "h:mm a") +'-' + formatDate(end, "h:mm a");
    }
    else if(isSameWeek(start,end) || isSameMonth(start,end))
        return formatDate(start, "h:mm a")+'-'+formatDate(end, "EEEEEE,MMMM d h:mm a");
    else
        return formatDate(start, "h:mm a")+'-'+formatDate(end, "MMMM yyyy d h:mm a");
}