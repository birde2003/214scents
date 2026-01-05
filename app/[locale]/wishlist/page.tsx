'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import Image from 'next/image'
import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Alert from '@/components/ui/Alert'
import { formatPrice, calculateAverageRating } from '@/lib/utils'

export default function WishlistPage() {
  const t = useTranslations()
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const [items, setItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/wishlist')
      return
    }
    fetchWishlist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist')
      if (!response.ok) throw new Error('Failed to fetch wishlist')
      const data = await response.json()
      setItems(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/wishlist?productId=${productId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to remove from wishlist')
      await fetchWishlist()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleAddToCart = async (productId: string, variantSize: number) => {
    setAddingToCart(productId)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, variantSize, quantity: 1 }),
      })
      if (!response.ok) throw new Error('Failed to add to cart')
      // Optionally remove from wishlist after adding to cart
      await handleRemoveFromWishlist(productId)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setAddingToCart(null)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <StorefrontLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </StorefrontLayout>
    )
  }

  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
            {t('wishlist.title')}
          </h1>

          {error && (
            <Alert type="error" message={error} className="mb-6" />
          )}

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">{t('wishlist.emptyWishlist')}</h2>
              <p className="text-gray-400 mb-8">
                Save your favorite products here to view them later.
              </p>
              <Link href="/products">
                <Button size="lg">{t('cart.continueShopping')}</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => {
                const product = item.product
                const avgRating = calculateAverageRating(product.reviews || [])
                const displayPrice = product.discountPrice || product.basePrice

                return (
                  <div
                    key={item.id}
                    className="bg-background-secondary rounded-xl overflow-hidden border border-primary/20 hover:shadow-2xl hover:shadow-primary/20 transition-all"
                  >
                    <Link href={`/products/${product.slug}`} className="block relative aspect-square">
                      <Image
                        src={product.featuredImage || product.images[0] || '/placeholder-product.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.discountPrice && (
                        <div className="absolute top-4 right-4 bg-primary text-background px-3 py-1 rounded-full text-sm font-semibold">
                          SALE
                        </div>
                      )}
                    </Link>

                    <div className="p-4">
                      <p className="text-sm text-gray-400 mb-1">{product.category.name}</p>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-serif text-lg font-bold mb-2 line-clamp-1 hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {avgRating > 0 && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= avgRating ? 'text-primary fill-primary' : 'text-gray-600'
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="text-sm text-gray-400">({product.reviews.length})</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(displayPrice)}
                        </span>
                        {product.discountPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.basePrice)}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={() => handleAddToCart(product.id, 50)}
                          className="w-full"
                          size="sm"
                          isLoading={addingToCart === product.id}
                        >
                          {t('wishlist.moveToCart')}
                        </Button>
                        <Button
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          variant="outline"
                          className="w-full"
                          size="sm"
                        >
                          {t('wishlist.removeItem')}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </StorefrontLayout>
  )
}
