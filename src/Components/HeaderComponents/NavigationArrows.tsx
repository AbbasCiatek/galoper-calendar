import {ChevronRightIcon, ChevronLeftIcon, } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NavigationArrows() {

    const handleLeftClick = () => {alert("left arrow click")}
    const handleRightClick = () => {alert("right arrow click")}


    return (
        <div>
            <Button variant="secondary" size="icon" className="size-8 cursor-pointer " onClick={handleLeftClick} >
                <ChevronLeftIcon/>
            </Button>

            <span className=" px-1 font-extralight">from-date</span>
            -
            <span className=" px-1 font-extralight">to-date</span>
            <Button variant="secondary" size="icon" className="size-8 cursor-pointer " onClick={handleRightClick} >
            <ChevronRightIcon />
            </Button>
        </div>
    )
}