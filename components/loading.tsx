import Skeleton from "react-loading-skeleton"
import { ClipLoader, BeatLoader } from "react-spinners"

import "react-loading-skeleton/dist/skeleton.css"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export const Spinner = ({ size = 35 } : { size?: number }) => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <ClipLoader size={size} />
        </div>
    )
}

export const ButtonLoader = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <BeatLoader color="#ffffff" size={10} />
        </div>
    )
}

export const CategoriesSkeleton = () => {
    return (
        <div className="flex-1 gap-y-10 py-12 flex flex-col justify-center items-center gap-2 mx-auto sm:pl-4 xl:items-start">
            <Skeleton style={{
                width: "200px",
                height: "20px",
            }} />
            <div className="w-full flex justify-between items-center max-xl:flex-col-reverse">
                <FiltersSkeleton />
                <Skeleton style={{
                    borderRadius: "20px",
                    width: "200px",
                    height: "40px",
                }} />
            </div>
            <div className="w-full gap-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
                <ProductSkeleton />
            </div>
        </div>
    );
}

function ProductSkeleton() {
    return (
        <div className={`flex flex-col justify-center items-start space-y-4`}>
            <div className="w-full h-full">
                <Skeleton style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    borderRadius: "10px",
                }} />
                <Skeleton style={{
                    width: "80%",
                    height: "20px",
                }} />
                <Skeleton style={{
                    width: "40%",
                    height: "20px",
                }} />
                <Skeleton style={{
                    width: "40%",
                    height: "20px",
                }} />
            </div>
        </div>
    )
}

function FiltersSkeleton() {
    return (
        <ScrollArea className="max-w-full py-5">
            <div className="flex gap-4 justify-center items-center">
                <Skeleton style={{
                    width: "200px",
                    height: "40px",
                }} />
                <Skeleton style={{
                    width: "200px",
                    height: "40px",
                }} />
                <Skeleton style={{
                    width: "200px",
                    height: "40px",
                }} />
                <Skeleton style={{
                    width: "200px",
                    height: "40px",
                }} />
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}