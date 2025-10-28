import { HOURS } from "@/constants";
import { DroppableTimeCell } from "@/dnd/droppable-time-cell.tsx";
export function TimeCells({ date }: { date: Date }) {
  return (
    <>
      {HOURS.map((hour, index) => {
        return (
          <div key={hour} className="relative h-24">
            {index !== 0 && (
              <div className="pointer-events-none absolute inset-x-0 top-0 border-b" />
            )}
            <DroppableTimeCell date={date} hour={hour} minute={0}>
              <div className="absolute inset-x-0 top-0 h-12 hover:bg-accent" />
            </DroppableTimeCell>
            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b   border-dashed" />
            <DroppableTimeCell date={date} hour={hour} minute={30}>
              <div className="absolute inset-x-0 top-12 h-12 hover:bg-accent" />
            </DroppableTimeCell>
          </div>
        );
      })}
    </>
  );
}
