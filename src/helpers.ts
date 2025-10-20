
export const titleFromColor = (colorSelected:string)=>{
    switch(colorSelected){
        case "red":return "text-red-500";
        case "green":return"text-green-500";
        case "yellow":return"text-yellow-500";
        case "blue":return"text-blue-500";
        case "purple":return"text-purple-500";
        case "orange":return"text-orange-500";
        case "gray":return"text-gray-500";
        default:return "text-gray-800"
    }
}
export const detailsFromColor = (colorSelected:string)=>{
    switch(colorSelected){
        case "red":return "text-red-300";
        case "green":return"text-green-300";
        case "yellow":return"text-yellow-300";
        case "blue":return"text-blue-300";
        case "purple":return"text-purple-300";
        case "orange":return"text-orange-300";
        case "gray":return"text-gray-300";
        default:return "text-white"
    }
}