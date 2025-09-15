import  {useState} from "react";
import {today} from "@/helpers.ts";
import type {CalendarProviderProps, Views} from "@/types.ts";
import { CalendarContext } from "./context.tsx";

export function CalendarContextProvider({children}:CalendarProviderProps) {
    const customDate = new Date(2025,7,21,12);
    const [date,setDate]=useState<Date>(customDate);
    const [view,setView]=useState<Views>("day");
    return(
        <CalendarContext.Provider
            value={{
                date,
                setDate,
                view,
                setView
            }}>
            {children}
        </CalendarContext.Provider>
    );
}