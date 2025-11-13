import { CalendarHeader } from "@/components/calendar-header.tsx";
import { Views } from "@/components/views.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";

function App() {
  return (
    <CalendarContextProvider>
      <div className="container m-auto mt-5">
        <CalendarHeader />
        <Views />
      </div>
    </CalendarContextProvider>
  );
}

export default App;
