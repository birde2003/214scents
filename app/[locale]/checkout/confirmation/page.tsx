'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import Link from 'next/link'
import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Spinner from '@/components/ui/Spinner'
import { formatPrice } from '@/lib/utils'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const params = useParams()
  const locale = params?.locale || 'en'
  const orderNumber = searchParams.get('orderNumber')

  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (orderNumber) {
      fetchOrder(orderNumber)
    }
  }, [orderNumber])

  const fetchOrder = async (orderNum: string) => {
    try {
      const response = await fetch(`/api/orders?orderNumber=${orderNum}`)
      if (response.ok) {
        const orders = await response.json()
        if (orders.length > 0) {
          setOrder(orders[0])
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
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
          <CheckoutSteps currentStep={3} />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/20 rounded-full mb-4">
              <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-300">
              Thank you for your order. We&apos;ve sent a confirmation email to{' '}
              {order?.customerEmail || 'your email address'}.
            </p>
          </div>

          {order && (
            <div className="space-y-6">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-1">Order Details</h2>
                    <p className="text-gray-400">Order Number: {order.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Order Date</div>
                    <div className="font-semibold">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-3">Items Ordered</h3>
                    <div className="space-y-3">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-background rounded-lg">
                          <div>
                            <p className="font-semibold">{item.productName}</p>
                            <p className="text-sm text-gray-400">
                              Size: {item.variantSize}ml × {item.quantity}
                            </p>
                          </div>
                          <div className="font-semibold">{formatPrice(item.price * item.quantity)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Totals */}
                  <div className="border-t border-primary/20 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-300">
                        <span>Subtotal</span>
                        <span>{formatPrice(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Tax</span>
                        <span>{formatPrice(order.tax)}</span>
                      </div>
                      <div className="flex justify-between text-gray-300">
                        <span>Shipping</span>
                        <span>{formatPrice(order.shippingCost)}</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-2 border-t border-primary/20">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Shipping Information */}
              <Card>
                <h3 className="text-xl font-serif font-bold mb-3">Shipping Address</h3>
                <div className="text-gray-300">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </Card>

              {/* Delivery Estimate */}
              <Card className="bg-primary/10 border-primary/30">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-primary flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold mb-1">Estimated Delivery</p>
                    <p className="text-gray-300">
                      Your order will be delivered within 5-7 business days. You&apos;ll receive a tracking number once your order ships.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <Link href={`/${locale}/account/orders/${order.orderNumber}`}>
                  <Button variant="outline" size="lg">
                    View Order Details
                  </Button>
                </Link>
                <Link href={`/${locale}/products`}>
                  <Button size="lg">Continue Shopping</Button>
                </Link>
              </div>
            </div>
          )}

          {!order && (
            <Card>
              <div className="text-center py-8">
                <p className="text-gray-400">Order not found. Please check your email for order confirmation.</p>
                <Link href={`/${locale}`} className="mt-4 inline-block">
                  <Button>Return to Home</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </StorefrontLayout>
  )
}
