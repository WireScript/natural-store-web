import React from 'react';
import ProductSlider from '@/components/ProductSlider';
import ProductGrid from '@/components/ProductGrid';
import './shop.css';
import FeaturedSections from '@/components/FeaturedSections';

const productData = [
    {
      id: 1,
      title: 'Organic Face Cream',
      description: 'Nourishing and hydrating natural face cream',
      price: 29.99,
      image: '/images/products/product-1.jpg',
      secondaryImage: '/images/products/product-1.jpg',
      discount: 10,
      isNew: true,
      isOrganic: true,
      category: 'Skincare'
    },
    {
      id: 2,
      title: 'Herbal Tea Collection',
      description: 'Assortment of organic herbal teas',
      price: 19.99,
      image: '/images/products/product-2.jpg',
      secondaryImage: '/images/products/product-2.jpg',
      discount: 0,
      isBestSeller: true,
      isOrganic: true,
      category: 'Beverages'
    },
    {
      id: 3,
      title: 'Natural Shampoo',
      description: 'Chemical-free shampoo with essential oils',
      price: 14.99,
      image: '/images/products/product-3.jpg',
      secondaryImage: '/images/products/product-3.jpg',
      discount: 15,
      isOrganic: true,
      category: 'Personal Care'
    },
    {
      id: 4,
      title: 'Organic Honey',
      description: 'Pure and raw organic honey',
      price: 12.99,
      image: '/images/products/product-4.jpg',
      secondaryImage: '/images/products/product-4.jpg',
      discount: 0,
      isBestSeller: true,
      isOrganic: true,
      category: 'Food'
    },
    {
      id: 5,
      title: 'Essential Oil Set',
      description: 'Set of 6 pure essential oils',
      price: 34.99,
      image: '/images/products/product-5.jpg',
      secondaryImage: '/images/products/product-5.jpg',
      discount: 0,
      isNew: true,
      isOrganic: true,
      category: 'Personal Care'
    },
    {
      id: 6,
      title: 'Organic Aloe Vera Gel',
      description: '100% pure aloe vera gel for skin',
      price: 9.99,
      image: '/images/products/product-6.jpg',
      secondaryImage: '/images/products/product-6.jpg',
      discount: 0,
      isBestSeller: true,
      isOrganic: true,
      category: 'Skincare'
    },
    {
      id: 7,
      title: 'Natural Body Lotion',
      description: 'Moisturizing body lotion with shea butter',
      price: 18.99,
      image: '/images/products/product-7.jpg',
      secondaryImage: '/images/products/product-7.jpg',
      discount: 20,
      isOrganic: true,
      category: 'Personal Care'
    },
    {
      id: 8,
      title: 'Organic Green Tea',
      description: 'Premium organic green tea leaves',
      price: 15.99,
      image: '/images/products/product-8.jpg',
      secondaryImage: '/images/products/product-8.jpg',
      discount: 0,
      isBestSeller: true,
      isOrganic: true,
      category: 'Beverages'
    },
    {
      id: 9,
      title: 'Natural Lip Balm',
      description: 'Hydrating lip balm with natural oils',
      price: 6.99,
      image: '/images/products/product-9.jpg',
      secondaryImage: '/images/products/product-9.jpg',
      discount: 0,
      isNew: true,
      isOrganic: true,
      category: 'Skincare'
    },
    {
      id: 10,
      title: 'Coconut Hair Oil',
      description: 'Pure coconut oil for hair treatment',
      price: 11.99,
      image: '/images/products/product-10.jpg',
      secondaryImage: '/images/products/product-10.jpg',
      discount: 25,
      isOrganic: true,
      category: 'Hair Care'
    },
    {
      id: 11,
      title: 'Organic Protein Powder',
      description: 'Plant-based protein powder',
      price: 24.99,
      image: '/images/products/product-11.jpg',
      secondaryImage: '/images/products/product-11.jpg',
      discount: 15,
      isBestSeller: true,
      isOrganic: true,
      category: 'Supplements'
    },
    {
      id: 12,
      title: 'Aromatherapy Candle',
      description: 'Natural soy wax candle with essential oils',
      price: 16.99,
      image: '/images/products/product-12.jpg',
      secondaryImage: '/images/products/product-12.jpg',
      discount: 0,
      isNew: true,
      isOrganic: true,
      category: 'Home'
    }
  ];

const ShopPage = () => {
  return (
    <div>
        <div id="products-section">
            <ProductGrid productData={productData} />
        </div>
        {/* <FeaturedSections products={productData} /> */}
    </div>
  );
};

export default ShopPage;

