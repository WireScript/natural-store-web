'use client'
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`${styles.heroSection} container mx-auto`}>
      {/* Left Side Content */}

      <div className={styles.heroDetails}>
        <div className={styles.heroMainDetails}>
          <div className={styles.leftContent}>
            {/* Product Image Container */}
            <div className={styles.productImageContainer}>
              <Image 
                src="/images/products-hero.jpg" 
                alt="Natural organic products collection" 
                className={styles.productImage}
                width={500}
                height={500}
              />
            </div>
            
            <p className={styles.tagline}>
              SUSTAINABLE<br />
              NATURAL PRODUCTS<br />
              FOR A BETTER WORLD
            </p>
            
          </div>
          {/* Hero Content */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              PURE<br />
              ORGANIC<br />
              ESSENTIALS
            </h1>
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>NATURAL<br />INGREDIENTS</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>ECO</span>
                <span className={styles.statLabel}>FRIENDLY<br />PACKAGING</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>+50</span>
                <span className={styles.statLabel}>ORGANIC<br />PRODUCTS</span>
              </div>
            </div>
            
            <a href="#" className={styles.ctaButton}>
              SHOP NOW <span className={styles.arrow}>→</span>
            </a>
          </div>
        </div>
      
        {/* Products Section */}
        <div className={styles.servicesSection}>
          <h2 className={styles.servicesTitle}>EXPLORE OUR<br />COLLECTIONS</h2>
          <div className={styles.servicesList}>
            <div className={styles.serviceItem}>
              <h3 className={styles.serviceTitle}>SKIN CARE<br/>ESSENTIALS</h3>
              <p className={styles.serviceDescription}>NATURAL INGREDIENTS FOR<br/>HEALTHIER, GLOWING SKIN</p>
              <a href="#" className={styles.serviceLink}>→</a>
            </div>
            <div className={styles.serviceItem}>
              <h3 className={styles.serviceTitle}>HERBAL<br/>REMEDIES</h3>
              <p className={styles.serviceDescription}>ANCIENT WISDOM MEETS<br/>MODERN WELLNESS</p>
              <a href="#" className={styles.serviceLink}>→</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}