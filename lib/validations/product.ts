import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  gender: z.enum(['MEN', 'WOMEN', 'UNISEX']),
  concentration: z.enum(['PARFUM', 'EDP', 'EDT', 'COLOGNE']),
  basePrice: z.number().min(0, 'Price must be positive'),
  discountPrice: z.number().optional(),
  topNotes: z.array(z.string()).min(1, 'At least one top note is required'),
  middleNotes: z.array(z.string()).min(1, 'At least one middle note is required'),
  baseNotes: z.array(z.string()).min(1, 'At least one base note is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  variants: z.array(z.object({
    size: z.number().min(1),
    stock: z.number().min(0),
    sku: z.string().min(1),
    priceAdjustment: z.number().optional(),
  })).min(1, 'At least one variant is required'),
  collectionIds: z.array(z.string()).optional(),
})

export type ProductInput = z.infer<typeof productSchema>
