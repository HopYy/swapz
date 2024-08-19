import prismadb from '@/utils/prismadb';
import { ProductForm } from '@/components/form/product/product-form';

export default async function EditProduct({
  params,
}: {
  params: { id: string };
}) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      images: true,
      likes: true,
      cart: true,
    },
  });

  return (
    <div className="flex-1 p-4 pb-14">
      <ProductForm data={product} />
    </div>
  );
}
