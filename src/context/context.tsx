import {createContext, useContext} from "react";
import type {CalendarContextType} from "@/types.ts";

export const CalendarContext = createContext<CalendarContextType | null>(null);

export function useCalendar():CalendarContextType{
    const context = useContext(CalendarContext);
    if(!context){
        throw new Error ("useCalendar context must be in CalendarContextProvider");
    }
    return context;
}
