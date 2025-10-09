import DateAndNavigators from "@/components/header-components/date-and-navigators.tsx";

export default function CalendarHeader() {
  return (
    <div className="flex items-center border p-5 m-5 rounded-t-2xl">
      <div className="flex flex-col ">
        <DateAndNavigators />
      </div>
    </div>
  );
}
