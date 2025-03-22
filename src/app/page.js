import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.jpg"
              alt="Natural and organic products background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Pure, Natural, Organic
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
              Discover our curated collection of premium organic products for a healthier lifestyle
            </p>
            <button className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105 animate-fade-in-up">
              Shop Now
            </button>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2E7D32]">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product Card 1 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative h-64">
                  <Image
                    src="/product1.jpg"
                    alt="Organic Product 1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Organic Honey</h3>
                  <p className="text-gray-600 mb-4">Pure, raw honey from local beekeepers</p>
                  <span className="text-[#4CAF50] font-bold">$24.99</span>
                </div>
              </div>

              {/* Product Card 2 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative h-64">
                  <Image
                    src="/product2.jpg"
                    alt="Organic Product 2"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Organic Tea</h3>
                  <p className="text-gray-600 mb-4">Hand-picked organic tea leaves</p>
                  <span className="text-[#4CAF50] font-bold">$19.99</span>
                </div>
              </div>

              {/* Product Card 3 */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="relative h-64">
                  <Image
                    src="/product3.jpg"
                    alt="Organic Product 3"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Organic Spices</h3>
                  <p className="text-gray-600 mb-4">Premium organic spice collection</p>
                  <span className="text-[#4CAF50] font-bold">$34.99</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2E7D32]">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Healthier Choice</h3>
                <p className="text-gray-600">100% organic products for your well-being</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-gray-600">Sustainable practices for a better planet</p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">Premium organic products you can trust</p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/brand-story.jpg"
                  alt="Our brand story"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-[#2E7D32]">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2020, NaturalStore emerged from a simple belief: everyone deserves access to high-quality, organic products that promote health and sustainability. Our journey began with a small selection of carefully curated items and has grown into a comprehensive collection of premium organic products.
                </p>
                <p className="text-gray-600 mb-8">
                  We partner with local farmers and producers who share our commitment to organic farming practices and environmental stewardship. Every product in our store is carefully selected to meet our strict quality standards.
                </p>
                <button className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2E7D32]">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-gray-600 text-sm">Verified Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The quality of their organic products is exceptional. I've been a regular customer for over a year, and I'm always impressed by their commitment to sustainability."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-gray-600 text-sm">Verified Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "NaturalStore has transformed my shopping experience. Their organic spices and teas are the best I've ever tasted. Highly recommended!"
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Emma Davis</h4>
                    <p className="text-gray-600 text-sm">Verified Buyer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The customer service is outstanding, and their commitment to eco-friendly packaging shows they truly care about the environment."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-[#4CAF50] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-[#4CAF50] px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
