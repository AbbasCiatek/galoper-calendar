import CalendarHeader from "@/components/calendar-header.tsx";
import { MonthView } from "@/components/month-view";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";

function App() {
  return (
    <CalendarContextProvider>
      <div className="container m-auto mt-5">
        <CalendarHeader />
        <MonthView />
      </div>
    </CalendarContextProvider>
  );
}

export default App;
