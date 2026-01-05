import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getCartItems, addToCart, calculateCartTotals } from '@/lib/cart'
import { z } from 'zod'

const addToCartSchema = z.object({
  productId: z.string(),
  variantSize: z.number(),
  quantity: z.number().min(1).default(1),
})

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const items = await getCartItems(userId)
    const totals = calculateCartTotals(items, 0.1, 10)

    return NextResponse.json({ items, totals })
  } catch (error: any) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to fetch cart' },
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
    const { productId, variantSize, quantity } = addToCartSchema.parse(body)

    const cartItem = await addToCart(userId, productId, variantSize, quantity)

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error: any) {
    console.error('Error adding to cart:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to add to cart' },
      { status: 500 }
    )
  }
}
