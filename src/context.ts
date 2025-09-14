import {createContext} from "react";
import {type Views} from './types.ts'
import {today} from "@/helpers.ts";
const ViewContext = createContext<Views>("week");
export const DateContext = createContext<Date>(today);
export default ViewContext;
