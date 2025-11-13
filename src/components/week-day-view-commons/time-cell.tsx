import { HOURS } from "@/constants";
import { setHours, setMinutes } from "date-fns";
import { AddEditEventDialog } from "../dialogs/add-edit-event-dialog";
export function TimeCells({ date }: { date: Date }) {
  return (
    <>
      {HOURS.map((hour, index) => {
        return (
          <div key={hour} className="relative h-24">
            {index !== 0 && (
              <div className="pointer-events-none absolute inset-x-0 top-0 border-b" />
            )}
            <AddEditEventDialog
              startDate={setMinutes(setHours(date, hour), 0)}
              endDate={setMinutes(setHours(date, hour), 30)}
            >
              <div className="absolute inset-x-0 top-0 h-12 hover:bg-accent" />
            </AddEditEventDialog>
            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b   border-dashed" />
            <AddEditEventDialog
              startDate={setMinutes(setHours(date, hour), 30)}
              endDate={setMinutes(setHours(date, hour), 60)}
            >
              <div className="absolute inset-x-0 top-12 h-12 hover:bg-accent" />
            </AddEditEventDialog>
          </div>
        );
      })}
    </>
  );
}
