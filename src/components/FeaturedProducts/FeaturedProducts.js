import Image from "next/image";
import styles from "./FeaturedProducts.module.css";

export default function FeaturedProducts() {
  return (
    <section className={styles.FeaturedProductsSection}>
      <div className={styles.FeaturedProductsContainer}>
        <h2 className={styles.FeaturedProductsTitle}>
          Featured Products
        </h2>
        <div className={styles.FeaturedProductsGrid}>
          {/* Product Card 1 */}
          <div className={styles.FeaturedProductCard}>
            <div className={styles.FeaturedProductImageContainer}>
              <Image
                src="/product1.jpg"
                alt="Organic Product 1"
                fill
                className={styles.FeaturedProductImage}
              />
            </div>
            <div className={styles.FeaturedProductContent}>
              <h3 className={styles.FeaturedProductTitle}>Organic Honey</h3>
              <p className={styles.FeaturedProductDescription}>Pure, raw honey from local beekeepers</p>
              <span className={styles.FeaturedProductPrice}>$24.99</span>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className={styles.FeaturedProductCard}>
            <div className={styles.FeaturedProductImageContainer}>
              <Image
                src="/product2.jpg"
                alt="Organic Product 2"
                fill
                className={styles.FeaturedProductImage}
              />
            </div>
            <div className={styles.FeaturedProductContent}>
              <h3 className={styles.FeaturedProductTitle}>Organic Tea</h3>
              <p className={styles.FeaturedProductDescription}>Hand-picked organic tea leaves</p>
              <span className={styles.FeaturedProductPrice}>$19.99</span>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className={styles.FeaturedProductCard}>
            <div className={styles.FeaturedProductImageContainer}>
              <Image
                src="/product3.jpg"
                alt="Organic Product 3"
                fill
                className={styles.FeaturedProductImage}
              />
            </div>
            <div className={styles.FeaturedProductContent}>
              <h3 className={styles.FeaturedProductTitle}>Organic Spices</h3>
              <p className={styles.FeaturedProductDescription}>Premium organic spice collection</p>
              <span className={styles.FeaturedProductPrice}>$34.99</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 