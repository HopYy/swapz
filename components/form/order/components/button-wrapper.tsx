import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button-component"

interface ButtonWrapperProps {
    loading: boolean
}

export const ButtonsWrapper: React.FC<ButtonWrapperProps> = ({ loading }) => {
    const router = useRouter()

    const handleRedirect = () => {
        if(!loading) {
            router.back()
        }
    }

    return (
        <div className='flex gap-4 my-10'>
            <Button 
                type="button" 
                className='text-gray-500 bg-white' 
                disabled={loading} 
                onClick={handleRedirect}
            >
                <span className="text-black text-sm font-semibold tracking-wide">Go back</span>
            </Button>
            <Button type="submit" disabled={loading}>
                <span className="text-white text-sm font-semibold tracking-wide">Continue payment</span>
            </Button>
        </div>
    )
}