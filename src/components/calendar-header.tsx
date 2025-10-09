import { AddEventButton } from "@/components/header-components/add-event-button.tsx";

export default function CalendarHeader() {
  return (
    <div className="flex items-center border p-5 m-5 rounded-t-2xl">
      <AddEventButton />
    </div>
  );
}
