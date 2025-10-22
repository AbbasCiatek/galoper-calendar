import { AgendaView } from "@/components/agenda-view.tsx";
import CalendarHeader from "@/components/calendar-header.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";

function App() {
  return (
    <CalendarContextProvider>
      <div className="container m-auto mt-5">
        <CalendarHeader />
        <AgendaView />
      </div>
    </CalendarContextProvider>
  );
}

export default App;
