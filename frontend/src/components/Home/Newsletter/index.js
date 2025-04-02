import styles from "./Newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={styles.NewsletterSection}>
      <div className={styles.NewsletterContainer}>
        <h2 className={styles.NewsletterTitle}>Join Our Newsletter</h2>
        <p className={styles.NewsletterDescription}>
          Subscribe to receive updates, access to exclusive deals, and more.
        </p>
        <form className={styles.NewsletterForm}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.NewsletterInput}
          />
          <button
            type="submit"
            className={styles.NewsletterButton}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
} 