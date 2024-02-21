import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb"

export async function POST(
    req: Request,
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
        } = body

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const products = await prismadb.product.create({
            data: {
                userId,
                title,
                description,
                price,
                category,
                condition,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                },
            }
        })

        return NextResponse.json(products)
    } catch (error) {
        console.error('POST_PRODUCT', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
