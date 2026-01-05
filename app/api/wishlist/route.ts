import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const addToWishlistSchema = z.object({
  productId: z.string(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                category: true,
                reviews: {
                  where: { status: 'APPROVED' },
                },
              },
            },
          },
        },
      },
    })

    return NextResponse.json(wishlist?.items || [])
  } catch (error: any) {
    console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to fetch wishlist' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const body = await request.json()
    const { productId } = addToWishlistSchema.parse(body)

    // Get or create wishlist
    let wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    })

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({
        data: { userId },
      })
    }

    // Check if item already exists
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    })

    if (existingItem) {
      return NextResponse.json(
        { message: 'Product already in wishlist' },
        { status: 400 }
      )
    }

    // Add item to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        productId,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(wishlistItem, { status: 201 })
  } catch (error: any) {
    console.error('Error adding to wishlist:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to add to wishlist' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { message: 'Product ID is required' },
        { status: 400 }
      )
    }

    const userId = (session.user as any).id

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId },
    })

    if (!wishlist) {
      return NextResponse.json({ message: 'Wishlist not found' }, { status: 404 })
    }

    await prisma.wishlistItem.delete({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
    })

    return NextResponse.json({ message: 'Item removed from wishlist' })
  } catch (error: any) {
    console.error('Error removing from wishlist:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to remove from wishlist' },
      { status: 500 }
    )
  }
}
