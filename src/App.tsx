import CalendarHeader from "@/Components/calendar-header.tsx";
import {CalendarContextProvider} from "@/context/calendar-context.tsx";

function App() {
    return (
        <CalendarContextProvider  >
            <CalendarHeader />
        </CalendarContextProvider>
    )
}

export default App