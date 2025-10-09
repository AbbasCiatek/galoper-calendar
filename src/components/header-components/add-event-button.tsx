import { Button } from "@/components/ui/button.tsx";
import { PlusIcon } from "lucide-react";

export function AddEventButton() {
  return (
    //<AddEventDialog>
    <Button className="font-semibold" variant="default">
      {" "}
      <PlusIcon /> Add Event
    </Button>
    //</AddEventDialog>
  );
}
