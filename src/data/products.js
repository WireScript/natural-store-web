// Sample product data for the application
export const products = [
  {
    id: 1,
    title: "Organic Matcha Green Tea Powder",
    description: "Premium culinary grade organic matcha powder.",
    fullDescription: "Our premium culinary grade organic matcha powder is sourced directly from Japanese farms. This vibrant green tea powder is rich in antioxidants, provides natural energy, and supports mental clarity without the jitters of coffee. Perfect for lattes, smoothies, baking, and traditional preparation.",
    price: 24.99,
    discount: 0,
    image: "/images/products/product-1.jpg",
    secondaryImage: "/images/products/product-2.jpg",
    additionalImages: [
      "/images/products/product-3.jpg"
    ],
    isNew: false,
    isBestSeller: true,
    isOrganic: true,
    inStock: 45,
    categories: ["Beverages", "Tea"],
    tags: ["organic", "matcha", "green tea", "antioxidants"]
  },
  {
    id: 2,
    title: "Organic Raw Honey",
    description: "Pure, unfiltered wildflower honey from local apiaries.",
    fullDescription: "Our organic raw honey is ethically sourced from local apiaries. This unfiltered wildflower honey retains all the natural enzymes, pollen, and beneficial properties that make honey a superfood. Enjoy its rich, complex flavor as a natural sweetener in your tea, smoothies, or drizzled over yogurt and toast.",
    price: 18.99,
    discount: 10,
    image: "/images/products/product-4.jpg",
    secondaryImage: "/images/products/product-5.jpg",
    isNew: false,
    isBestSeller: true,
    isOrganic: true,
    inStock: 32,
    categories: ["Food", "Sweeteners"],
    tags: ["honey", "raw", "organic", "natural sweetener"]
  },
  {
    id: 3,
    title: "Organic Coconut Oil",
    description: "Cold-pressed virgin coconut oil for cooking and skincare.",
    fullDescription: "Our cold-pressed virgin coconut oil is extracted from fresh, organic coconuts without the use of harmful chemicals or high heat. This versatile product is perfect for cooking at high temperatures, baking, or as a natural moisturizer for skin and hair. Rich in medium-chain fatty acids, it provides a quick source of energy and supports overall health.",
    price: 12.99,
    discount: 0,
    image: "/images/products/product-6.jpg",
    secondaryImage: "/images/products/product-7.jpg",
    isNew: false,
    isBestSeller: false,
    isOrganic: true,
    inStock: 78,
    categories: ["Food", "Oils", "Personal Care"],
    tags: ["coconut oil", "organic", "cooking", "skincare"]
  },
  {
    id: 4,
    title: "Organic Spirulina Powder",
    description: "Nutrient-dense blue-green algae supplement.",
    fullDescription: "Our organic spirulina powder is a nutrient-dense superfood derived from blue-green algae. Packed with protein, vitamins, minerals, and antioxidants, spirulina is one of the most nutritionally complete supplements available. Add a teaspoon to smoothies, juices, or energy balls to boost nutrition and support immune function, energy levels, and detoxification.",
    price: 19.99,
    discount: 15,
    image: "/images/products/product-8.jpg",
    secondaryImage: "/images/products/product-9.jpg",
    isNew: true,
    isBestSeller: false,
    isOrganic: true,
    inStock: 25,
    categories: ["Supplements", "Superfoods"],
    tags: ["spirulina", "algae", "protein", "detox"]
  },
  {
    id: 5,
    title: "Bamboo Toothbrush Set",
    description: "Eco-friendly biodegradable toothbrushes, pack of 4.",
    fullDescription: "Our bamboo toothbrush set offers an eco-friendly alternative to plastic toothbrushes. Made from sustainably harvested bamboo with BPA-free nylon bristles, these toothbrushes are biodegradable and compostable. The ergonomic design ensures a comfortable grip and effective cleaning. Each pack contains 4 toothbrushes in different colors, perfect for the whole family.",
    price: 14.99,
    discount: 0,
    image: "/images/products/toothpaste.jpg",
    secondaryImage: "/images/products/product-1.jpg",
    isNew: false,
    isBestSeller: false,
    isOrganic: false,
    inStock: 42,
    categories: ["Personal Care", "Home & Living"],
    tags: ["bamboo", "eco-friendly", "biodegradable", "zero waste"]
  },
  {
    id: 6,
    title: "Organic Turmeric Supplement",
    description: "High-potency turmeric capsules with black pepper extract.",
    fullDescription: "Our organic turmeric supplement combines high-potency turmeric extract with black pepper extract for maximum absorption. Each capsule delivers 1500mg of turmeric curcumin, supporting joint health, inflammation response, and antioxidant activity. Our formula is vegan, non-GMO, and free from fillers and artificial ingredients.",
    price: 29.99,
    discount: 20,
    image: "/images/products/product-2.jpg",
    secondaryImage: "/images/products/product-3.jpg",
    isNew: false,
    isBestSeller: true,
    isOrganic: true,
    inStock: 38,
    categories: ["Supplements", "Health"],
    tags: ["turmeric", "anti-inflammatory", "curcumin", "joint health"]
  },
  {
    id: 7,
    title: "Reusable Produce Bags",
    description: "Set of 8 mesh bags for plastic-free grocery shopping.",
    fullDescription: "Our reusable produce bags help eliminate single-use plastic from your shopping routine. This set includes 8 bags in various sizes, made from durable, washable mesh that allows for easy scanning at checkout and proper airflow to keep produce fresh. Lightweight yet strong, these bags can hold even heavy items like potatoes and oranges. The color-coded tags make organization simple.",
    price: 16.99,
    discount: 0,
    image: "/images/products/product-4.jpg",
    secondaryImage: "/images/products/product-5.jpg",
    isNew: true,
    isBestSeller: false,
    isOrganic: false,
    inStock: 56,
    categories: ["Home & Living", "Kitchen"],
    tags: ["zero waste", "reusable", "plastic-free", "sustainable"]
  },
  {
    id: 8,
    title: "Organic Ashwagandha Root Powder",
    description: "Adaptogenic herb for stress relief and energy balance.",
    fullDescription: "Our organic ashwagandha root powder is a traditional adaptogenic herb that helps the body manage stress and restore balance. Sourced from high-quality organic roots, this powerful supplement supports adrenal function, reduces cortisol levels, and promotes healthy energy levels. Add half a teaspoon to smoothies, tea, or coffee for a natural way to support your body's stress response.",
    price: 21.99,
    discount: 0,
    image: "/images/products/product-6.jpg",
    secondaryImage: "/images/products/product-7.jpg",
    isNew: false,
    isBestSeller: false,
    isOrganic: true,
    inStock: 29,
    categories: ["Supplements", "Herbs"],
    tags: ["ashwagandha", "adaptogen", "stress relief", "ayurvedic"]
  },
  {
    id: 9,
    title: "Natural Shea Butter Soap",
    description: "Handcrafted soap bars with essential oils, set of 3.",
    fullDescription: "Our natural shea butter soap bars are handcrafted in small batches using the cold-process method. Enriched with organic shea butter and coconut oil, these gentle cleansers maintain skin's natural moisture while providing a rich, creamy lather. This set includes three essential oil blends: Lavender & Chamomile, Eucalyptus & Mint, and Citrus Grove. Free from synthetic fragrances, colors, and preservatives.",
    price: 15.99,
    discount: 10,
    image: "/images/products/soap.jpg",
    secondaryImage: "/images/products/product-8.jpg",
    isNew: false,
    isBestSeller: true,
    isOrganic: false,
    inStock: 47,
    categories: ["Personal Care", "Bath & Body"],
    tags: ["soap", "natural", "handcrafted", "essential oils"]
  },
  {
    id: 10,
    title: "Organic Ceremonial Grade Matcha",
    description: "Premium Japanese ceremonial grade green tea powder.",
    fullDescription: "Our organic ceremonial grade matcha is the highest quality green tea powder, sourced from shade-grown tea leaves in Japan. The meticulous growing and processing methods result in a vibrant green color, smooth flavor profile with natural sweetness, and no bitterness. Traditional stone-grinding preserves nutrients and creates the silky-fine texture perfect for whisking into the traditional matcha tea ceremony.",
    price: 39.99,
    discount: 0,
    image: "/images/products/product-9.jpg",
    secondaryImage: "/images/products/product-1.jpg",
    isNew: true,
    isBestSeller: false,
    isOrganic: true,
    inStock: 15,
    categories: ["Beverages", "Tea"],
    tags: ["matcha", "ceremonial", "japanese", "green tea"]
  },
  {
    id: 11,
    title: "Organic Chia Seeds",
    description: "Nutrient-rich superfood seeds for smoothies and baking.",
    fullDescription: "Our organic chia seeds are a nutrient-dense superfood packed with omega-3 fatty acids, fiber, protein, and essential minerals. These versatile seeds can be added to smoothies, yogurt, oatmeal, or used in baking. When soaked in liquid, they form a gel that can replace eggs in vegan recipes or create delicious puddings. Our chia seeds are sustainably grown, non-GMO, and certified organic.",
    price: 11.99,
    discount: 15,
    image: "/images/products/product-2.jpg",
    secondaryImage: "/images/products/product-3.jpg",
    isNew: false,
    isBestSeller: true,
    isOrganic: true,
    inStock: 89,
    categories: ["Food", "Superfoods"],
    tags: ["chia", "seeds", "omega-3", "fiber"]
  },
  {
    id: 12,
    title: "Facial Oil",
    description: "Natural face oil for hydration and skin glow.",
    fullDescription: "Our natural face oil is a blend of organic botanical oils that deeply hydrate and nourish your skin. Rich in antioxidants and essential fatty acids, this lightweight formula absorbs quickly to restore skin's natural balance and promote a healthy glow without clogging pores. Perfect for daily use as part of your morning and evening skincare routine.",
    price: 27.99,
    discount: 0,
    image: "/images/products/face-oil.jpg",
    secondaryImage: "/images/products/product-4.jpg",
    isNew: false,
    isBestSeller: false,
    isOrganic: false,
    inStock: 65,
    categories: ["Personal Care", "Skincare"],
    tags: ["face oil", "natural", "organic", "skincare"]
  },
]; 