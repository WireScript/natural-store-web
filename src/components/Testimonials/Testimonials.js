import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={`${styles.TestimonialsSection} container mx-auto px-4`}>
      <div className={styles.TestimonialsContainer}>
        <h2 className={styles.TestimonialsTitle}>TESTIMONIALS</h2>
        <p className={styles.TestimonialsTagline}>
          What Our Customers Say About Us
        </p>
        <div className={styles.TestimonialsGrid}>
          {[
            {
              name: "Sarah Johnson",
              role: "Verified Buyer",
              text: "The quality of their organic products is exceptional. I've been a regular customer for over a year, and I'm always impressed by their commitment to sustainability.",
              initial: "S",
            },
            {
              name: "Michael Chen",
              role: "Verified Buyer",
              text: "NaturalStore has transformed my shopping experience. Their organic spices and teas are the best I’ve ever tasted. Highly recommended!",
              initial: "M",
            },
            {
              name: "Emma Davis",
              role: "Verified Buyer",
              text: "The customer service is outstanding, and their commitment to eco-friendly packaging shows they truly care about the environment.",
              initial: "E",
            },
          ].map((testimonial, index) => (
            <div key={index} className={styles.TestimonialCard}>
              <div className={styles.TestimonialHeader}>
                <div className={styles.TestimonialAvatar}>
                  {testimonial.initial}
                </div>
                <div className={styles.TestimonialInfo}>
                  <h4 className={styles.TestimonialName}>{testimonial.name}</h4>
                  <p className={styles.TestimonialRole}>{testimonial.role}</p>
                </div>
              </div>
              <p className={styles.TestimonialText}>&quot;{testimonial.text}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
