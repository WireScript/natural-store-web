import styles from "./Benefits.module.css";

export default function Benefits() {
  return (
    <section className={styles.BenefitsSection}>
      <div className={styles.BenefitsContainer}>
        <h2 className={styles.BenefitsTitle}>
          Why Choose Us
        </h2>
        <div className={styles.BenefitsGrid}>
          <div className={styles.BenefitCard}>
            <div className={styles.BenefitIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={styles.BenefitTitle}>Healthier Choice</h3>
            <p className={styles.BenefitDescription}>100% organic products for your well-being</p>
          </div>

          <div className={styles.BenefitCard}>
            <div className={styles.BenefitIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className={styles.BenefitTitle}>Eco-Friendly</h3>
            <p className={styles.BenefitDescription}>Sustainable practices for a better planet</p>
          </div>

          <div className={styles.BenefitCard}>
            <div className={styles.BenefitIcon}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className={styles.BenefitTitle}>Quality Guaranteed</h3>
            <p className={styles.BenefitDescription}>Premium organic products you can trust</p>
          </div>
        </div>
      </div>
    </section>
  );
} 