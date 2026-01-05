import { prisma } from '@/lib/prisma'

export interface CartItem {
  id: string
  productId: string
  variantSize: number
  quantity: number
  product: {
    id: string
    name: string
    slug: string
    basePrice: number
    discountPrice: number | null
    featuredImage: string | null
    images: string[]
  }
}

export interface CartTotal {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
}

export async function getCartItems(userId: string): Promise<CartItem[]> {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              basePrice: true,
              discountPrice: true,
              featuredImage: true,
              images: true,
            },
          },
        },
      },
    },
  })

  return cart?.items || []
}

export function calculateCartTotals(items: CartItem[], taxRate: number = 0.1, shippingCost: number = 0): CartTotal {
  const subtotal = items.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.basePrice
    return sum + (price * item.quantity)
  }, 0)

  const tax = subtotal * taxRate
  const total = subtotal + tax + shippingCost

  return {
    subtotal,
    tax,
    shipping: shippingCost,
    discount: 0,
    total,
  }
}

export async function addToCart(userId: string, productId: string, variantSize: number, quantity: number = 1) {
  // Get or create cart
  let cart = await prisma.cart.findUnique({
    where: { userId },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    })
  }

  // Check if item already exists in cart
  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId_variantSize: {
        cartId: cart.id,
        productId,
        variantSize,
      },
    },
  })

  if (existingItem) {
    // Update quantity
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    })
  } else {
    // Create new item
    return await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        variantSize,
        quantity,
      },
    })
  }
}

export async function updateCartItemQuantity(itemId: string, quantity: number) {
  if (quantity <= 0) {
    return await prisma.cartItem.delete({
      where: { id: itemId },
    })
  }

  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  })
}

export async function removeFromCart(itemId: string) {
  return await prisma.cartItem.delete({
    where: { id: itemId },
  })
}

export async function clearCart(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  })

  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    })
  }
}
