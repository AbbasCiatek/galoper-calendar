import {createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState} from "react";
import type {ViewTypes} from "@/types.ts";


export type CalendarContext = {
  date: Date,
  setDate: Dispatch<SetStateAction<Date>>
  view: ViewTypes
  setView: Dispatch<SetStateAction<ViewTypes>>
}

export const CalendarContext = createContext<CalendarContext | null>(null);


export function useCalendar(): CalendarContext {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar context must be in CalendarContextProvider");
  }

  return context;
}

export function CalendarContextProvider({children}: { children: ReactNode }) {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<ViewTypes>("day");

  return (
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
