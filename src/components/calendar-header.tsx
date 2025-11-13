import { DateAndNavigators } from "@/components/header-components/date-and-navigators.tsx";
import { ViewChangerCreateEventButton } from "@/components/header-components/view-changer-create-event-button.tsx";

export function CalendarHeader() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between border dark:border-gray-200 p-5 border-b-0 rounded-t-2xl">
      <DateAndNavigators />
      <ViewChangerCreateEventButton />
    </div>
  );
}
