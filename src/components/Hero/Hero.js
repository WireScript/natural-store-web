import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      {/* Background Image with Overlay */}
      <div className={styles.heroBackground}>
        <Image
          src="/hero-bg.jpg"
          alt="Natural and organic products background"
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.heroOverlay} />
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Pure, Natural, Organic
        </h1>
        <p className={styles.heroSubtitle}>
          Discover our curated collection of premium organic products for a healthier lifestyle
        </p>
        <button className={styles.heroButton}>
          Shop Now
        </button>
      </div>
    </section>
  );
} 