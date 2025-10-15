import { ViewChangerCreateEventButton } from "@/components/header-components/view-changer-create-event-button.tsx";

export function CalendarHeader() {
  return (
    <div className="flex items-center border p-5 m-5 rounded-t-2xl">
      <ViewChangerCreateEventButton />
    </div>
  );
}
