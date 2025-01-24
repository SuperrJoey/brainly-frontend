import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            console.log('Sending signup request', { username, password});
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                data : {
                    username,
                    password
                }
            });
            alert("signed up!")
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed");
        }
    }

    return <div className="h-screen w-screen bg-gray-200 flex
    justify-center items-center">
        <div className="bg-white rounded-md border min-w-48 p-4">
            <Input ref={usernameRef} placeholder="Username" />
            <Input ref={passwordRef} placeholder="Password" />
            
            <div className="flex justify-center pt-4">
            <Button variant="primary" text="Signup" onClick={signup} fullWidth={true}/>
            </div>

        </div>
    </div>   
}