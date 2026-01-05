import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { updateCartItemQuantity, removeFromCart } from '@/lib/cart'
import { z } from 'zod'

const updateQuantitySchema = z.object({
  quantity: z.number().min(0),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { quantity } = updateQuantitySchema.parse(body)

    const cartItem = await updateCartItemQuantity(params.itemId, quantity)

    return NextResponse.json(cartItem)
  } catch (error: any) {
    console.error('Error updating cart item:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to update cart item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    await removeFromCart(params.itemId)

    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error: any) {
    console.error('Error removing cart item:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to remove cart item' },
      { status: 500 }
    )
  }
}
