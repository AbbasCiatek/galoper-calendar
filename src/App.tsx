import CalendarHeader from "@/components/calendar-header.tsx";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";
import { DndProviderWrapper } from "./dnd/dnd-provider-wrapper";

function App() {
  return (
    <CalendarContextProvider>
      <DndProviderWrapper>
        <div className="container m-auto mt-5">
          <CalendarHeader />
        </div>
      </DndProviderWrapper>
    </CalendarContextProvider>
  );
}

export default App;
