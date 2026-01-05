import StorefrontLayout from '@/components/storefront/StorefrontLayout'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations()

  return (
    <StorefrontLayout>
      <div className="bg-gradient-to-b from-background to-background-secondary">
        {/* Hero Section */}
        <div className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-300 bg-clip-text text-transparent">
              About 214 Scents
            </h1>
            <p className="text-xl text-gray-300">
              Crafting Luxury Fragrances Since 2020
            </p>
          </div>
        </div>

        {/* Brand Story */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="space-y-12">
            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 text-primary">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2020, 214 Scents was born from a passion for exceptional fragrances and a vision to make luxury perfumes accessible to discerning individuals worldwide. Our name pays homage to the rich heritage of perfumery while embracing modern innovation.
                </p>
                <p>
                  Every scent in our collection tells a story—crafted with the finest ingredients sourced from around the globe. From the lavender fields of Provence to the oud forests of Southeast Asia, we travel the world to discover the most exquisite essences for our fragrances.
                </p>
                <p>
                  At 214 Scents, we believe that a fragrance is more than just a scent—it's an expression of identity, a memory in a bottle, and a work of art that deserves to be experienced and cherished.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 text-primary">Our Mission</h2>
              <div className="bg-background-secondary p-8 rounded-xl border border-primary/20">
                <p className="text-gray-300 leading-relaxed text-lg">
                  To create unforgettable olfactory experiences that inspire confidence, evoke emotions, and celebrate individuality. We are committed to excellence in every aspect—from ingredient selection to bottle design—ensuring that each fragrance is a masterpiece worthy of your collection.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 text-primary">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background-secondary p-6 rounded-xl border border-primary/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Quality</h3>
                  <p className="text-gray-400">
                    We never compromise on quality. Every ingredient is carefully selected and every formula is perfected.
                  </p>
                </div>

                <div className="bg-background-secondary p-6 rounded-xl border border-primary/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Craftsmanship</h3>
                  <p className="text-gray-400">
                    Our master perfumers blend art and science to create fragrances that stand the test of time.
                  </p>
                </div>

                <div className="bg-background-secondary p-6 rounded-xl border border-primary/20">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Passion</h3>
                  <p className="text-gray-400">
                    Our love for perfumery drives everything we do, ensuring exceptional experiences for our customers.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold mb-6 text-primary">The 214 Scents Experience</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  When you choose a fragrance from 214 Scents, you're not just purchasing a perfume—you're investing in a sensory journey. Each bottle is elegantly designed, reflecting the luxury and sophistication within.
                </p>
                <p>
                  Our collection spans from fresh and vibrant scents perfect for daytime wear to rich, complex compositions ideal for evening occasions. Whether you prefer floral, woody, oriental, or fresh fragrances, our diverse range ensures there's a perfect scent for every mood and moment.
                </p>
                <p>
                  We invite you to explore our collection and discover the fragrance that speaks to your soul. Let 214 Scents be your signature scent, your olfactory companion in life's most memorable moments.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-background-secondary py-16 px-4 border-t border-primary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-4 text-primary">
              Ready to Find Your Signature Scent?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Explore our curated collection of luxury fragrances
            </p>
            <a
              href="/products"
              className="inline-block bg-primary hover:bg-primary-600 text-background px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </StorefrontLayout>
  )
}
