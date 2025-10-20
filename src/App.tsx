import { CalendarHeader } from "@/components/calendar-header.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";
import { WeekView } from "./components/week-view";

function App() {
  return (
    <CalendarContextProvider>
      <div className="container m-auto mt-5">
        <CalendarHeader />
        <WeekView />
      </div>
    </CalendarContextProvider>
  );
}

export default App;
