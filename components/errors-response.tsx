import Link from "next/link"

import SomehingWentWrongSvg from "@/assets/somethingWentWrong.svg"
import NoProductsSvg from "@/assets/noProducts.svg"
import NotFoundSvg from "@/assets/notFound.svg"
import NoOrdersSvg from "@/assets/noOrders.svg"
import { Button } from "@/components/ui/button-component"

export const NotFoundResponse = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center py-10">
            <Link 
                href='/'
                className="text-lg text-black font-black tracking-widest hover:underline"
            >
                SWAPZ
            </Link>
            <NotFoundSvg />
            <h1 className="text-sm text-gray-500">404 Not Found</h1>
            <span className="text-sm text-gray-500">
                Return to <Link href='/' className="text-lg font-bold text-black hover:underline">Home</Link>
            </span>
        </div>
    )
}

export const NoProducts = () => {
   return (
        <div className="flex flex-col justify-center items-center py-5">
            <NoProductsSvg />
            <h1 className="text-gray-500 text-md font-meduim text-center">No products found</h1>
        </div>
    )
}

export const NoOrders = () => {
    return (
         <div className="flex flex-col justify-center items-center py-5">
             <NoOrdersSvg />
             <h1 className="text-gray-500 text-md font-meduim text-center">No orders found</h1>
         </div>
     )
 }

export const NoProductsCart = () => {
    return (
        <div className="flex flex-col justify-center items-center py-5">
            <NoProductsSvg />
            <h1 className="text-black text-md font-meduim text-center">Your shopping cart is empty!</h1>
            <Link href="/" className="text-sm text-gray-400 font-medium text-center hover:underline">Add products</Link>
        </div>
    )
}

export const SomethingWentWrong = ({ reset } : { reset: () => void }) => {
    return (
        <div className="w-full max-w-[1280px] py-12 flex flex-col justify-center items-center space-y-2 mx-auto">
            <SomehingWentWrongSvg />
            <h1 className="text-gray-500 text-md font-meduim text-center ">Ups... something went wrong</h1>
            <Button onClick={() => { reset() }}>
                <span className="text-white text-sm font-semibold tracking-wide">Try again</span>
            </Button>
        </div>
    )
}