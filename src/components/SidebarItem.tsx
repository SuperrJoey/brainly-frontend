import { ReactElement } from "react";

export function SidebarItem({text, icon}: {
    text: string;
    icon: ReactElement;
}) {
    return <div className="flex my-5 ml-1 text-gray-700 cursor-pointer
    hover:bg-gray-200 rounded max-w-48">
        <div>
        {icon} 
        </div>

        <div>
        {text}

        </div>
    </div>
}