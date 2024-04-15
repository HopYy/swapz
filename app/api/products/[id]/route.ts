import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import prismadb from "@/utils/prismadb"

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth()

    const body = await req.json()

    const { 
        title,
        description,
        price,
        images,
        category,
        condition,
        shipping,
        returnItem,
    } = body

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!params.id) {
      return new NextResponse("Product ID is required", { status: 400 })
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 })
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 })
    }

    if (!category) {
      return new NextResponse("Category id is required", { status: 400 })
    }

    if (!description) {
      return new NextResponse("Description id is required", { status: 400 })
    }

    if (!condition) {
      return new NextResponse("Condition id is required", { status: 400 })
    }

    if (!shipping) {
        return new NextResponse("Shipping id is required", { status: 400 })
    }

    await prismadb.product.update({
      where: {
        id: params.id
      },
      data: {
        title,
        description,
        price,
        category,
        condition,
        shipping,
        returnItem,
        images: {
          deleteMany: {},
        },
      },
    })

    const product = await prismadb.product.update({
      where: {
        id: params.id
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    })
  
    return NextResponse.json(product)
  } catch (error) {
    console.error('[PRODUCT_PATCH]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
