import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/data/products";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  const featuredProducts = products.filter(product => product.isFeatured);
  const newArrivals = products.filter(product => product.isNew);

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-60"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Elevate Your Style
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover premium men's fashion that combines timeless elegance with modern sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button asChild variant="hero" size="lg" className="sm:size-xl">
              <Link to="/products">Shop Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white border-white hover:bg-white/20 sm:size-xl">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal mb-3 sm:mb-4">
            Featured Collection
          </h2>
          <p className="text-base sm:text-lg text-brand-warm-gray max-w-2xl mx-auto">
            Handpicked pieces that define contemporary men's fashion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Button asChild variant="accent" size="lg">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="py-12 sm:py-16 bg-brand-light-gray">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-charcoal mb-3 sm:mb-4">
                New Arrivals
              </h2>
              <p className="text-base sm:text-lg text-brand-warm-gray max-w-2xl mx-auto">
                Fresh styles just in for the season
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {newArrivals.slice(0, 2).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 sm:py-16 hero-gradient">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Join the Loveable Community
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
            Be the first to know about new collections, exclusive offers, and style tips.
          </p>
          <Button asChild variant="accent" size="lg">
            <Link to="/signup">Sign Up Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
