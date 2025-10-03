import CalendarHeader from "@/Components/calendar-header.tsx";
import DayView from "@/Components/day-view.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";

function App() {
    return (
        <CalendarContextProvider  >
            <div className="container m-auto mt-5">
            <CalendarHeader />
                <DayView />
            </div>
        </CalendarContextProvider>
    )
}

export default App
