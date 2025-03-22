import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Benefits from "@/components/Benefits/Benefits";
import BrandStory from "@/components/BrandStory/BrandStory";
import Testimonials from "@/components/Testimonials/Testimonials";
import Newsletter from "@/components/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Hero />
        <FeaturedProducts />
        <Benefits />
        <BrandStory />
        <Testimonials />
        <Newsletter />
      </div>
      <Footer />
    </>
  );
}
