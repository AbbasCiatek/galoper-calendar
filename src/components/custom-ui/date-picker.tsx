import { Button } from "@/components/ui/button.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import {
  formatDate,
  getHours,
  getMinutes,
  isDate,
  isThisYear,
  setHours,
  setMinutes,
} from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type DatePickerProps = {
  id: string;
  value?: Date;
  onSelect: (date: Date) => void;
  startMonth?: Date;
  isChecked?: boolean;
};

export function DatePicker({
  id,
  value,
  onSelect,
  startMonth,
  isChecked,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const defaultHours = isDate(value) ? getHours(value) : getHours(new Date());
  const defaultMinutes = isDate(value)
    ? getMinutes(value)
    : getMinutes(new Date());
  const [time, setTime] = useState(
    `${String(defaultHours).padStart(2, "0")}:${String(defaultMinutes).padStart(2, "0")}`,
  );
  const handleSelectedDate = (date: Date | undefined) => {
    if (!date) return;
    const [hh, mm] = time.split(":").map(Number);
    const combinedDate = setMinutes(setHours(date as Date, hh), mm);

    onSelect(combinedDate);
    setOpen(false);
  };
  const handleTimeChanged = (time: string) => {
    setTime(time);
    if (value) {
      const [hh, mm] = time.split(":").map(Number);
      const combinedDate = setMinutes(setHours(value, hh), mm);

      onSelect(combinedDate);
    }
  };
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={id}
              className="w-auto justify-between font-normal"
            >
              {isDate(value)
                ? isThisYear(value)
                  ? formatDate(value, "EEEE, MMMM d")
                  : formatDate(value, "EEEE,  MMMM d, y ")
                : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              captionLayout="label"
              startMonth={startMonth}
              endMonth={new Date(9999, 0)}
              onSelect={handleSelectedDate}
            />
          </PopoverContent>
        </Popover>
      </div>
      {!isChecked && (
        <div className="flex flex-col gap-3">
          <Input
            type="time"
            id="time-picker"
            step="60"
            value={time}
            onChange={(e) => handleTimeChanged(e.target.value)}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      )}
    </div>
  );
}
