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
    <div>
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
  );
}
