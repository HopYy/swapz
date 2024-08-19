'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

import { Product } from '@/utils/types';
import { FilterProducts } from '@/components/filters/filter-products';
import { NoProducts } from '@/components/errors-response';
import { ProductCard } from './components/product-card';
import { Pagination } from './components/pagination';

interface ProductsProp {
  products: Product[];
  pages: number;
  title?: string;
}

export const Products: React.FC<ProductsProp> = ({
  products,
  pages,
  title,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const querySearch = searchParams.get('query');

    if (querySearch && ref.current) {
      window.scrollTo({ top: ref.current.offsetTop });
    }
  }, [searchParams]);

  return (
    <div
      ref={ref}
      className="pb-12 pt-5 min-h-screen flex flex-col justify-between"
    >
      <div className="w-full">
        <div className="sm:px-4 space-y-4">
          {title && (
            <h1 className="text-2xl font-black text-center xl:text-start overflow-ellipsis overflow-hidden">
              {title.charAt(0).toUpperCase() + title.slice(1)}
            </h1>
          )}
          <FilterProducts />
        </div>
        {products.length > 0 && (
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {!products.length && <NoProducts />}
      </div>
      <Pagination pages={pages} />
    </div>
  );
};
