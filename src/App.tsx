import CalendarHeader from "@/Components/calendar-header.tsx";
import {CalendarContextProvider} from "@/context/calendar-context.tsx";
import MonthView from "@/Components/MonthView.tsx";

function App() {
  return (
    <CalendarContextProvider>
      <CalendarHeader/>
      <MonthView/>
    </CalendarContextProvider>
  )
}

export default App