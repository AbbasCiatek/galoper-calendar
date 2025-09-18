import { useEffect, useState} from "react";
import {formatDate} from "date-fns";

export default function TimeLine() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(()=>{
        const timer = setInterval(()=>(setCurrentTime(new Date())),60 * 1000);
        return () => clearInterval(timer);
    },[]);
    const getCurrentPositionTime = ()=> {
        const minutesInDay = 24 * 60;
        const minute = currentTime.getHours() * 60 + currentTime.getMinutes();
        return (minute / minutesInDay) * 100;
    }
    // const formatTime = ()=>{
    //     return formatDate(currentTime,'h:mm aaa');
    // }
    return (
        <div className="group">
            <div className="pointer-events-none absolute inset-x-0 z-50 border-t border-red-500 "
                 style={{ top: `${getCurrentPositionTime()}%` }}>
                <div className=" absolute -left-2 -top-1.5 size-3  rounded-full bg-red-500 "></div>
                    {/*<div className=" opacity-35 absolute left-[-72px] flex w-16 -translate-y-1/2 justify-end bg-background pr-1 text-xs font-medium text-primary">*/}
                    {/*{formatTime()}*/}
                    {/*</div>*/}
            </div>
        </div>
    );
}
