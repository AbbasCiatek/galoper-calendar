import {z} from "zod";

export const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.date({message: "Start date is required"}),
    endDate: z.date({message: "End date is required"}),
    color: z.enum(["blue", "green", "red", "yellow", "purple", "orange", "gray"], {message: "Color is required"}),
    isAllDay: z.boolean().default(false),
});
export type EventFormData = z.infer<typeof eventSchema>;