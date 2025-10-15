import { DateAndNavigators } from "@/components/header-components/date-and-navigators.tsx";

export function CalendarHeader() {
  return (
    <div className="flex items-center border p-5 m-5 rounded-t-2xl">
      <DateAndNavigators />
    </div>
  );
}
