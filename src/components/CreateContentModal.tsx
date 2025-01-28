import { BACKEND_URL } from "../config"
import { CloseIcon } from "../icons/CloseIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import axios from "axios"
import { useRef, useState } from "react"

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export const CreateContentModal = ({open, onClose }) => {
    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        })
        onClose();
    }

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
                        <Input reference={titleRef} placeholder="title"/>
                        <Input reference={linkRef} placeholder="link"/>
                    </div>
                <div><h1 className="flex justify-center">Type</h1>
                    <div className="flex justify-evenly mb-2 my-2">
                    <Button text="Youtube" variant={type === ContentType.Youtube ? 
                        "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Youtube)
                        }}
                        />
                    <Button text="twitter" variant={type === ContentType.Twitter ? 
                        "primary" : "secondary"} onClick={() => {
                            setType(ContentType.Twitter)
                        }}
                        />
                        </div>
                </div>

                    <div className="flex justify-center">
                    <Button onClick={addContent} variant="primary" text="submit"/>
                    </div>
                </span>
            </div>
            </div>}
    </div>    
}