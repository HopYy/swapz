import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismadb from "@/utils/prismadb"

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth()

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if(!params.id) {
            return new NextResponse("Product is required", { status: 400 })
        }

        const isLiked = await prismadb.like.findFirst({
            where: {
                userId,
                productId: params.id
            }
        })

        if(!isLiked) {
            const like = await prismadb.like.create({
                data: {
                    userId,
                    productId: params.id
                }
            })

            return NextResponse.json(like)
        } 
    } catch (error) {
        console.error("POST_LIKE_PRODUCT", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = auth()

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        if(!params.id) {
            return new NextResponse("ID is required", { status: 400 })
        }

        const likedProduct = await prismadb.like.findUnique({
            where: {
                id: params.id,
                userId,
            }
        })

        if (!likedProduct) {
            return new NextResponse("Liked product was not found", { status: 404 })
        }

        const dislike = await prismadb.like.delete({
            where: {
                id: likedProduct.id,
                userId
            }
        })
    
        return NextResponse.json(dislike)
    } catch (error) {
        console.error("DISLIKE_PRODUCT", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}