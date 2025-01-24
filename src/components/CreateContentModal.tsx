import { CloseIcon } from "../icons/CloseIcon"
import { Button } from "./Button"
import { Input } from "./Input"


export const CreateContentModal = ({open, onClose }) => {

    return <div>
        {open && <div
        className="w-screen h-screen bg-slate-500 fixed top-0
        left-0 bg-opacity-60 flex justify-center"> 
            <div className="flex-col flex justify-center">
                <span className="bg-white p-4 rounded-md">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                        <CloseIcon/>
                        </div>
                    </div>
                    <div>
                        <Input placeholder="title"/>
                        <Input placeholder="link"/>
                    </div>
                    <div className="flex justify-center">
                    <Button variant="primary" text="submit"/>
                    </div>
                </span>
            </div>
            </div>}
    </div>    
}