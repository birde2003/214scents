'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { useState } from 'react'

interface CartItemProps {
  item: {
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
  onUpdate: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
}

export default function CartItem({ item, onUpdate, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)
  const price = item.product.discountPrice || item.product.basePrice

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    setIsUpdating(true)
    await onUpdate(item.id, newQuantity)
    setIsUpdating(false)
  }

  return (
    <div className="flex gap-4 bg-background-secondary p-4 rounded-lg border border-primary/20">
      <Link href={`/products/${item.product.slug}`} className="flex-shrink-0">
        <div className="w-24 h-24 relative rounded-lg overflow-hidden">
          <Image
            src={item.product.featuredImage || item.product.images[0] || '/placeholder-product.jpg'}
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/products/${item.product.slug}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors">
              {item.product.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-400 mt-1">Size: {item.variantSize}ml</p>
          <p className="text-primary font-bold mt-2">{formatPrice(price)}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 bg-background border border-primary/30 rounded-lg">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
              className="px-3 py-1 hover:text-primary disabled:opacity-50"
            >
              -
            </button>
            <span className="px-3 py-1 font-semibold">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={isUpdating}
              className="px-3 py-1 hover:text-primary disabled:opacity-50"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-bold text-xl">{formatPrice(price * quantity)}</p>
            <button
              onClick={() => onRemove(item.id)}
              className="text-red-400 hover:text-red-300 transition-colors"
              title="Remove item"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
