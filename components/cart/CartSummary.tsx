'use client'

import { useTranslations } from 'next-intl'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

interface CartSummaryProps {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  onCheckout: () => void
  isLoading?: boolean
}

export default function CartSummary({
  subtotal,
  tax,
  shipping,
  discount,
  total,
  onCheckout,
  isLoading,
}: CartSummaryProps) {
  const t = useTranslations()

  return (
    <Card className="sticky top-24">
      <h2 className="text-2xl font-serif font-bold mb-6">{t('checkout.orderSummary')}</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-300">
          <span>{t('cart.subtotal')}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>{t('cart.tax')}</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between text-gray-300">
          <span>{t('cart.shipping')}</span>
          <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-400">
            <span>{t('cart.discount')}</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t border-primary/20 pt-3">
          <div className="flex justify-between text-xl font-bold">
            <span>{t('cart.total')}</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onCheckout}
        className="w-full"
        size="lg"
        isLoading={isLoading}
      >
        {t('cart.checkout')}
      </Button>

      <p className="text-sm text-gray-400 text-center mt-4">
        Taxes and shipping calculated at checkout
      </p>
    </Card>
  )
}
