import  {useState} from "react";
import {today} from "@/helpers.ts";
import type {CalendarProviderProps, Views} from "@/types.ts";
import { CalendarContext } from "./context.tsx";

export function CalendarContextProvider({children}:CalendarProviderProps) {
    const [date,setDate]=useState<Date>(today);
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