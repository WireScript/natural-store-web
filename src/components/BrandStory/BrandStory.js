import Image from "next/image";
import styles from "./BrandStory.module.css";

export default function BrandStory() {
  return (
    <section className={`${styles.BrandStorySection} container mx-auto`}>
      <div className={styles.BrandStoryGrid}>
        <div className={styles.BrandStoryImageContainer}>
          <Image
            src="/images/home/showcase.jpg"
            alt="Our brand story"
            fill
            className={styles.BrandStoryImage}
          />
        </div>
        <div className={styles.BrandStoryContent}>
          <h2 className={styles.BrandStoryTitle}>OUR STORY</h2>
          <p className={styles.BrandStoryTagline}>
            Rooted in Nature, Committed to Purity – Our Journey to a Healthier World.
          </p>
          <p className={styles.BrandStoryText}>
            Founded in 2025, NaturalStore emerged from a simple belief: everyone deserves access to high-quality, organic products that promote health and sustainability. Our journey began with a small selection of carefully curated items and has grown into a comprehensive collection of premium organic products.
          </p>
          <p className={styles.BrandStoryText}>
            We partner with local farmers and producers who share our commitment to organic farming practices and environmental stewardship. Every product in our store is carefully selected to meet our strict quality standards.
          </p>
          <button className={styles.BrandStoryButton}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
} 