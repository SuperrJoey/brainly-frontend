import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            console.log('Sending signup request', { username, password});
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                    username,
                    password
            });
            navigate("/signin")
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed");
        }
    }

    return ( 
    <div className="h-screen w-screen bg-gray-200">
        <h3 className="flex justify-center text-purple-700 text-2xl p-10">Welcome to brainly</h3>
        <div className="flex justify-center items-center my-10">
        <div className="bg-white rounded-md border min-w-48 p-4">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            
            <div className="flex justify-center pt-4">
            <Button variant="primary" text="Signup" onClick={signup} fullWidth={true}/>
            </div>

        </div>
        </div>
    </div>  
    ) 
}