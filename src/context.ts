import {createContext} from "react";
import {type Views} from './types.ts'
const ViewContext = createContext<Views>("week");
export default ViewContext;