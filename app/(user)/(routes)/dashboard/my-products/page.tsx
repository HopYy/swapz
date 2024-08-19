import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/utils/prismadb';
import { ProductCard } from '@/components/products/components/product-card';
import { NoProducts } from '@/components/errors-response';
import { Pagination } from '@/components/products/components/pagination';

export default async function MyProducts({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const { page } = searchParams;
  const currPage = parseInt(page) > 0 ? parseInt(page) : 1;
  const skip = (currPage - 1) * 10;

  const products = await prismadb.product.findMany({
    where: {
      userId,
    },
    include: {
      images: true,
      cart: true,
      likes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
    skip,
  });

  return (
    <div className="flex-1 max-w-full min-h-full flex flex-col justify-between overflow-hidden pt-10 sm:p-10">
      <div>
        <div className="flex justify-center gap-4 m-2 pb-2 border-b xl:justify-start">
          <h1 className="text-2xl font-black">My products</h1>
          {products.length > 0 && (
            <h1 className="text-2xl font-black">{`(${products.length})`}</h1>
          )}
        </div>
        {products.length > 0 && (
          <div className="gap-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {!products.length && <NoProducts />}
      </div>
      <Pagination pages={Math.ceil(products.length / 10)} />
    </div>
  );
}
