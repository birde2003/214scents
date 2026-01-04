import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export async function createPaymentIntent(amount: number, currency: string = 'usd') {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe expects amount in cents
    currency: currency.toLowerCase(),
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return paymentIntent
}
