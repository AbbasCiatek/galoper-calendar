import React from "react";

export type Views = "day"|"week"|"month"|"year"|"agenda";

export type CalendarContextType = {
    date: Date,
    setDate:React.Dispatch<React.SetStateAction<Date>>
    view: Views
    setView:React.Dispatch<React.SetStateAction<Views>>
}
export type CalendarProviderProps = {
    children: React.ReactNode;
}