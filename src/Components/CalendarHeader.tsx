import ViewChanger from "@/Components/HeaderComponents/ViewChanger.tsx";


export default function CalendarHeader() {

    return (
        <div className="flex items-center border p-5 m-5 rounded-t-2xl font-bold">
            <ViewChanger/>
        </div>
    )
}