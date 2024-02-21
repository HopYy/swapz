import { Product } from "@/lib/types" 
import { FilterProducts } from "../filters/filter-products" 
import { ProductCard } from "./product-card" 
import { LoadMoreButton } from "./load-more" 
import { NoProducts } from "./no-products" 

interface ProductsProp {
    products: Array<Product>
    title: string
    total: number
    load: number
}

export const Products: React.FC<ProductsProp> = ({ 
    products, 
    title, 
    total, 
    load,
}) => {
    return (
        <div className="max-w-[1280px] mx-auto py-10">
            <h1 className="text-xl font-bold text-center lg:text-start mb-3 overflow-ellipsis overflow-hidden">{title}</h1>
            <FilterProducts />
            {products.length ? (
                <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id}
                            product={product} 
                        />
                    ))}
                </div>
            ) : (
                <NoProducts />
            )}
            {total > load && (
                <LoadMoreButton />
            )} 
        </div>
    )
}