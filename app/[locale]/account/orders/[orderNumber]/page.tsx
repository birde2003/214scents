'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import { formatPrice } from '@/lib/utils'

export default function OrderDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const locale = params?.locale || 'en'
  const orderNumber = params?.orderNumber as string

  const [order, setOrder] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      router.push(`/${locale}/auth/signin?callbackUrl=/${locale}/account/orders/${orderNumber}`)
      return
    }
    fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, orderNumber])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders?orderNumber=${orderNumber}`)
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

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'warning'
      case 'paid':
      case 'processing':
        return 'info'
      case 'shipped':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'default'
    }
  }

  const handlePrint = () => {
    window.print()
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

  if (!order) {
    return (
      <StorefrontLayout>
        <div className="bg-gradient-to-b from-background to-background-secondary min-h-screen py-12">
          <div className="max-w-4xl mx-auto px-4">
            <Card>
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">Order not found</p>
                <Link href={`/${locale}/account/orders`}>
                  <Button>Back to Orders</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </StorefrontLayout>
    )
  }

  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8 print:hidden">
            <Link href={`/${locale}/account/orders`} className="text-primary hover:text-primary-400 flex items-center gap-2 mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Orders
            </Link>
            <div className="flex items-center justify-between">
              <h1 className="font-serif text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
                Order Details
              </h1>
              <Button variant="outline" onClick={handlePrint}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Order
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Order Info */}
            <Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Order Number</h3>
                  <p className="text-xl font-bold">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-sm text-gray-400 mb-1">Order Date</h3>
                  <p className="text-xl font-bold">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Order Status</h3>
                  <Badge variant={getStatusVariant(order.status)} className="text-sm">
                    {order.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Payment Status</h3>
                  <Badge variant={order.paymentStatus === 'PAID' ? 'success' : 'warning'} className="text-sm">
                    {order.paymentStatus}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Payment Method</h3>
                  <p>{order.paymentMethod === 'CARD' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
                </div>
              </div>

              {order.trackingNumber && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <h3 className="text-sm text-gray-400 mb-1">Tracking Number</h3>
                  <p className="text-lg font-semibold">{order.trackingNumber}</p>
                </div>
              )}
            </Card>

            {/* Order Items */}
            <Card>
              <h2 className="text-2xl font-serif font-bold mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-background rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.productName}</h3>
                      <p className="text-gray-400 text-sm mb-2">Size: {item.variantSize}ml</p>
                      <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg text-primary">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-sm text-gray-400">{formatPrice(item.price)} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <div className="space-y-2 max-w-md ml-auto">
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
                  <div className="flex justify-between text-2xl font-bold pt-2 border-t border-primary/20">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(order.total)}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h2 className="text-xl font-serif font-bold mb-3">Shipping Address</h2>
                <div className="text-gray-300">
                  <p className="font-semibold">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">{order.shippingAddress.phone}</p>
                </div>
              </Card>

              <Card>
                <h2 className="text-xl font-serif font-bold mb-3">Billing Address</h2>
                <div className="text-gray-300">
                  <p className="font-semibold">{order.billingAddress.fullName}</p>
                  <p>{order.billingAddress.addressLine1}</p>
                  {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                  <p className="mt-2">{order.billingAddress.phone}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  )
}
