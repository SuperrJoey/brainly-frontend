import { ReactElement } from "react";

export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement;
}) {
    return <div className="flex items-center my-5 ml-1 text-gray-700 cursor-pointer
    hover:bg-gray-200 rounded max-w-48">
        <div  className="mr-3">
        {icon} 
        </div>

        <div>
        {text}

        </div>
    </div>
}