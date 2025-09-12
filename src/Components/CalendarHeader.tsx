
import NavigationArrows from "@/Components/HeaderComponents/NavigationArrows.tsx";
import MonthYear from "@/Components/HeaderComponents/MonthYear.tsx";

export default function CalendarHeader() {
    return(
        <div className="flex items-center border p-5 m-5 rounded-t-2xl font-bold">
            <div className='flex flex-col '>
                <MonthYear/>
                <NavigationArrows/>
            </div>
        </div>
    )
}
