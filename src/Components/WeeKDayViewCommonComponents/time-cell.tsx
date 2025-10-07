//import { setHours, setMinutes } from "date-fns";
//import { useCalendar } from "@/context/calendar-context.tsx";
import { Hours } from "@/helpers.ts";

export default function TimeCells() {
	//const date = useCalendar();

	return (
		<>
			{Hours.map((hour, index) => {
				return (
					<div key={hour} className="relative h-24">
						{index !== 0 && (
							<div className="pointer-events-none absolute  inset-x-0 top-0 border-b"></div>
						)}
						{/*<DroppableTimeCell date={date} hour={hour} minute={0}>*/}
						{/*<AddEditEventDialog startDate={setMinutes(setHours(date,hour),0)} endDate={setMinutes(setHours(date,hour),30)} >*/}
						<div className="absolute inset-x-0 top-0 h-12 cursor-pointer hover:bg-accent" />
						{/*</AddEditEventDialog>*/}
						{/*</DroppableTimeCell>*/}

						<div className="pointer-events-none absolute inset-x-0 top-1/2 border-b   border-dashed"></div>
						{/*<DroppableTimeBlock date={date} hour={hour} minute={30}>*/}
						{/*<AddEditEventDialog startDate={setMinutes(setHours(date,hour),30)} endDate={setMinutes(setHours(date,hour+1),0)} >*/}
						<div className="absolute inset-x-0 top-12 h-12 cursor-pointer  hover:bg-accent" />
						{/*</AddEditEventDialog>*/}
						{/*</DroppableTimeBlock>*/}
					</div>
				);
			})}
		</>
	);
}
