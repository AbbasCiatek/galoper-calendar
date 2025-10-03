import CalendarHeader from "@/Components/calendar-header.tsx";
import MonthView from "@/Components/month-view";
import { CalendarContextProvider } from "@/context/calendar-context.tsx";

function App() {
	return (
		<CalendarContextProvider>
			<CalendarHeader />
			<MonthView />
		</CalendarContextProvider>
	);
}

export default App;
