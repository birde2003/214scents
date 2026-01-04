import { PrismaClient, Gender, Concentration, UserRole } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await hash('Admin@214', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@214scents.com' },
    update: {},
    create: {
      email: 'admin@214scents.com',
      name: 'Admin User',
      password: adminPassword,
      role: UserRole.ADMIN,
    },
  })
  console.log('✅ Admin user created')

  // Create sample customers
  const customerPassword = await hash('Customer123!', 12)
  const customer1 = await prisma.user.upsert({
    where: { email: 'customer1@example.com' },
    update: {},
    create: {
      email: 'customer1@example.com',
      name: 'John Doe',
      password: customerPassword,
      role: UserRole.CUSTOMER,
    },
  })
  console.log('✅ Sample customers created')

  // Create categories
  const mensCategory = await prisma.category.upsert({
    where: { slug: 'mens-perfumes' },
    update: {},
    create: {
      name: "Men's Perfumes",
      slug: 'mens-perfumes',
      description: 'Premium fragrances for men',
      displayOrder: 1,
    },
  })

  const womensCategory = await prisma.category.upsert({
    where: { slug: 'womens-perfumes' },
    update: {},
    create: {
      name: "Women's Perfumes",
      slug: 'womens-perfumes',
      description: 'Elegant fragrances for women',
      displayOrder: 2,
    },
  })

  const unisexCategory = await prisma.category.upsert({
    where: { slug: 'unisex' },
    update: {},
    create: {
      name: 'Unisex',
      slug: 'unisex',
      description: 'Fragrances for everyone',
      displayOrder: 3,
    },
  })

  const giftSetsCategory = await prisma.category.upsert({
    where: { slug: 'gift-sets' },
    update: {},
    create: {
      name: 'Gift Sets',
      slug: 'gift-sets',
      description: 'Perfect gift combinations',
      displayOrder: 4,
    },
  })
  console.log('✅ Categories created')

  // Create collections
  const bestSellers = await prisma.collection.upsert({
    where: { slug: 'best-sellers' },
    update: {},
    create: {
      name: 'Best Sellers',
      slug: 'best-sellers',
      description: 'Our most popular fragrances',
      isFeatured: true,
      displayOrder: 1,
    },
  })

  const newArrivals = await prisma.collection.upsert({
    where: { slug: 'new-arrivals' },
    update: {},
    create: {
      name: 'New Arrivals',
      slug: 'new-arrivals',
      description: 'Latest additions to our collection',
      isFeatured: true,
      displayOrder: 2,
    },
  })

  const luxuryLine = await prisma.collection.upsert({
    where: { slug: 'luxury-line' },
    update: {},
    create: {
      name: 'Luxury Line',
      slug: 'luxury-line',
      description: 'Our premium collection',
      isFeatured: false,
      displayOrder: 3,
    },
  })
  console.log('✅ Collections created')

  // Create products with realistic perfume data
  const products = [
    {
      name: 'Midnight Oud',
      slug: 'midnight-oud',
      description: 'A captivating blend of rare oud wood and exotic spices. This sophisticated fragrance opens with bergamot and saffron, developing into a heart of rose and oud, settling into a warm base of amber and patchouli.',
      gender: Gender.MEN,
      concentration: Concentration.EDP,
      topNotes: ['Bergamot', 'Saffron', 'Pink Pepper'],
      middleNotes: ['Rose', 'Oud Wood', 'Jasmine'],
      baseNotes: ['Amber', 'Patchouli', 'Leather'],
      basePrice: 189.99,
      discountPrice: 159.99,
      images: [
        'https://images.unsplash.com/photo-1595425970945-87168a52e6c3?w=800',
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1595425970945-87168a52e6c3?w=800',
      categoryId: mensCategory.id,
      isFeatured: true,
      collections: {
        connect: [{ id: bestSellers.id }, { id: luxuryLine.id }],
      },
    },
    {
      name: 'Rose Imperiale',
      slug: 'rose-imperiale',
      description: 'An elegant rose fragrance with modern sophistication. Bulgarian rose petals meet fresh citrus notes, creating a timeless yet contemporary scent perfect for the modern woman.',
      gender: Gender.WOMEN,
      concentration: Concentration.EDP,
      topNotes: ['Mandarin', 'Blackcurrant', 'Lemon'],
      middleNotes: ['Bulgarian Rose', 'Peony', 'Lily'],
      baseNotes: ['Musk', 'Cedarwood', 'Vanilla'],
      basePrice: 169.99,
      discountPrice: 139.99,
      images: [
        'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800',
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800',
      categoryId: womensCategory.id,
      isFeatured: true,
      collections: {
        connect: [{ id: bestSellers.id }],
      },
    },
    {
      name: 'Desert Storm',
      slug: 'desert-storm',
      description: 'Inspired by the Arabian desert, this powerful fragrance combines warm spices with rich woods. Perfect for the adventurous spirit.',
      gender: Gender.MEN,
      concentration: Concentration.PARFUM,
      topNotes: ['Cardamom', 'Nutmeg', 'Cinnamon'],
      middleNotes: ['Sandalwood', 'Cedarwood', 'Vetiver'],
      baseNotes: ['Amber', 'Musk', 'Tonka Bean'],
      basePrice: 219.99,
      images: [
        'https://images.unsplash.com/photo-1588405748880-12d1d2a495f0?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a495f0?w=800',
      categoryId: mensCategory.id,
      isFeatured: true,
      collections: {
        connect: [{ id: luxuryLine.id }],
      },
    },
    {
      name: 'Citrus Breeze',
      slug: 'citrus-breeze',
      description: 'A fresh and invigorating fragrance perfect for everyday wear. Light citrus notes combined with subtle woody undertones.',
      gender: Gender.UNISEX,
      concentration: Concentration.EDT,
      topNotes: ['Lemon', 'Grapefruit', 'Bergamot'],
      middleNotes: ['Green Tea', 'Lavender', 'Geranium'],
      baseNotes: ['Cedarwood', 'White Musk', 'Amber'],
      basePrice: 89.99,
      images: [
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
      categoryId: unisexCategory.id,
      collections: {
        connect: [{ id: newArrivals.id }],
      },
    },
    {
      name: 'Velvet Jasmine',
      slug: 'velvet-jasmine',
      description: 'A sensual jasmine fragrance with creamy undertones. This luxurious scent evolves beautifully throughout the day.',
      gender: Gender.WOMEN,
      concentration: Concentration.EDP,
      topNotes: ['Italian Bergamot', 'Mandarin', 'Green Leaves'],
      middleNotes: ['Jasmine Sambac', 'Tuberose', 'Orange Blossom'],
      baseNotes: ['Sandalwood', 'Vanilla', 'Musk'],
      basePrice: 179.99,
      discountPrice: 149.99,
      images: [
        'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800',
      categoryId: womensCategory.id,
      isFeatured: true,
      collections: {
        connect: [{ id: bestSellers.id }, { id: luxuryLine.id }],
      },
    },
    {
      name: 'Ocean Mist',
      slug: 'ocean-mist',
      description: 'An aquatic fragrance that captures the essence of the sea. Fresh, clean, and invigorating.',
      gender: Gender.MEN,
      concentration: Concentration.EDT,
      topNotes: ['Sea Salt', 'Mint', 'Lemon'],
      middleNotes: ['Marine Notes', 'Sage', 'Rosemary'],
      baseNotes: ['Driftwood', 'Musk', 'Amber'],
      basePrice: 119.99,
      images: [
        'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800',
      categoryId: mensCategory.id,
      collections: {
        connect: [{ id: newArrivals.id }],
      },
    },
    {
      name: 'Amber Nights',
      slug: 'amber-nights',
      description: 'A warm oriental fragrance with rich amber and vanilla. Perfect for evening wear.',
      gender: Gender.UNISEX,
      concentration: Concentration.EDP,
      topNotes: ['Bergamot', 'Cinnamon', 'Orange'],
      middleNotes: ['Amber', 'Rose', 'Jasmine'],
      baseNotes: ['Vanilla', 'Patchouli', 'Benzoin'],
      basePrice: 149.99,
      images: [
        'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800',
      categoryId: unisexCategory.id,
      isFeatured: true,
      collections: {
        connect: [{ id: bestSellers.id }],
      },
    },
    {
      name: 'Leather & Tobacco',
      slug: 'leather-tobacco',
      description: 'A sophisticated blend of leather and tobacco leaves. Bold and masculine.',
      gender: Gender.MEN,
      concentration: Concentration.EDP,
      topNotes: ['Spicy Notes', 'Coriander', 'Ginger'],
      middleNotes: ['Tobacco Leaf', 'Leather', 'Whiskey'],
      baseNotes: ['Sandalwood', 'Tonka Bean', 'Patchouli'],
      basePrice: 199.99,
      images: [
        'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800',
      categoryId: mensCategory.id,
      collections: {
        connect: [{ id: luxuryLine.id }],
      },
    },
    {
      name: 'Cherry Blossom',
      slug: 'cherry-blossom',
      description: 'A delicate floral fragrance capturing the beauty of spring. Light, feminine, and romantic.',
      gender: Gender.WOMEN,
      concentration: Concentration.EDT,
      topNotes: ['Cherry Blossom', 'Pear', 'Freesia'],
      middleNotes: ['Peony', 'Rose', 'Magnolia'],
      baseNotes: ['White Musk', 'Sandalwood', 'Rice Powder'],
      basePrice: 109.99,
      images: [
        'https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1528821154947-1aa3d1b74941?w=800',
      categoryId: womensCategory.id,
      collections: {
        connect: [{ id: newArrivals.id }],
      },
    },
    {
      name: 'Noir Extreme',
      slug: 'noir-extreme',
      description: 'An intense oriental fragrance with a dark, mysterious character. For those who dare to be different.',
      gender: Gender.MEN,
      concentration: Concentration.PARFUM,
      topNotes: ['Mandarin', 'Neroli', 'Saffron'],
      middleNotes: ['Rose', 'Nutmeg', 'Orange Blossom'],
      baseNotes: ['Amber', 'Vanilla', 'Patchouli'],
      basePrice: 229.99,
      images: [
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      ],
      featuredImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      categoryId: mensCategory.id,
      isFeatured: true,
      collections: {
        connect: [{ id: luxuryLine.id }, { id: bestSellers.id }],
      },
    },
  ]

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {},
      create: productData,
    })

    // Create variants for each product
    await prisma.productVariant.createMany({
      data: [
        {
          productId: product.id,
          size: 30,
          stock: 50,
          sku: `${product.slug}-30ml`,
        },
        {
          productId: product.id,
          size: 50,
          stock: 100,
          sku: `${product.slug}-50ml`,
          priceAdjustment: 30,
        },
        {
          productId: product.id,
          size: 100,
          stock: 75,
          sku: `${product.slug}-100ml`,
          priceAdjustment: 60,
        },
      ],
      skipDuplicates: true,
    })
  }
  console.log('✅ Products and variants created')

  // Create sample reviews
  const allProducts = await prisma.product.findMany()
  
  for (const product of allProducts.slice(0, 5)) {
    await prisma.review.create({
      data: {
        productId: product.id,
        userId: customer1.id,
        rating: 5,
        title: 'Amazing fragrance!',
        comment: 'This perfume exceeded my expectations. The scent lasts all day and I receive compliments everywhere I go. Highly recommended!',
        status: 'APPROVED',
      },
    })
  }
  console.log('✅ Sample reviews created')

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
