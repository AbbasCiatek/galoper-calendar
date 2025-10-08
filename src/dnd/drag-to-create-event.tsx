import  {type ReactNode} from "react";
import * as React from "react";
import {formatDate, setHours, setMinutes} from "date-fns";

type TProps ={
    children: ReactNode,
    date:Date,
    hour:number,
    minute:number,
}

const Min_Duration = 15;
const Hour_Height_PX = 96;
const Minute_Height_PX=48;
const Full_Time_Cell_PX=Hour_Height_PX*24;


export default function DragToCreateEvent ({children,date,hour,minute}:TProps) {
    const handleMouseDown = (e:React.MouseEvent) => {
        const startDragMinute = (e.nativeEvent.offsetY)/Minute_Height_PX *30;
        const startDragDate = setMinutes(setHours(new Date(date),hour),(minute+startDragMinute));
        console.log(formatDate(startDragDate,'yyyy-MM-dd HH:mm'));
    }

    return(
        <div onMouseDown={handleMouseDown} >
            {children}
        </div>
    )
}