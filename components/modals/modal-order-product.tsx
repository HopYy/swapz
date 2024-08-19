"use client"

import { useEffect } from "react"
import { User, ShoppingCart } from "lucide-react"
import { useClickOutside } from '@mantine/hooks';

import { OrderItem } from "@/utils/types"
import { useToggleModal } from "@/hooks/use-toggle-modal"
import { useToggleApi } from "@/hooks/use-toggle-api"
import { Button } from "@/components/ui/button-component"

interface ModalOrderItemProps {
    orderItem: OrderItem
}

export const ModalOrderItem: React.FC<ModalOrderItemProps> = ({ orderItem }) => {
    const close =  useToggleModal((state) => state.close)
    const ref = useClickOutside(() => close())
    const { loading, toggleAction } = useToggleApi()

    const deleteOrder = () => {
        toggleAction({ 
            api: `/api/order/${orderItem.id}`, 
            method: "delete", 
            message: "Order removed" 
        })
        
        if(!loading) {
            close()
        }
    }

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                close()
            }
        }
        document.addEventListener('keydown', handleEscapeKey)

        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [])


    return (
        <div className="w-screen h-screen fixed inset-0 flex justify-center items-center md:max-lg:pl-[76px]">
            <div ref={ref} className="w-full max-w-[700px] flex flex-col justify-center max-sm:h-screen bg-white rounded-2xl shadow-sm border p-4 max-sm:rounded-none">
                <h1 className="text-xl font-bold">Order details</h1>
                <h3 className="text-gray-500">{`Product ID: ${orderItem.product.id}`}</h3>
                <div className="flex flex-wrap justify-between space-y-2 p-2 m-4 max-sm:flex-col">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <User size={30} />
                        </div>
                        <div className="space-y-2">
                            <span className="text-lg font-bold">Customer</span>
                            <div className="space-x-2">
                                <span className="text-gray-500">name: </span>
                                <span className="font-semibold">{orderItem.order.firstName} {orderItem.order.lastName}</span>
                            </div>
                            <div className="space-x-2">
                                <span className="text-gray-500">phone: </span>
                                <span className="font-semibold">{orderItem.order.phone}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500">status: </span>
                                {orderItem.order.isPaid ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-md font-semibold">Paid</span>
                                        <div className="p-1 bg-green-700 rounded-full" />
                                    </div>
                                ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-md font-semibold">Canceled</span>
                                    <div className="p-1 bg-red-700 rounded-full" />
                                </div>)}
                            </div> 
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <ShoppingCart size={30} />
                        </div>
                        <div className="space-y-2">
                            <span className="text-lg font-bold">Order info</span>
                            <div className="space-x-2">
                                <span className="text-gray-500">address: </span>
                                <span className="font-semibold">{orderItem.order.address}</span>
                            </div>
                            <div className="space-x-2">
                                <span className="text-gray-500">city: </span>
                                <span className="font-semibold">{orderItem.order.city}</span>
                            </div>
                            <div className="space-x-2">
                                <span className="text-gray-500">postal code: </span>
                                <span className="font-semibold">{orderItem.order.postalCode}</span>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className="flex justify-between gap-4">
                    <Button className="bg-white text-black" disabled={loading} onClick={close}>
                        <span className="text-black text-sm font-semibold tracking-wide">Close</span>
                    </Button>
                    <Button disabled={loading} onClick={deleteOrder}>
                        <span className="text-white text-sm font-semibold tracking-wide">Delete</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}


