import { TwiiterIcon } from "../icons/Twitter"
import { YTicon } from "../icons/YTicon"
import { SidebarItem } from "./SidebarItem"
import { Brainly } from "../icons/Brainly"

export const Sidebar = () => {
    return <div className="h-screen fixed bg-white border-r w-64
    position-absolute left-0 top-0">
        <h1 className="flex ml-4 mt-4 text-2xl cursor-pointer item-center">
            <div className="pr-2 text-purple-700">
            <Brainly/>
            </div>
            Brainly
        </h1>
        <div className="pl-3">
            <SidebarItem text="Twitter" icon={<TwiiterIcon/>}/>
            <SidebarItem text="YouTube" icon={<YTicon/>}/>

        </div>
    </div>
}