import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/utils/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Product ID is required', { status: 400 });
    }

    const isProductInCart = await prismadb.cart.findFirst({
      where: {
        userId,
        productId: params.id,
      },
    });

    if (!isProductInCart) {
      const cart = await prismadb.cart.create({
        data: {
          userId,
          productId: params.id,
        },
      });

      return NextResponse.json(cart);
    }
  } catch (error) {
    console.error('POST_CART_PRODUCT', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    if (!params.id) {
      return new NextResponse('Cart ID is required', { status: 400 });
    }

    const isInCart = await prismadb.cart.findUnique({
      where: {
        userId,
        id: params.id,
      },
    });

    if (!isInCart) {
      return new NextResponse('Cart product was not found', { status: 404 });
    }

    const deletedCartProduct = await prismadb.cart.delete({
      where: {
        id: isInCart.id,
        userId,
      },
    });

    return NextResponse.json(deletedCartProduct);
  } catch (error) {
    console.error('DELETE_CART_PRODUCT', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
