import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserOrders, createOrder } from '@/lib/order'
import { clearCart } from '@/lib/cart'
import { checkoutSchema } from '@/lib/validations/order'
import { sendOrderConfirmationEmail } from '@/lib/email'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const orders = await getUserOrders(userId)

    return NextResponse.json(orders)
  } catch (error: any) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()

    // Validate checkout data
    const validatedData = checkoutSchema.parse(body)

    const userId = session?.user ? (session.user as any).id : undefined

    // Create order
    const order = await createOrder({
      userId,
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      customerPhone: validatedData.customerPhone,
      shippingAddress: validatedData.shippingAddress,
      billingAddress: validatedData.billingAddress,
      items: body.items,
      paymentMethod: validatedData.paymentMethod,
      stripePaymentIntentId: body.stripePaymentIntentId,
      currency: body.currency || 'USD',
    })

    // Clear cart if user is logged in
    if (userId) {
      await clearCart(userId)
    }

    // Send confirmation email
    await sendOrderConfirmationEmail(
      validatedData.customerEmail,
      order.orderNumber,
      order.total,
      order.currency
    )

    return NextResponse.json(order, { status: 201 })
  } catch (error: any) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { message: error.message || 'Failed to create order' },
      { status: 500 }
    )
  }
}
