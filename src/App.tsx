import CalendarHeader from "@/Components/CalendarHeader.tsx";
import ViewContext from "@/context.ts";

function App() {
    return (
        <ViewContext value={"week"}>
            <CalendarHeader />
        </ViewContext>
    )
}

export default App