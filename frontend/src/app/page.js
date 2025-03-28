import Hero from "@/components/Home/Hero";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Benefits from "@/components/Home/Benefits";
import BrandStory from "@/components/Home/BrandStory";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Benefits />
      <BrandStory />
      <Testimonials />
    </div>
  );
}
