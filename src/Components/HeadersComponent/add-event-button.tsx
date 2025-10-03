import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
