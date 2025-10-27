import type { Event } from "@/event-store.ts";
import { clsx } from "clsx";
import { type ReactNode, useEffect, useRef } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

export const ItemTypes = {
  EVENT: "event",
};

export default function DraggableEvents({
  children,
  event,
}: { children: ReactNode; event: Event }) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: ItemTypes.EVENT,
    item: () => {
      const width = ref.current?.offsetWidth || 0;
      const height = ref.current?.offsetHeight || 0;
      return { event, children, width, height };
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(ref);

  return (
    <div ref={ref} className={clsx(isDragging && "opacity-40")}>
      {children}
    </div>
  );
}
