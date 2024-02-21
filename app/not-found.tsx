import Link from "next/link"

import NotFoundIcon from "@/assets/notFound.svg"

export default function NotFound() {
    return (
        <div className="w-full flex flex-col justify-center items-center py-10">
            <Link 
                href='/'
                className="text-lg text-black font-black tracking-widest hover:underline"
            >
                SWAPZ
            </Link>
            <NotFoundIcon />
            <h1 className="text-sm text-gray-500">404 Not Found</h1>
            <span className="text-sm text-gray-500">
                Return to <Link href='/' className="text-lg font-bold text-black hover:underline">Home</Link>
            </span>
        </div>
    )
}