import NoProductsImage from "@/assets/noProducts.svg"

export const NoProducts = () => {
   return (
        <div className="flex flex-col justify-center items-center py-5">
            <NoProductsImage />
            <h1 className="text-gray-500 text-xl font-meduim text-center">No products are available at the moment.</h1>
        </div>
    )
}