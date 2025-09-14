import {rangeDisplayer} from "@/Functions/RangeDisplayerFunction.ts";
import {ChevronRightIcon, ChevronLeftIcon, } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useContext} from "react";
import ViewContext, {DateContext} from "@/context.ts";
import type {Views} from "@/types.ts";


export default function NavigationArrows() {
    const view = useContext(ViewContext);
    const date:Date = useContext(DateContext);
    const handleLeftClick = (view:Views,date:Date) => {alert(`left arrow click ${view} and ${date}`)}
    const handleRightClick = (view:Views,date:Date) => {alert(`right arrow click ${view} and ${date}`)}
    return (
        <div>
            <Button variant="secondary" size="icon" className="size-8 cursor-pointer " onClick={()=>{handleLeftClick(view,date)}} >
                <ChevronLeftIcon/>
            </Button>
            <span className="text-gray-500" >{rangeDisplayer(view,date)}</span>
            <Button variant="secondary" size="icon" className="size-8 cursor-pointer " onClick={()=>{handleRightClick(view,date)}} >
            <ChevronRightIcon />
            </Button>
        </div>
    )
}