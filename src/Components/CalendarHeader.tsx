import {useContext} from "react";
import ViewContext from "@/context.ts";

export default function CalendarHeader() {
    const view = useContext(ViewContext);

    return (
        <div className="flex items-center border p-5 m-5 rounded-t-2xl font-bold">
        </div>
    )
}