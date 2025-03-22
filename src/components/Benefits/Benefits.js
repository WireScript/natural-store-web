import styles from "./Benefits.module.css";

export default function Benefits() {
  return (
    <section className={styles.BenefitsSection}>
      <div className={styles.BenefitsContainer}>
        <h2 className={styles.BenefitsTitle}>WHY CHOOSE US?</h2>
        <p className={styles.BenefitsTagline}>
          Bringing you the finest, natural, and organic products for a healthier and sustainable lifestyle.
        </p>
        <div className={styles.BenefitsGrid}>
          {benefitsData.map((benefit, index) => (
            <div className={styles.BenefitCard} key={index}>
              <div className={styles.BenefitIcon}>{benefit.icon}</div>
              <h3 className={styles.BenefitTitle}>{benefit.title}</h3>
              <p className={styles.BenefitShortDescription}>{benefit.shortDescription}</p>
              <p className={styles.BenefitDescription}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const benefitsData = [
  {
    title: "Healthier Choice",
    shortDescription: "Nourish your body with the best organic products.",
    description: "Our products are sourced from certified organic farms, ensuring you get 100% natural, chemical-free, and nutrient-rich ingredients for a healthier lifestyle.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    title: "Eco-Friendly",
    shortDescription: "Protecting nature with every product you buy.",
    description: "We follow sustainable farming and packaging practices that help reduce environmental impact and support a greener planet.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: "Quality Guaranteed",
    shortDescription: "Premium organic products you can trust.",
    description: "Every product undergoes strict quality control, ensuring the highest purity, freshness, and nutritional value.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];
