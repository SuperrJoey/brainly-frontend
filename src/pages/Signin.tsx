import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signin() {
    return <div className="h-screen w-screen bg-gray-200 flex
    justify-center items-center">
        <div className="bg-white rounded-md border min-w-48 p-4">
            <h2 className="flex justify-center">Welcome Back!</h2>
            <div className=" mt-2">
            <Input placeholder="Username" />
            <Input placeholder="Password" />
            </div>
            
            <div className="flex justify-center pt-4">
            <Button variant="primary" text="Signin" fullWidth={true}/>
            </div>

        </div>
    </div>   
}