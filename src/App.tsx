import { CalendarHeader } from "@/components/calendar-header.tsx";
import { DayView } from "@/components/day-view.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";
import { DndProviderWrapper } from "./dnd/dnd-provider-wrapper";

function App() {
  return (
    <DndProviderWrapper>
    <CalendarContextProvider>
      <div className="container m-auto mt-5">
        <CalendarHeader />
        <DayView />
      </div>
    </CalendarContextProvider>
    </DndProviderWrapper>
  );
}

export default App;
