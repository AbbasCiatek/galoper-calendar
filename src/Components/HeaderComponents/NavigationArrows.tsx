import {rangeDisplayer} from "@/Functions/RangeDisplayerFunction.ts";
import {ChevronRightIcon, ChevronLeftIcon, } from "lucide-react"
import { Button } from "@/components/ui/button"
import type {Views} from "@/types.ts";
import DateSubtracterFunction from "@/Functions/DateSubtracterFunction.ts";
import DateAdderFunction from "@/Functions/DateAdderFunction.ts";
import {useCalendar} from "@/context/context.tsx";


export default function NavigationArrows() {
    const {view , date ,setDate } = useCalendar();

    const handleLeftClick = (view:Views,date:Date) => {
        date = DateSubtracterFunction(view,date);
        setDate(date);
        console.log(date);
    }
    const handleRightClick = (view:Views,date:Date) => {
        date =DateAdderFunction(view,date)
        setDate(date);
        console.log(date);
    }
    return (
        <div>
            <Button
                variant="secondary"
                size="icon"
                className="size-8 cursor-pointer"
                onClick={()=>{handleLeftClick(view,date)}}
            >
                <ChevronLeftIcon/>
            </Button>
            <span className="text-gray-500" >{rangeDisplayer(view,date)}</span>
            <Button
                variant="secondary"
                size="icon"
                className="size-8 cursor-pointer "
                onClick={()=>{handleRightClick(view,date)}}
            >
            <ChevronRightIcon />
            </Button>
        </div>
    )
}