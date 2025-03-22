import styles from "./Testimonials.module.css";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className={`${styles.TestimonialsSection} container mx-auto px-4`}>
      <div className={styles.TestimonialsContainer}>
        <h2 className={styles.TestimonialsTitle}>TESTIMONIALS</h2>
        <p className={styles.TestimonialsTagline}>
          What Our Customers Say About Us
        </p>
        <div className={styles.TestimonialsGrid}>
          {/* Testimonial 1 */}
          <div className={styles.TestimonialCard}>
            <div className={styles.TestimonialHeader}>
              <div className={styles.TestimonialAvatar}>S</div>
              <div className={styles.TestimonialInfo}>
                <h4 className={styles.TestimonialName}>Sarah Johnson</h4>
                <p className={styles.TestimonialRole}>Verified Buyer</p>
              </div>
            </div>
            <p className={styles.TestimonialText}>
              &quot;The quality of their organic products is exceptional. I&apos;ve been a regular customer for over a year, and I&apos;m always impressed by their commitment to sustainability.&quot;
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className={styles.TestimonialCard}>
            <div className={styles.TestimonialHeader}>
              <div className={styles.TestimonialAvatar}>M</div>
              <div className={styles.TestimonialInfo}>
                <h4 className={styles.TestimonialName}>Michael Chen</h4>
                <p className={styles.TestimonialRole}>Verified Buyer</p>
              </div>
            </div>
            <p className={styles.TestimonialText}>
              &quot;NaturalStore has transformed my shopping experience. Their organic spices and teas are the best I&apos;ve ever tasted. Highly recommended!&quot;
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className={styles.TestimonialCard}>
            <div className={styles.TestimonialHeader}>
              <div className={styles.TestimonialAvatar}>E</div>
              <div className={styles.TestimonialInfo}>
                <h4 className={styles.TestimonialName}>Emma Davis</h4>
                <p className={styles.TestimonialRole}>Verified Buyer</p>
              </div>
            </div>
            <p className={styles.TestimonialText}>
              &quot;The customer service is outstanding, and their commitment to eco-friendly packaging shows they truly care about the environment.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 