import { z } from 'zod'

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  addressLine1: z.string().min(5, 'Address is too short'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  isDefault: z.boolean().optional(),
})

export type AddressInput = z.infer<typeof addressSchema>
