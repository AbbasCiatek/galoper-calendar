import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button";
import { useCalendar } from "@/context/calendar-context.tsx";
import {
  DateAdderFunction,
  DateSubtracterFunction,
  getNumberOfEvents,
  rangeDisplayer,
} from "@/dateHelpers.ts";
import type { ViewTypes } from "@/types.ts";
import { formatDate } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function DateAndNavigators() {
  const { view, date, setDate } = useCalendar();

  const today = new Date();

  const handleTodayClick = (date: Date) => {
    if (date !== today) {
      setDate(today);
    }
  };

  const handleLeftClick = (view: ViewTypes, date: Date) => {
    const subtractedDate = DateSubtracterFunction(view, date);
    setDate(subtractedDate);
  };

  const handleRightClick = (view: ViewTypes, date: Date) => {
    const addedDate = DateAdderFunction(view, date);
    setDate(addedDate);
  };

  const eventCounter = getNumberOfEvents(date, view);

  return (
    <div className="flex flex-row">
      <button
        type="button"
        onClick={() => handleTodayClick(date)}
        className="border text-center size-16 mr-2 pt-1 rounded-lg cursor-pointer font-bold text-gray-900 dark:bg-gray-900 dark:text-white"
      >
        {formatDate(today, "MMM").toUpperCase()}
        <p className="pt-1.5 w-full h-9 bg-gray-900 rounded-b-lg pb-[2px] text-white dark:text-gray-900 dark:bg-white ">
          {today.getDate()}
        </p>
      </button>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <p className="font-extrabold text-2xl pb-1">
            {formatDate(date, "MMMM yyyy")}
          </p>
          <div className="mx-1">
            <Badge variant="secondary" className="py-1 px-3">
              {eventCounter} events
            </Badge>
          </div>
        </div>
        <div>
          <Button
            variant="secondary"
            size="icon"
            className="size-7 cursor-pointer mr-1"
            onClick={() => {
              handleLeftClick(view, date);
            }}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="text-gray-500">{rangeDisplayer(view, date)}</span>
          <Button
            variant="secondary"
            size="icon"
            className="size-7 cursor-pointer ml-1"
            onClick={() => {
              handleRightClick(view, date);
            }}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
