import { transition } from "@/lib/animations.ts";
import type { COLORS } from "@/types.ts";
import { clsx } from "clsx";
import { motion } from "motion/react";

export function EventBullet({ color }: { color: COLORS }) {
  const bulletStyle = (colorSelected: COLORS) => {
    switch (colorSelected) {
      case "red":
        return "w-2 h-2 rounded-full bg-red-600 dark:bg-red-500";
      case "green":
        return "w-2 h-2 rounded-full bg-green-600 dark:bg-green-500";
      case "yellow":
        return "w-2 h-2 rounded-full bg-yellow-600 dark:bg-yellow-500";
      case "blue":
        return "w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500";
      case "purple":
        return "w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-500";
      case "orange":
        return "w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500";
      default:
        return "w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500";
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.25,
        duration: 0.5,
        ...transition,
      }}
      className={clsx(bulletStyle(color), "mt-0.5")}
    />
  );
}
