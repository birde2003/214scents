import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      category: true,
      variants: {
        take: 1,
        orderBy: {
          size: 'asc',
        },
      },
      reviews: {
        where: {
          status: 'APPROVED',
        },
      },
    },
    take: 12,
  })

  const calculateAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc: number, review: any) => acc + review.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
  }

  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary">
        {/* Header */}
        <div className="py-16 px-4 max-w-7xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-primary-300 to-primary bg-clip-text text-transparent">
            Our Collection
          </h1>
          <p className="text-center text-gray-400 text-lg">
            Discover your perfect scent
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-background-secondary py-6 px-4 border-y border-primary/20">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
                <option>All Categories</option>
                <option>Men&apos;s Perfumes</option>
                <option>Women&apos;s Perfumes</option>
                <option>Unisex</option>
              </select>
              <select className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
                <option>All Concentrations</option>
                <option>Parfum</option>
                <option>EDP</option>
                <option>EDT</option>
              </select>
            </div>
            <select className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => {
              const avgRating = calculateAverageRating(product.reviews)
              const displayPrice = product.discountPrice || product.basePrice

              return (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group bg-background-secondary rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all transform hover:scale-105"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.featuredImage || product.images[0] || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.discountPrice && (
                      <div className="absolute top-4 right-4 bg-primary text-background px-3 py-1 rounded-full text-sm font-semibold">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-400 mb-1">{product.category.name}</p>
                    <h3 className="font-serif text-xl font-bold mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Rating */}
                    {avgRating > 0 && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= avgRating ? 'text-primary fill-primary' : 'text-gray-600'
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">({product.reviews.length})</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(displayPrice)}
                      </span>
                      {product.discountPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.basePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </StorefrontLayout>
  )
}
