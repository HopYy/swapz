import prismadb from "@/utils/prismadb"
import { Products } from "@/components/products/display-products"
import { getSort, getPrice, getCategory } from "@/utils/filter"

export default async function ProductsByCategories({
  params,
  searchParams: { 
    condition, 
    sort, 
    min_price, 
    max_price, 
    query, 
    page 
  },
}: {
  params: { category: string }
  searchParams: { [key: string]: string }
}) {
  const orderBy = getSort(sort)
  const price = getPrice(min_price, max_price)
  const category = getCategory(params.category)
  const currPage = parseInt(page) > 0 ? parseInt(page) : 1
  const skip = (currPage - 1) * 20

  const products = await prismadb.product.findMany({
    where: {
      category,
      condition,
      price,
      sold: false,
      title: query && { contains: query },
    },
    include: {
      images: true,
      likes: true,
      cart: true,
    },
    orderBy,
    take: 20,
    skip
  })
  
  let title

  if (products.length > 0) {
    title = `${category} (${products.length})`
  } else {
    title = category
  }

  return (
    <div className="flex-1 max-w-full">
      <Products 
        products={products} 
        pages={Math.ceil(products.length / 20)} 
        title={title} 
      />
    </div>
  )
}
