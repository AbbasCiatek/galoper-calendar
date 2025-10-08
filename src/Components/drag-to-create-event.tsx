import {type ReactNode, useState} from "react";
import {formatDate, setHours, setMinutes} from "date-fns";

type TProps={
    children: ReactNode,
    date:Date,
    hour:number,
    minute:number,
}
const Min_Duration = 15;
const Hour_Height_PX = 96;
const Minute_Height_PX=48;
const Full_Time_Cell_PX=Hour_Height_PX*24;


export function DragToCreateEvent({children, date, hour, minute}: TProps) {

    //const [isCreating, setIsCreating] = useState(false);
    //  const [creatingPreview, setCreatingPreview] = useState<{ start: string, end: string } | null>(null);

    const handleMouseDown = e => {
        // setIsCreating(true);
        let startPosition = e.nativeEvent.offsetY + hour * Hour_Height_PX + (minute!==0 && Minute_Height_PX);

        let startHours = Math.floor(startPosition * 24 /Full_Time_Cell_PX);

        let startMinutes = Math.floor(((startPosition * 24 /Full_Time_Cell_PX)-startHours) *60);
        let startDate = setMinutes(setHours(date,startHours),startMinutes);
        console.log(`start pos :${startPosition},START Hrs: ${startHours},start min :${startMinutes}, offset ${e.nativeEvent.offsetY}`);
        console.log(formatDate(startDate,'dd MMM yyyy HH:mm'));

        const move = (ev) =>{
            //let endPosition = ev.offsetY + hour * Hour_Height_PX +(minute!==0 && Minute_Height_PX);
            //  console.log(ev);
            //console.log(endPosition);
        };
        const up = ev => {

//            console.log(endPosition);
            //     console.log(ev.offsetY);
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
    };
    return (
        <div onMouseDown={handleMouseDown}>
            {children}
        </div>
    )
}
