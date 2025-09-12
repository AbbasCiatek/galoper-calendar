
import NavigationArrows from "@/Components/HeaderComponents/NavigationArrows.tsx";
import MonthYear from "@/Components/HeaderComponents/MonthYear.tsx";

export default function CalendarHeader() {
    return(
    <div className='flex flex-col border p-4 m-4 rounded-t-lg '>
        <MonthYear/>
        <NavigationArrows/>
    </div>
    )
}
