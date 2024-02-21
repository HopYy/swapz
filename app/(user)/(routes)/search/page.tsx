import prismadb from "@/lib/prismadb";
import { Products } from "@/components/products/products"; 
import SearchProductsError from "@/assets/searchForProducts.svg"

export default async function SearchProducts({    
    searchParams
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    const { term, limit } = searchParams || {}

    const LOAD_PRODUCTS = parseInt(limit ?? '20');

    const products = await prismadb.product.findMany({
        where: {
            title: term ? { contains: term } : undefined,
        },
        include: {
            images: true
        },
        take: LOAD_PRODUCTS
    })

    const total = await prismadb.product.count({
        where: {
            title: term ? { contains: term } : undefined,
        }
    })

    return term ? (
        <Products 
            products={products}
            title={`search: "${term}"`}
            total={total}
            load={LOAD_PRODUCTS}
        />
    ) : (
        <div className="flex flex-col justify-center items-center py-10">
            <SearchProductsError />
            <p className="text-md text-gray-500 pt-5">Search for products ...</p>
        </div>
    )
}