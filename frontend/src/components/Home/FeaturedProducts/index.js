'use client'
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./FeaturedProducts.module.css";

export default function FeaturedProducts() {
  const [addingProduct, setAddingProduct] = useState(null);
  const { addToCart } = useCart();
  
  const featuredProducts = [
    {
      id: 1,
      name: "Natural Herbal Toothpaste",
      description: "A fluoride-free, plant-based toothpaste infused with mint, activated charcoal, and neem for a refreshing clean. Keeps your teeth strong, bright, and naturally healthy without harsh chemicals.",
      price: 150,
      image: "/images/products/toothpaste.jpg"
    },
    {
      id: 2,
      name: "Handmade Organic Soap",
      description: "Crafted with organic oils, shea butter, and herbal extracts, this handmade soap nourishes and hydrates your skin while providing a refreshing, toxin-free cleansing experience. Gentle on all skin types.",
      price: 100,
      image: "/images/products/soap.jpg"
    },
    {
      id: 3,
      name: "Herbal Glow Face Oil",
      description: "A lightweight, plant-powered facial oil enriched with jojoba, rosehip, and aloe vera to deeply hydrate, reduce fine lines, and give your skin a natural, radiant glow. Perfect for all skin types.",
      price: 150,
      image: "/images/products/face-oil.jpg"
    }
  ];

  const handleAddToCart = (product) => {
    setAddingProduct(product.id);
    
    // Add product to cart
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      discount: 0,
      quantity: 1
    });
    
    // Reset adding state after a short delay
    setTimeout(() => {
      setAddingProduct(null);
    }, 1500);
  };

  const handleExploreAll = () => {
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
                <span className={styles.FeaturedProductPrice}>Rs. {product.price}</span>
                <button 
                  className={`${styles.AddToCartButton} ${addingProduct === product.id ? styles.Adding : ''}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={addingProduct === product.id}
                >
                  {addingProduct === product.id ? (
                    <span className={styles.ButtonAdding}>
                      <span className={styles.CheckIcon}>✓</span> ADDED TO CART
                    </span>
                  ) : (
                    'ADD TO CART'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.exploreAllContainer}>
          <Link href="/shop">
            <button 
              className={styles.exploreAllButton}
            >
              EXPLORE ALL PRODUCTS <span>→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
} 