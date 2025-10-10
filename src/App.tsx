import CalendarHeader from "@/Components/calendar-header.tsx";
import YearView from "@/Components/year-view.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";

function App() {
  return (
    <CalendarContextProvider>
      <div className="container m-auto mt-5">
        <CalendarHeader />
        <YearView />
      </div>
    </CalendarContextProvider>
  );
}

export default App;
