import type { COLORS } from "@/types.ts";
import { clsx } from "clsx";
import { motion } from "motion/react";

type TProps = {
  color: COLORS;
  className?: string;
};

export function EventBullet({ color, className }: TProps) {
  const colorBulletMap: Record<string, string> = {
    red: "w-2 h-2 rounded-full bg-red-600 dark:bg-red-500",
    green: "w-2 h-2 rounded-full bg-green-600 dark:bg-green-500",
    yellow: "w-2 h-2 rounded-full bg-yellow-600 dark:bg-yellow-500",
    blue: "w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500",
    purple: "w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-500",
    orange: "w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500",
    gray: "w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.25,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      className={clsx(className, colorBulletMap[color])}
    />
  );
}
