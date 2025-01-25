import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            console.log('Sending signup request', { username, password});
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                    username,
                    password
            });
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            //redirect user to dashboard
            navigate("/home")

        } catch (error) {
            console.error("Signin error:", error);
            alert("Signin failed");
        }
    }

    return <div className="h-screen w-screen bg-gray-200 flex
    justify-center items-center">
        <div className="bg-white rounded-md border min-w-48 p-4">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            
            <div className="flex justify-center pt-4">
            <Button variant="primary" text="Signin" onClick={signin} fullWidth={true}/>
            </div>

        </div>
    </div>   
}