
interface InputProps {
    placeholder: string;
    reference?: any;
}

export const Input = ({reference, placeholder} : InputProps) => {
    return <div>
        <input ref={reference} placeholder={placeholder} type="text" 
        className="px-4 py-2 border rounded mb-2"/>
    </div>
}