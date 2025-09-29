import { z} from "zod";
import {isAfter} from "date-fns";

export const eventSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    startDate: z.date({message: "Start date is required"}),
    endDate: z.date({message: "End date is required"}),
    color: z.enum(["blue", "green", "red", "yellow", "purple", "orange", "gray"], {message: "Color is required"}),
}).refine((data)=> isAfter(data.endDate,data.startDate) ,{
    message: "The ending date must be after the starting date ",
    path:["endDate"],
}).refine((data)=> (data.endDate.getTime() - data.startDate.getTime())> (60 *1000) ,{
  message: "Minimum Event Duration is One Minute ",
  path:["endDate"],
});
// type InputType = z.input<typeof eventSchema>;
//type OutputType =z.output<typeof eventSchema>;

export type EventFormData = z.infer<typeof eventSchema>
    //InputType | OutputType;
