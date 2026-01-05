'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import AddressForm, { AddressFormData } from '@/components/checkout/AddressForm'
import CartSummary from '@/components/cart/CartSummary'
import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import Alert from '@/components/ui/Alert'

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const params = useParams()
  const locale = params?.locale || 'en'

  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [cartData, setCartData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin?callbackUrl=/${locale}/checkout`)
      return
    }
    fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  useEffect(() => {
    if (session?.user) {
      setCustomerName((session.user as any).name || '')
      setCustomerEmail((session.user as any).email || '')
    }
  }, [session])

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart')
      if (!response.ok) throw new Error('Failed to fetch cart')
      const data = await response.json()
      
      if (!data.items || data.items.length === 0) {
        router.push(`/${locale}/cart`)
        return
      }
      
      setCartData(data)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleShippingSubmit = async (shippingData: AddressFormData) => {
    if (!customerName || !customerEmail) {
      setError('Please fill in your name and email')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const billingAddress = sameAsBilling ? shippingData : shippingData

      // Store checkout data in session storage for payment page
      const checkoutData = {
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress: shippingData,
        billingAddress,
        items: cartData.items.map((item: any) => ({
          productId: item.productId,
          productName: item.product.name,
          variantSize: item.variantSize,
          quantity: item.quantity,
          price: item.product.discountPrice || item.product.basePrice,
        })),
        totals: cartData.totals,
      }

      sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData))
      router.push(`/${locale}/checkout/payment`)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsSubmitting(false)
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
            Checkout
          </h1>

          <CheckoutSteps currentStep={1} />

          {error && <Alert type="error" message={error} className="mb-6" />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-background-secondary p-6 rounded-xl border border-primary/20">
                <h2 className="text-2xl font-serif font-bold mb-4">Customer Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-background-secondary p-6 rounded-xl border border-primary/20">
                <h2 className="text-2xl font-serif font-bold mb-4">Shipping Address</h2>
                <AddressForm
                  onSubmit={handleShippingSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>

              {/* Billing Address Option */}
              <div className="bg-background-secondary p-6 rounded-xl border border-primary/20">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    className="rounded border-primary/30 bg-background text-primary focus:ring-primary mr-2"
                  />
                  <span className="text-gray-300">Billing address same as shipping</span>
                </label>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              {cartData && (
                <CartSummary
                  subtotal={cartData.totals.subtotal}
                  tax={cartData.totals.tax}
                  shipping={cartData.totals.shipping}
                  discount={cartData.totals.discount}
                  total={cartData.totals.total}
                  onCheckout={() => {}}
                  isLoading={isSubmitting}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  )
}
