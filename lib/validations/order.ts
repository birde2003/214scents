import { z } from 'zod'

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  shippingAddress: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().min(10, 'Phone number is required'),
    addressLine1: z.string().min(5, 'Address is required'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().optional(),
    country: z.string().min(2, 'Country is required'),
    postalCode: z.string().min(3, 'Postal code is required'),
  }),
  billingAddress: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().min(10, 'Phone number is required'),
    addressLine1: z.string().min(5, 'Address is required'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().optional(),
    country: z.string().min(2, 'Country is required'),
    postalCode: z.string().min(3, 'Postal code is required'),
  }),
  paymentMethod: z.enum(['CARD', 'CASH_ON_DELIVERY']),
})

export type CheckoutInput = z.infer<typeof checkoutSchema>
