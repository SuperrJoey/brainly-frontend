import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function signin() {
        const username = usernameRef.current?.value.trim();
        const password = passwordRef.current?.value.trim();

        if (!username || !password) {
            alert("Username and password are required");
            return;
        }

        setLoading(true);

        try {
            console.log('Sending signup request', { username, password});
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", 
                { username, password }, 
                { withCredentials: true }
            );

            console.log("Signin successful:", response.data);
            
            setTimeout(() => {
                navigate("/home")
            }, 1500);

        } catch (error) {
            console.error("Signin error:", error);
            alert("Signin failed");
            setLoading(false);
        }
    }

    return <div className="h-screen w-screen bg-gray-200 flex
    justify-center items-center">
        <div className="bg-white rounded-md border min-w-48 p-4">
            <Input reference={usernameRef} placeholder="Username" />
            <Input reference={passwordRef} placeholder="Password" />
            
            <div className="flex justify-center pt-4">
            <div className={`w-full transition-opacity ${loading ? "opacity-50 pointer-events-none" : ""}`}>
            <Button 
            variant="primary"
            text={loading ? "" : "Signin"} 
            onClick={signin} 
            fullWidth={true}
            startIcon={loading ? <LoadingSpinner/> : undefined}
            />
            </div>
            </div>

        </div>
    </div>   
}

const LoadingSpinner = () => (
    <div className="w-4 h-4 border-2 border-whote border-t-transparent rounded-full animate-spin">

    </div>
)