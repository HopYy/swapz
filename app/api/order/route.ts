import { auth } from '@clerk/nextjs';
import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/utils/stripe';
import prismadb from '@/utils/prismadb';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { firstName, lastName, address, city, phone, postalCode } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const cart = await prismadb.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    const orderData = {
      userId,
      firstName,
      lastName,
      address,
      phone,
      city,
      postalCode,
      isPaid: false,
      orderItems: {
        create: cart.map(({ product }: any) => ({
          product: {
            connect: {
              id: product.id,
            },
          },
        })),
      },
    };

    let order = await prismadb.order.findFirst({
      where: {
        userId,
        isPaid: false,
      },
    });

    if (order) {
      await prismadb.orderItem.deleteMany({
        where: {
          orderId: order.id,
        },
      });
      await prismadb.order.update({
        where: {
          id: order.id,
          userId,
          isPaid: false,
        },
        data: orderData,
      });
    } else if (!order) {
      order = await prismadb.order.create({
        data: orderData,
      });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    cart.forEach(({ product }: any) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100,
        },
      });
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: `${process.env.SWAPZ_URL}/cart/successful-payment/${order.id}`,
      cancel_url: `${process.env.SWAPZ_URL}/cart`,
      payment_method_types: ['card'],
      metadata: {
        orderId: order.id,
        userId: order.userId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('POST_ORDER', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
