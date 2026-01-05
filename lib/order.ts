import { prisma } from '@/lib/prisma'
import { generateOrderNumber } from './utils'

export interface OrderData {
  userId?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: any
  billingAddress: any
  items: {
    productId: string
    productName: string
    variantSize: number
    quantity: number
    price: number
  }[]
  paymentMethod: 'CARD' | 'CASH_ON_DELIVERY'
  stripePaymentIntentId?: string
  currency?: string
}

export async function createOrder(data: OrderData) {
  const { items, ...orderData } = data

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const shippingCost = 10 // Fixed shipping cost
  const total = subtotal + tax + shippingCost

  // Create order with items
  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      userId: orderData.userId,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      subtotal,
      tax,
      shippingCost,
      total,
      currency: orderData.currency || 'USD',
      paymentMethod: orderData.paymentMethod,
      stripePaymentIntentId: orderData.stripePaymentIntentId,
      status: orderData.paymentMethod === 'CASH_ON_DELIVERY' ? 'PENDING' : 'PAID',
      paymentStatus: orderData.paymentMethod === 'CASH_ON_DELIVERY' ? 'PENDING' : 'PAID',
      items: {
        create: items,
      },
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  return order
}

export async function getUserOrders(userId: string) {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getOrderByNumber(orderNumber: string) {
  return await prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })
}

export async function updateOrderStatus(orderId: string, status: string) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
  })
}

export async function updatePaymentStatus(orderId: string, paymentStatus: string) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: paymentStatus as any },
  })
}

export async function addTrackingNumber(orderId: string, trackingNumber: string) {
  return await prisma.order.update({
    where: { id: orderId },
    data: { trackingNumber },
  })
}
