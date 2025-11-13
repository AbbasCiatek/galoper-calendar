import { DateAndNavigators } from "@/components/header-components/date-and-navigators.tsx";
import { ViewChangerCreateEventButton } from "@/components/header-components/view-changer-create-event-button.tsx";

export function CalendarHeader() {
  return (
    <div className="flex items-center justify-around border dark:border-gray-200 p-5 border-b-0 rounded-t-2xl">
      <DateAndNavigators />
      <ViewChangerCreateEventButton />
    </div>
  )
}
