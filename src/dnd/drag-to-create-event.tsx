import * as React from "react";
import {type ReactNode} from "react";
import {formatDate, setHours, setMinutes} from "date-fns";
import DropMouseAfterDrag from "@/dnd/drop-mouse-after-drag.tsx";

type TProps = {
    children: ReactNode, date: Date, hour: number, minute: number,
}

const Min_Duration = 15;
const Hour_Height_PX = 96;
const Minute_Height_PX = 48;
const Full_Time_Cell_PX = Hour_Height_PX * 24;


export default function DragToCreateEvent({children, date, hour, minute}: TProps) {
    const handleMouseDown = (e: React.MouseEvent) => {
        const startDragMinute = Math.floor((e.nativeEvent.offsetY) / Minute_Height_PX * 30)+minute;
        const startDragDate = setMinutes(setHours(date, hour), startDragMinute);

        console.log(`clientY: ${e.clientY} - screenY: ${e.screenY} - offsetY: ${e.nativeEvent.offsetY} - layerY: ${e.nativeEvent.layerY}`);
        console.log(formatDate(startDragDate, 'yyyy MM dd HH:mm'));
        // const move= (ev: React.MouseEvent) => {
        //     if(ev. > e.nativeEvent.offsetY ) {
        //         //
        //     }
        // }
        return startDragDate;
    }

    return (<div onMouseDown={handleMouseDown}>
        <DropMouseAfterDrag children={children} startDateEvent={startDragDate} >
            {children}
        </DropMouseAfterDrag>
    </div>)
}