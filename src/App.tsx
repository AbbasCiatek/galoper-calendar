import CalendarHeader from "@/components/calendar-header.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";
import MonthView from "@/Components/MonthView.tsx";
function App() {
  return (
    <CalendarContextProvider>
      <div className="container m-auto mt-5">
        <CalendarHeader />
          <MonthView/>
      </div>
    </CalendarContextProvider>
  );
}

export default App;
