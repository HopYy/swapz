import { ControllerRenderProps } from "react-hook-form"

import { Product } from "@/utils/types"
import { Input } from "../../ui/input"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    loading: boolean
    field: ControllerRenderProps<any, any>
}

export const InputNumber: React.FC<InputProps> = ({ loading, field, ...props }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+' || e.key === '.') {
            e.preventDefault()
        } 
    } 

    return (
        <Input
            type="number"
            className="w-52 outline-none px-4 py-2 rounded-md text-sm font-medium"
            onKeyDown={handleKeyDown}
            disabled={loading}
            {...field}
            {...props}
        />
    )
}