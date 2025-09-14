import CalendarHeader from "@/Components/CalendarHeader.tsx";
import ViewContext, {DateContext} from "@/context.ts";
import {today} from "@/helpers.ts";

function App() {
    return (
        <ViewContext value={"week"}>
        <DateContext value={today}>
            <CalendarHeader />
        </DateContext>
        </ViewContext>
    )
}

export default App