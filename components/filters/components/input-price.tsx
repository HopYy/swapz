import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

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
    const [inputValue, setInputValue] = useState<string | undefined>(
        searchParams.get(parameterName) ?? undefined
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'e' || e.key === 'E' || e.key === '-' || e.key === '+' || e.key === '.') {
            e.preventDefault()
        } else if (e.key === "Enter") {
            onChange(parameterName, inputValue || "")
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onChange(parameterName, e.target.value)
    }

    useEffect(() => {
        setInputValue(searchParams.get(parameterName) ?? "")
    }, [parameterName])      

  return (
        <input
            className="w-52 outline-none bg-gray-100 px-4 py-2 rounded-md text-sm font-medium"
            type="number"
            min={0}
            placeholder={placeholder}
            value={inputValue || ""}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onChange={(e) => setInputValue(e.target.value)}
        />
  )
}
