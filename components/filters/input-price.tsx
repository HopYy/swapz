import { useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input" 

interface InputPriceProps {
    placeholder: string
    parameterName: string
    onChange: (name: string, value: string) => void
}

export const InputPrice: React.FC<InputPriceProps> = ({ 
    placeholder, 
    parameterName, 
    onChange,
}) => {
    const searchParams = useSearchParams()

    return (
        <input
            className="w-[200px] outline-none bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
            type="number"
            min={0}
            placeholder={placeholder}
            defaultValue={searchParams.get(parameterName) || ""}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'e' || event.key === 'E' || event.key === '-' || event.key === '+') {
                    event.preventDefault();
                } else if (event.key === "Enter") {
                    onChange(
                        parameterName,
                        (event.target as HTMLInputElement).value
                    )
                }
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                onChange(
                    parameterName,
                    event.target.value
                )
            }}
        />
    )
}