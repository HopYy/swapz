import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

import prismadb from '@/utils/prismadb';

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    if (!params.orderId) {
      return new NextResponse('ID is required', { status: 400 });
    }

    const orderItem = await prismadb.orderItem.delete({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(orderItem);
  } catch (error) {
    console.error('DELETE_ORDER_PRODUCT', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
