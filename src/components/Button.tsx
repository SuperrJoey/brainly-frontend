import { ReactElement } from "react";

type Variants = "primary" | "secondary"

export interface ButtonProps {
    variant: Variants;
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;

}

const defaultStyles = "rounded-md px-4 py-2 flex font-normal items-center justify-center"

const variantSyles = {
    "primary": "bg-purple-600 text-white hover:bg-purple-700 transition-coliors",
    "secondary": "bg-purple-300 text-purple-600 hover:bg-gray-300 transition-colors"
}

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "p-6"
}

export const Button = (props: ButtonProps) => { 
    
    return  <button onClick={props.onClick} className={`${variantSyles[props.variant]} ${defaultStyles} 
    ${sizeStyles[props.size]} ${props.fullWidth ? " w-full": ""}`}>
       {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} 
       {props.text} 
       {props.endIcon}
    </button>

    
    
}

