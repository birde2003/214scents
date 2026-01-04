import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils'

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const product = await prisma.product.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      category: true,
      variants: {
        orderBy: {
          size: 'asc',
        },
      },
      reviews: {
        where: {
          status: 'APPROVED',
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!product || !product.isActive) {
    notFound()
  }

  const calculateAverageRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc: number, review: any) => acc + review.rating, 0)
    return Math.round((sum / reviews.length) * 10) / 10
  }

  const avgRating = calculateAverageRating(product.reviews)
  const displayPrice = product.discountPrice || product.basePrice

  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-background-secondary">
                <img
                  src={product.featuredImage || product.images[0] || '/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(0, 4).map((image: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden bg-background-secondary cursor-pointer hover:opacity-75 transition"
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">{product.category.name}</p>
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                {avgRating > 0 && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
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
                    <span className="text-gray-400">
                      {avgRating} ({product.reviews.length} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(displayPrice)}
                  </span>
                  {product.discountPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.basePrice)}
                    </span>
                  )}
                </div>

                <p className="text-gray-300 leading-relaxed">{product.description}</p>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="font-semibold mb-3">Select Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      className={`py-3 px-4 rounded-lg border-2 transition-all ${
                        variant.stock > 0
                          ? 'border-primary/30 hover:border-primary hover:bg-primary/10'
                          : 'border-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                      disabled={variant.stock === 0}
                    >
                      <div className="font-semibold">{variant.size}ml</div>
                      {variant.stock === 0 && (
                        <div className="text-xs text-gray-500">Out of Stock</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-primary hover:bg-primary-600 text-background py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105">
                  Add to Cart
                </button>
                <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-background py-4 rounded-lg font-semibold transition-all">
                  Add to Wishlist
                </button>
              </div>

              {/* Details */}
              <div className="border-t border-primary/20 pt-6 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Concentration</h4>
                  <p className="text-gray-400">{product.concentration}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Gender</h4>
                  <p className="text-gray-400">{product.gender}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Scent Notes</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-primary">Top: </span>
                      <span className="text-gray-400">{product.topNotes.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary">Middle: </span>
                      <span className="text-gray-400">{product.middleNotes.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary">Base: </span>
                      <span className="text-gray-400">{product.baseNotes.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews.length > 0 && (
            <div className="mt-20">
              <h2 className="font-serif text-3xl font-bold mb-8">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="bg-background-secondary p-6 rounded-2xl"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{review.user.name || 'Anonymous'}</p>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-primary fill-primary'
                                  : 'text-gray-600'
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
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {review.title && (
                      <h4 className="font-semibold mb-2">{review.title}</h4>
                    )}
                    <p className="text-gray-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </StorefrontLayout>
  )
}
