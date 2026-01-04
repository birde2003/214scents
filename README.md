# 214 Scents - Premium Perfume E-commerce Platform

A fully functional, production-ready online shopping platform for luxury perfumes with a powerful admin panel.

![214 Scents](https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&h=400&fit=crop)

## 🌟 Features

### Customer Features
- **Multi-language Support**: English and Arabic with RTL support
- **Multi-currency**: Auto-detection based on IP with manual currency switcher
- **Theme Customization**: 5 luxury themes (Default, Gold Luxe, Midnight Blue, Rose Gold, Emerald)
- **Product Browsing**: Advanced filters, sorting, and search
- **Shopping Cart**: Persistent cart with guest support
- **Wishlist**: Save favorite products
- **User Accounts**: Order history, addresses, profile management
- **Reviews & Ratings**: Product reviews with moderation
- **Secure Checkout**: Stripe payment integration (test mode)
- **Responsive Design**: Optimized for desktop, tablet, and mobile

### Admin Features
- **Dashboard**: Sales analytics, charts, and key metrics
- **Product Management**: Full CRUD with variants, images, and SEO
- **Order Management**: Status updates, tracking numbers
- **Customer Management**: View customer details and order history
- **Review Moderation**: Approve, reject, edit, or delete reviews
- **Category & Collection Management**: Organize products
- **Settings**: Configure payments, shipping, and store details

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom luxury design system
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT and bcrypt
- **Payments**: Stripe integration
- **i18n**: next-intl for multi-language support
- **API**: tRPC for type-safe APIs
- **Animations**: Framer Motion

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/birde2003/214scents.git
   cd 214scents
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your database URL and other credentials:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Random secret for NextAuth
   - `STRIPE_SECRET_KEY` & `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe keys
   - Other optional variables

4. **Set up database**
   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Push schema to database
   npm run db:seed      # Seed with sample data
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Default Credentials

### Admin Access
- **Email**: admin@214scents.com
- **Password**: Admin@214

### Customer Access  
- **Email**: customer1@example.com
- **Password**: Customer123!

## 📁 Project Structure

```
214scents/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── page.tsx       # Home page
│   │   ├── products/      # Product pages
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Checkout flow
│   │   └── account/       # User account
│   └── api/               # API routes
│       ├── auth/          # NextAuth endpoints
│       └── ...            # Other API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── storefront/       # Customer-facing components
│   └── admin/            # Admin panel components
├── lib/                  # Utility functions and configs
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth config
│   ├── stripe.ts         # Stripe config
│   └── utils.ts          # Helper functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data script
├── messages/             # Translation files
│   ├── en.json           # English translations
│   └── ar.json           # Arabic translations
└── public/               # Static assets
```

## �� Themes

The platform includes 5 pre-configured luxury themes:

1. **Default**: Dark background with gold accents
2. **Gold Luxe**: Pure gold elegance on black
3. **Midnight Blue**: Professional blue tones
4. **Rose Gold**: Sophisticated rose gold
5. **Emerald**: Rich emerald green

Themes persist across sessions and can be switched via the header.

## 🌍 Multi-language Support

- English (en) - Default
- Arabic (ar) - With full RTL support

Language switcher available in header. Add more languages by:
1. Creating new translation file in `messages/`
2. Adding locale to `middleware.ts`

## 💳 Payment Integration

Stripe is integrated in test mode. To process payments:

1. Get Stripe API keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Add keys to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```
3. Use test card: `4242 4242 4242 4242` with any future expiry

## 🗄️ Database Schema

The database includes the following models:

- **User**: Customer and admin accounts
- **Product**: Perfume products with variants
- **ProductVariant**: Size variants (30ml, 50ml, 100ml)
- **Category**: Product categories
- **Collection**: Product collections (Best Sellers, New Arrivals, etc.)
- **Order**: Customer orders
- **OrderItem**: Items in orders
- **Cart**: Shopping cart
- **CartItem**: Cart items
- **Wishlist**: User wishlist
- **WishlistItem**: Wishlist items
- **Review**: Product reviews
- **Address**: Customer addresses
- **Settings**: Application settings

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure the platform supports:
- Node.js 18+
- PostgreSQL database
- Environment variables

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection
- CSRF protection

## 🎯 SEO Features

- Dynamic meta tags
- Open Graph tags
- Semantic HTML
- Image optimization
- Sitemap generation (TODO)
- Structured data (JSON-LD) (TODO)

## 📱 Responsive Design

Fully responsive across all devices:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Credits

Created by [Your Name]

Images from [Unsplash](https://unsplash.com)

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@214scents.com

---

Built with ❤️ using Next.js and TypeScript
