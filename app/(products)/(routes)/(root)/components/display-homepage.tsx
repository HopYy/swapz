import Image from 'next/image';

import { Product } from '@/utils/types';
import { ProductCard } from '@/components/products/components/product-card';
import Banner from '@/assets/banner.png';

interface DisplayHomepageProps {
  products: Product[];
}

export const DisplayHomepage: React.FC<DisplayHomepageProps> = ({
  products,
}) => (
  <>
    <div className="w-full h-96 relative overflow-hidden my-10 lg:rounded-xl">
      <Image
        src={Banner}
        alt="Banner"
        fill={true}
        objectFit="cover"
        sizes="100%"
        style={{ objectPosition: 'center' }}
      />
      <div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl font-black tracking-widest">
          Discover Our Top Picks
        </h1>
      </div>
    </div>
    <div className="flex-1 max-w-full overflow-hidden my-10">
      <h1 className="text-2xl font-black ml-4 mb-5 max-lg:text-center">
        Top Liked Selection
      </h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </>
);
