'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Alert from '@/components/ui/Alert'
import Spinner from '@/components/ui/Spinner'
import { formatPrice } from '@/lib/utils'

export default function PaymentPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale || 'en'

  const [checkoutData, setCheckoutData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'CASH_ON_DELIVERY'>('CARD')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const data = sessionStorage.getItem('checkoutData')
    if (!data) {
      router.push(`/${locale}/checkout`)
      return
    }
    setCheckoutData(JSON.parse(data))
  }, [locale, router])

  const handlePlaceOrder = async () => {
    if (!checkoutData) return

    setIsProcessing(true)
    setError('')

    try {
      let stripePaymentIntentId

      if (paymentMethod === 'CARD') {
        // Create payment intent
        const paymentIntentResponse = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: Math.round(checkoutData.totals.total * 100), // Convert to cents
            currency: 'usd',
          }),
        })

        if (!paymentIntentResponse.ok) {
          throw new Error('Failed to create payment intent')
        }

        const { clientSecret, paymentIntentId } = await paymentIntentResponse.json()
        stripePaymentIntentId = paymentIntentId

        // In a real implementation, you would use Stripe Elements here
        // For now, we'll simulate successful payment
        // await stripe.confirmCardPayment(clientSecret, { payment_method: ... })
      }

      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: checkoutData.customerName,
          customerEmail: checkoutData.customerEmail,
          customerPhone: checkoutData.customerPhone,
          shippingAddress: checkoutData.shippingAddress,
          billingAddress: checkoutData.billingAddress,
          items: checkoutData.items,
          paymentMethod,
          stripePaymentIntentId,
          currency: 'USD',
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const order = await orderResponse.json()

      // Clear checkout data
      sessionStorage.removeItem('checkoutData')

      // Redirect to confirmation page
      router.push(`/${locale}/checkout/confirmation?orderNumber=${order.orderNumber}`)
    } catch (error: any) {
      setError(error.message || 'Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!checkoutData) {
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
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
            Payment
          </h1>

          <CheckoutSteps currentStep={2} />

          {error && <Alert type="error" message={error} className="mb-6" />}

          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <h2 className="text-2xl font-serif font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(checkoutData.totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>{formatPrice(checkoutData.totals.tax)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>{formatPrice(checkoutData.totals.shipping)}</span>
                </div>
                <div className="border-t border-primary/20 pt-3">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(checkoutData.totals.total)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method Selection */}
            <Card>
              <h2 className="text-2xl font-serif font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-primary/30 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CARD"
                    checked={paymentMethod === 'CARD'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">Credit/Debit Card</div>
                    <div className="text-sm text-gray-400">Pay securely with your card</div>
                  </div>
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </label>

                <label className="flex items-center p-4 border border-primary/30 rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="CASH_ON_DELIVERY"
                    checked={paymentMethod === 'CASH_ON_DELIVERY'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-sm text-gray-400">Pay when you receive your order</div>
                  </div>
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </label>
              </div>

              {paymentMethod === 'CARD' && (
                <div className="mt-4 p-4 bg-background rounded-lg">
                  <p className="text-sm text-gray-400 mb-3">
                    Note: Stripe payment integration is configured but requires client-side Stripe Elements for production use.
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 bg-background-secondary rounded border border-primary/30 text-center text-gray-400">
                      Card payment form would appear here with Stripe Elements
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Shipping Information */}
            <Card>
              <h2 className="text-2xl font-serif font-bold mb-4">Shipping Address</h2>
              <div className="text-gray-300">
                <p className="font-semibold">{checkoutData.shippingAddress.fullName}</p>
                <p>{checkoutData.shippingAddress.addressLine1}</p>
                {checkoutData.shippingAddress.addressLine2 && (
                  <p>{checkoutData.shippingAddress.addressLine2}</p>
                )}
                <p>
                  {checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.state} {checkoutData.shippingAddress.postalCode}
                </p>
                <p>{checkoutData.shippingAddress.country}</p>
                <p className="mt-2">{checkoutData.shippingAddress.phone}</p>
              </div>
            </Card>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              className="w-full"
              size="lg"
              isLoading={isProcessing}
            >
              {paymentMethod === 'CARD' ? 'Pay Now' : 'Place Order'}
            </Button>

            <p className="text-center text-sm text-gray-400">
              By placing your order, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  )
}
