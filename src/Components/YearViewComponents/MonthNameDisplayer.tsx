import {formatDate} from "date-fns";

export default function monthNameDisplayer({ month  }: {month :Date}) {
    const formattedMonth = formatDate(month, 'MMMM');
    const handleMonthClick=(month :Date)=> {
        console.log(month);
        //must navigate to month the view with the specific month
    }
    return (
        <div
            onClick={() => {handleMonthClick(month)}}
            className = 'text-3xl font-bold text-center px-20 py-2 border-2 cursor-pointer  rounded-t-lg hover:bg-gray-200' >
            {formattedMonth}
        </div>
    );
}