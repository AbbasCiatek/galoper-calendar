import {ChevronRightIcon, ChevronLeftIcon, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useContext} from "react";
import ViewContext from "@/context.ts";
import type {Views} from "@/types.ts";
import {formatDate} from "date-fns";


export default function NavigationArrows() {
    const today =new Date();
    const view = useContext(ViewContext);
    const handleLeftClick = () => {alert("left arrow click")}
    const handleRightClick = () => {alert("right arrow click")}

    //display week start->end
    const rangeDisplayer = (view:Views)=>{
        switch(view){
            case "day":
                return (<span className=" px-1 font-extralight">{formatDate(today,'MMM, dd yyyy ')}</span>)
            case "agenda":
                return (<span className=" px-1 font-extralight">{formatDate(today,"MMM, yyyy")}</span>)
            case "week":
                return (<span className=" px-1 font-extralight">{formatDate(today,"")}</span>)
            case "month":
                return (<span className=" px-1 font-extralight">{formatDate(today,"MMM, yyyy")}</span>)
            case "year":
                return (<span className=" px-1 font-extralight">{formatDate(today,"yyyy")}</span>)
            default:
                return (<span className=" px-1 font-extralight">{formatDate(today,"MMM, yyyy")}</span>)

        }
    };


    return (
        <div>
            <Button variant="secondary" size="icon" className="size-8 cursor-pointer " onClick={handleLeftClick} >
                <ChevronLeftIcon/>
            </Button>
            {rangeDisplayer(view)}
            <Button variant="secondary" size="icon" className="size-8 cursor-pointer " onClick={handleRightClick} >
            <ChevronRightIcon />
            </Button>
        </div>
    )
}