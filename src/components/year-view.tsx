import MonthContainers from "@/components/year-view-components/month-containers.tsx";

export default function YearView() {
  return (
    <div className="p-4 rounded-b-2xl border dark:border-gray-200 flex  justify-center ">
      <MonthContainers />
    </div>
  );
}
