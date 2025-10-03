import type {ReactNode} from "react";

export default function DateDisplayLayout({children}: {children: ReactNode}) {
    return (
        <div className="relative z-20 flex border-b">
            <div className="w-18"></div>
            {children}
        </div>
    )
}