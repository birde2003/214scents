import { z } from 'zod'

export const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredLanguage: z.enum(['en', 'ar']).optional(),
  preferredCurrency: z.string().optional(),
  theme: z.string().optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type UserProfileInput = z.infer<typeof userProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
