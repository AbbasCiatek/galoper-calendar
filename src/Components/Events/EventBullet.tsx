
import type {COLORS} from "@/types.ts";


export function EventBullet({color}: { color:COLORS }) {

    const bulletStyle = (colorSelected:COLORS)=>{
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
                return  "w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-500";
            case "orange":
                return "w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500";
            default:
                return "w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500";
        }
    }
    return (
        <div
            className={bulletStyle(color)}
        />)
}