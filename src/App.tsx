import CalendarHeader from "@/Components/calendar-header.tsx";
import MonthView from "@/Components/month-view";
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
