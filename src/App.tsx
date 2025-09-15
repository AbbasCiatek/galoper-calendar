import CalendarHeader from "@/Components/CalendarHeader.tsx";
import {CalendarContextProvider} from "@/context/contextComponent.tsx";

function App() {
    return (
        <CalendarContextProvider  >
        <CalendarHeader />
        </CalendarContextProvider>
    )
}

export default App