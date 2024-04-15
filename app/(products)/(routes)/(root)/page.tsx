import prismadb from "@/utils/prismadb"
import { DisplayHomepage } from "./components/display-homepage"
import { NoProducts } from "@/components/errors-response" 

export default async function Homepage () {
  const products = await prismadb.product.findMany({
    where: {
      sold: false
    },
    orderBy: {
      likes: {
        _count: 'desc'
      }
    },
    include: {
      images: true,
      likes: true,
      cart: true,
    },
    take: 20
  })

  return (
    <div className="flex-1 flex flex-col justify-center items-center pb-10 lg:p-4">
      {products.length > 0 && <DisplayHomepage products={products} />}
      {!products.length && <NoProducts />}
    </div>
  )
}