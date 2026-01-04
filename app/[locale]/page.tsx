import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background-secondary to-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-300 to-primary bg-clip-text text-transparent animate-fade-in">
            {t('common.appName')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
            {t('hero.subtitle')}
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary hover:bg-primary-600 text-background px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 animate-scale-in"
          >
            {t('hero.cta')}
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          {t('products.featured')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Men', 'Women', 'Unisex'].map((category) => (
            <Link
              key={category}
              href={`/products?category=${category.toLowerCase()}`}
              className="group relative h-96 rounded-2xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10"></div>
              <img
                src={`https://images.unsplash.com/photo-${category === 'Men' ? '1595425970945-87168a' : category === 'Women' ? '1563170351-be82bc888aa4' : '1588405748880-12d1d2a495f0'}?w=800`}
                alt={category}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <h3 className="font-serif text-3xl font-bold text-white mb-2">{category}</h3>
                <p className="text-gray-300">Explore Collection</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16 text-primary">
            Why Choose 214 Scents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-400">Only the finest ingredients and masterful craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
              <p className="text-gray-400">Swift and secure shipping worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Satisfaction Guaranteed</h3>
              <p className="text-gray-400">Your happiness is our priority</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background-tertiary py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">{t('footer.tagline')}</p>
          <p className="text-gray-500">{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
