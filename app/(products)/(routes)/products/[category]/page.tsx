import prismadb from "@/lib/prismadb";
import { Products } from "@/components/products/products"; 

export default async function ProductsByCategories({
    params,
    searchParams
}: {
    params: { category: string }
    searchParams?: { [key: string]: string | undefined };
}) {
    const category = decodeURIComponent(params.category);
    const { sort, condition, min_price, max_price, limit } = searchParams ?? {};

    const LOAD_PRODUCTS = parseInt(limit ?? '20');

    const prismaWhereFilter = {
        category,
        condition: condition ? { equals: condition } : undefined,
        price: {
            gte: min_price ? parseFloat(min_price) : undefined,
            lte: max_price ? parseFloat(max_price) : undefined,
        },
    };

    let prismaOrderByFilter = {}

    switch (sort) {
        case 'price_low':
            prismaOrderByFilter = {
                price: 'asc'
            }
          break;
        case 'price_high':
            prismaOrderByFilter = {
                price: 'desc'
            }
          break;
        case 'newly_added':
            prismaOrderByFilter = {
                createdAt: 'desc'
            }
          break;
        default:
            prismaOrderByFilter = {
                createdAt: 'asc'
            }
    }
        
    const products = await prismadb.product.findMany({
        where: prismaWhereFilter,
        include: { 
            images: true,
        },
        orderBy: prismaOrderByFilter, 
        take: LOAD_PRODUCTS
    });

    const total = await prismadb.product.count({
        where: prismaWhereFilter
    })

    return (
        <Products
            products={products}
            title={category}
            total={total}
            load={LOAD_PRODUCTS}
        />
    )
}