import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/utils/stripe';
import prismadb from '@/utils/prismadb';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === 'checkout.session.completed') {
    await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId,
        userId: session?.metadata?.userId,
        isPaid: false,
      },
      data: {
        isPaid: true,
      },
    });

    const cart = await prismadb.cart.findMany({
      where: {
        userId: session?.metadata?.userId,
      },
      include: {
        product: true,
      },
    });

    cart.map(async ({ product }: any) => {
      await prismadb.product.update({
        where: {
          id: product.id,
        },
        data: {
          sold: true,
        },
      });
    });

    await prismadb.cart.deleteMany({
      where: {
        userId: session?.metadata?.userId,
      },
    });
  }

  return new NextResponse(null, { status: 200 });
}
