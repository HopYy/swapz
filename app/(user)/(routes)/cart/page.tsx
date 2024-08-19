import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import prismadb from '@/utils/prismadb';
import { Separator } from '@/components/ui/separator';
import { CheckoutContainer } from './components/checkout';
import { CartProducts } from './components/cart-products';

export default async function userCart() {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const cart = await prismadb.cart.findMany({
    where: {
      userId,
      product: {
        sold: false,
      },
    },
    include: {
      product: {
        include: {
          images: true,
        },
      },
    },
  });

  return (
    <div className="flex-1 max-w-full lg:px-4">
      <div className="flex gap-4 p-4 max-lg:justify-center">
        <h1 className="text-2xl font-black">Cart</h1>
        {cart.length > 0 && (
          <h1 className="text-2xl font-black">{`(${cart.length})`}</h1>
        )}
      </div>
      <div className="flex flex-col gap-10 pb-10 lg:flex-row lg:items-start">
        <CartProducts cart={cart} />
        <Separator orientation="horizontal" className="mx-auto lg:hidden" />
        <CheckoutContainer cart={cart} />
      </div>
    </div>
  );
}
