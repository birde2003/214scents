'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import Alert from '@/components/ui/Alert'

export default function CartPage() {
  const t = useTranslations()
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const [items, setItems] = useState<any[]>([])
  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/cart')
      return
    }
    fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')
      const data = await response.json()
      setItems(data.items || [])
      setTotals(data.totals || { subtotal: 0, tax: 0, shipping: 0, discount: 0, total: 0 })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      if (!response.ok) throw new Error('Failed to update cart')
      await fetchCart()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to remove item')
      await fetchCart()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleCheckout = () => {
    router.push('/checkout')
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
            {t('cart.yourCart')}
          </h1>

          {error && (
            <Alert type="error" message={error} className="mb-6" />
          )}

          {items.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-2xl font-bold mb-4">{t('cart.emptyCart')}</h2>
              <p className="text-gray-400 mb-8">
                Add some products to your cart and they will appear here.
              </p>
              <Link href="/products">
                <Button size="lg">{t('cart.continueShopping')}</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}

                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    {t('cart.continueShopping')}
                  </Button>
                </Link>
              </div>

              <div>
                <CartSummary
                  subtotal={totals.subtotal}
                  tax={totals.tax}
                  shipping={totals.shipping}
                  discount={totals.discount}
                  total={totals.total}
                  onCheckout={handleCheckout}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </StorefrontLayout>
  )
}
