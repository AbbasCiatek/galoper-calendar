import { CalendarHeader } from "@/components/calendar-header.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";
import WeekView from "@/Components/WeekView.tsx";

function App() {
    return (
        <CalendarContextProvider  >
            <div className="container m-auto mt-5">
            <CalendarHeader />
                <WeekView date={date}/>
            </div>
        </CalendarContextProvider>
    )
}

export default App
