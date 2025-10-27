import CustomDragLayer from "@/dnd/custom-drag-layer.tsx";
import type { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export function DndProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
      <CustomDragLayer />
    </DndProvider>
  );
}
