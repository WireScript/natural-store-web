'use client'
import Image from "next/image";
import styles from "./FeaturedProducts.module.css";

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Natural Herbal Toothpaste",
      description: "A fluoride-free, plant-based toothpaste infused with mint, activated charcoal, and neem for a refreshing clean. Keeps your teeth strong, bright, and naturally healthy without harsh chemicals.",
      price: "Rs. 150",
      image: "/images/products/toothpaste.jpg"
    },
    {
      id: 2,
      name: "Handmade Organic Soap",
      description: "Crafted with organic oils, shea butter, and herbal extracts, this handmade soap nourishes and hydrates your skin while providing a refreshing, toxin-free cleansing experience. Gentle on all skin types.",
      price: "Rs. 100",
      image: "/images/products/soap.jpg"
    },
    {
      id: 3,
      name: "Herbal Glow Face Oil",
      description: "A lightweight, plant-powered facial oil enriched with jojoba, rosehip, and aloe vera to deeply hydrate, reduce fine lines, and give your skin a natural, radiant glow. Perfect for all skin types.",
      price: "Rs. 150",
      image: "/images/products/face-oil.jpg"
    }
  ];

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
  };

  const handleExploreAll = () => {
    console.log("Explore all products clicked");
    // Here you would add navigation to products page
  };

  return (
    <section className={styles.FeaturedProductsSection}>
      <div className={styles.FeaturedProductsContainer}>
        <h2 className={styles.FeaturedProductsTitle}>
          FEATURED PRODUCTS
        </h2>
        <p className={styles.FeaturedProductsTagline}>
          Handcrafted with love, inspired by nature
        </p>
        <div className={styles.FeaturedProductsGrid}>
          {featuredProducts.map(product => (
            <div className={styles.FeaturedProductCard} key={product.id}>
              <div className={styles.FeaturedProductImageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={styles.FeaturedProductImage}
                />
              </div>
              <div className={styles.FeaturedProductContent}>
                <h3 className={styles.FeaturedProductTitle}>{product.name}</h3>
                <p className={styles.FeaturedProductDescription}>{product.description}</p>
                <span className={styles.FeaturedProductPrice}>{product.price}</span>
                <button 
                  className={styles.AddToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.exploreAllContainer}>
          <button 
            className={styles.exploreAllButton}
            onClick={handleExploreAll}
          >
            EXPLORE ALL PRODUCTS <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
} 