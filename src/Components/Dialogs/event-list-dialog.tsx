import { formatDate } from "date-fns";
import type { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import type { Event } from "@/types.ts";

type Props = {
	children: ReactNode;
	events: Event[];
	date: Date;
};
export default function EventListDialog({ children, events, date }: Props) {
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="mb-2 p-1 font-bold">
						Events on {formatDate(date, "EEEE, MMMM d, yyyy")}
					</DialogTitle>
				</DialogHeader>
				<ScrollArea className="h-[100px] border border-gray-100 rounded-lg ">
					<div className="flex flex-col gap-2 m-2">
						{events.map((event) => (
							// <EventDetailsDialog key={event.id} event={event}>
							<div
								className={`bg-${event.color}-300 w-full h-8 text-white flex flex-row justify-around `}
							>
								<span>{event.title}</span>
								<span>{formatDate(new Date(event.startDate), "hh mm")}</span>
							</div>
							// </EventDetailsDialog>
						))}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
