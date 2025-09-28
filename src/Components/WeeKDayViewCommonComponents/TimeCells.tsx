import {Hours} from "@/helpers.ts";
export default function TimeCells({day}:{day:Date} ) {


    return (
        <>
            {Hours.map((hour, index) => {
                return (
                    <div key={hour} className="relative h-24" >
                        {index !== 0 && <div className="pointer-events-none absolute  inset-x-0 top-0 border-b"></div>}
                        {/*<AddEditEventDialog startDate={setMinutes(setHours(day,hour),0)} endDate={setMinutes(setHours(day,hour),30)} >*/}
                            <div className="absolute inset-x-0 top-0 h-12 cursor-pointer hover:bg-accent"/>
                        {/*</AddEditEventDialog>*/}


                        <div className="pointer-events-none absolute inset-x-0 top-1/2 border-b   border-dashed"></div>

                        {/*<AddEditEventDialog startDate={setMinutes(setHours(day,hour),30)} endDate={setMinutes(setHours(day,hour+1),0)} >*/}
                        <div className="absolute inset-x-0 top-12 h-12 cursor-pointer  hover:bg-accent" />
                        {/*</AddEditEventDialog>*/}
                    </div>


                );
            })}
        </>
    )
}