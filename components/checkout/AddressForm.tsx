'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(10, 'Phone number is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
})

export type AddressFormData = z.infer<typeof addressSchema>

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void
  defaultValues?: Partial<AddressFormData>
  isSubmitting?: boolean
}

export default function AddressForm({ onSubmit, defaultValues, isSubmitting }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        {...register('fullName')}
        error={errors.fullName?.message}
      />

      <Input
        label="Phone"
        type="tel"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Input
        label="Address Line 1"
        {...register('addressLine1')}
        error={errors.addressLine1?.message}
      />

      <Input
        label="Address Line 2 (Optional)"
        {...register('addressLine2')}
        error={errors.addressLine2?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          {...register('city')}
          error={errors.city?.message}
        />

        <Input
          label="State/Province"
          {...register('state')}
          error={errors.state?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Country"
          {...register('country')}
          error={errors.country?.message}
        />

        <Input
          label="Postal Code"
          {...register('postalCode')}
          error={errors.postalCode?.message}
        />
      </div>

      <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
        Continue to Payment
      </Button>
    </form>
  )
}
