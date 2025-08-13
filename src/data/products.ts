// Product data with categories, variants, and pricing
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  tagline: string;
  ingredients: string[];
  spiceLevel: 'None' | 'Mild' | 'Medium' | 'Spicy' | 'Very Spicy';
  allergens: string[];
  shelfLife: string;
  storage: string;
  isVegetarian: boolean;
  nutritionHighlights: string[];
  bestWith: string[];
  badges: string[];
  images: string[];
  variants: {
    weight: string;
    price: number;
    stock: number;
  }[];
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
  isNew: boolean;
}

export const products: Product[] = [
  // SNACKS
  {
    id: 'banana-chips',
    name: 'BANANA CHIPS',
    slug: 'banana-chips',
    category: 'snacks',
    description: 'Crispy fried banana slices with perfect golden color. Kerala-style preparation with authentic taste.',
    tagline: 'Crispy Golden Banana Slices',
    ingredients: ['Raw bananas', 'Coconut oil', 'Salt'],
    spiceLevel: 'None',
    allergens: [],
    shelfLife: '30 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Natural sweetness', 'Potassium rich', 'Coconut oil benefits'],
    bestWith: ['Evening tea', 'Kids snack', 'Travel food'],
    badges: ['Natural', 'Kids-friendly'],
    images: ['/banana-chips-1.jpg', '/banana-chips-2.jpg', '/banana-chips-3.jpg'],
    variants: [
      { weight: '250g', price: 140, stock: 60 },
      { weight: '500g', price: 270, stock: 35 },
      { weight: '1kg', price: 520, stock: 20 }
    ],
    rating: 4.4,
    reviewCount: 156,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'palli-chekkalu',
    name: 'PALLI CHEKKALU',
    slug: 'palli-chekkalu',
    category: 'snacks',
    description: 'Traditional Hyderabadi rice crackers infused with roasted groundnuts and aromatic spices. Crispy, crunchy, and irresistibly delicious.',
    tagline: 'Crispy Rice Crackers with Groundnuts',
    ingredients: ['Rice flour', 'Groundnuts', 'Sesame seeds', 'Cumin', 'Red chilli powder', 'Salt', 'Oil'],
    spiceLevel: 'Medium',
    allergens: ['Peanuts/Groundnuts', 'Sesame'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['High in protein', 'Good source of healthy fats', 'Gluten-free'],
    bestWith: ['Evening tea', 'Coffee', 'Buttermilk'],
    badges: ['Bestseller', 'Traditional'],
    images: ['https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg', 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg', 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg'],
    variants: [
      { weight: '250g', price: 180, stock: 50 },
      { weight: '500g', price: 350, stock: 30 },
      { weight: '1kg', price: 680, stock: 15 }
    ],
    rating: 4.8,
    reviewCount: 127,
    isBestseller: true,
    isNew: true
  },
  {
    id: 'pappu-chekkalu',
    name: 'PAPPU CHEKKALU',
    slug: 'pappu-chekkalu',
    category: 'snacks',
    description: 'Protein-rich lentil crackers made with traditional Andhra spices. A healthy and flavorful snacking option.',
    tagline: 'Nutritious Lentil Crackers',
    ingredients: ['Lentil flour', 'Rice flour', 'Cumin', 'Coriander', 'Red chilli powder', 'Salt', 'Oil'],
    spiceLevel: 'Mild',
    allergens: [],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['High protein', 'Rich in fiber', 'Low fat'],
    bestWith: ['Yogurt', 'Pickle', 'Chutney'],
    badges: ['Healthy', 'Protein Rich'],
    images: ['https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg'],
    variants: [
      { weight: '250g', price: 160, stock: 40 },
      { weight: '500g', price: 310, stock: 25 },
      { weight: '1kg', price: 600, stock: 12 }
    ],
    rating: 4.6,
    reviewCount: 89,
    isBestseller: true,
    isNew: true
  },
  {
    id: 'pachi-karam-chekkalu',
    name: 'PACHI KARAM CHEKKALU',
    slug: 'pachi-karam-chekkalu',
    category: 'snacks',
    description: 'Fiery hot rice crackers with fresh green chillies and spices. Perfect for spice lovers seeking an authentic kick.',
    tagline: 'Spicy Rice Crackers with Green Chillies',
    ingredients: ['Rice flour', 'Green chillies', 'Ginger', 'Garlic', 'Cumin', 'Salt', 'Oil'],
    spiceLevel: 'Very Spicy',
    allergens: [],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Low calorie', 'Metabolism booster', 'Vitamin C rich'],
    bestWith: ['Lassi', 'Milk', 'Curd rice'],
    badges: ['Spicy', 'Traditional'],
    images: ['https://images.pexels.com/photos/6646304/pexels-photo-6646304.jpeg', 'https://images.pexels.com/photos/6646304/pexels-photo-6646304.jpeg', 'https://images.pexels.com/photos/6646304/pexels-photo-6646304.jpeg'],
    variants: [
      { weight: '250g', price: 170, stock: 35 },
      { weight: '500g', price: 330, stock: 20 },
      { weight: '1kg', price: 640, stock: 10 }
    ],
    rating: 4.7,
    reviewCount: 156,
    isBestseller: true,
    isNew: true
  },
  {
    id: 'white-sakinalu',
    name: 'WHITE SAKINALU',
    slug: 'white-sakinalu',
    category: 'snacks',
    description: 'Delicate spiral rice snacks with a mild, aromatic flavor. A classic Telangana delicacy perfect for all ages.',
    tagline: 'Mild Spiral Rice Snacks',
    ingredients: ['Rice flour', 'Sesame seeds', 'Cumin', 'Ajwain', 'Salt', 'Oil'],
    spiceLevel: 'None',
    allergens: ['Sesame'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Light and crispy', 'Easy to digest', 'Kid-friendly'],
    bestWith: ['Tea', 'Milk', 'Fruit juices'],
    badges: ['Kids-friendly', 'Mild'],
    images: ['https://images.pexels.com/photos/4518669/pexels-photo-4518669.jpeg'],
    variants: [
      { weight: '250g', price: 150, stock: 45 },
      { weight: '500g', price: 290, stock: 28 },
      { weight: '1kg', price: 560, stock: 15 }
    ],
    rating: 4.5,
    reviewCount: 98,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'karam-sakinalu',
    name: 'KARAM SAKINALU',
    slug: 'karam-sakinalu',
    category: 'snacks',
    description: 'Spicy spiral rice snacks loaded with traditional Andhra spices. A fiery twist on the classic sakinalu.',
    tagline: 'Spicy Spiral Rice Snacks',
    ingredients: ['Rice flour', 'Red chilli powder', 'Sesame seeds', 'Cumin', 'Coriander', 'Salt', 'Oil'],
    spiceLevel: 'Spicy',
    allergens: ['Sesame'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Antioxidant rich', 'Metabolism booster', 'Low sodium'],
    bestWith: ['Buttermilk', 'Lassi', 'Cool drinks'],
    badges: ['Spicy', 'Popular'],
    images: ['https://images.pexels.com/photos/5560761/pexels-photo-5560761.jpeg'],
    variants: [
      { weight: '250g', price: 165, stock: 40 },
      { weight: '500g', price: 320, stock: 24 },
      { weight: '1kg', price: 620, stock: 12 }
    ],
    rating: 4.6,
    reviewCount: 112,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'round-murukulu',
    name: 'ROUND MURUKULU',
    slug: 'round-murukulu',
    category: 'snacks',
    description: 'Classic round-shaped rice flour snacks with perfect crunch. Traditional South Indian favorite with authentic taste.',
    tagline: 'Classic Crunchy Rice Rings',
    ingredients: ['Rice flour', 'Urad dal', 'Sesame seeds', 'Cumin', 'Asafoetida', 'Salt', 'Oil'],
    spiceLevel: 'Mild',
    allergens: ['Sesame'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Protein enriched', 'Gluten-free', 'Traditional recipe'],
    bestWith: ['Coffee', 'Tea', 'Hot chocolate'],
    badges: ['Traditional', 'Classic'],
    images: ['https://images.pexels.com/photos/6646320/pexels-photo-6646320.jpeg'],
    variants: [
      { weight: '250g', price: 155, stock: 50 },
      { weight: '500g', price: 300, stock: 30 },
      { weight: '1kg', price: 580, stock: 18 }
    ],
    rating: 4.4,
    reviewCount: 87,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'karapusa-murukulu',
    name: 'KARAPUSA/MURUKULU',
    slug: 'karapusa-murukulu',
    category: 'snacks',
    description: 'Spicy twisted rice flour snacks with intense flavor. Popular Andhra-style murukulu with extra kick.',
    tagline: 'Spicy Twisted Rice Snacks',
    ingredients: ['Rice flour', 'Black gram', 'Red chilli powder', 'Sesame seeds', 'Cumin', 'Salt', 'Oil'],
    spiceLevel: 'Spicy',
    allergens: ['Sesame'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['High fiber', 'Protein rich', 'Iron source'],
    bestWith: ['Curd', 'Coconut chutney', 'Sambar'],
    badges: ['Spicy', 'Andhra Style'],
    images: ['https://images.pexels.com/photos/4518670/pexels-photo-4518670.jpeg'],
    variants: [
      { weight: '250g', price: 175, stock: 35 },
      { weight: '500g', price: 340, stock: 22 },
      { weight: '1kg', price: 660, stock: 11 }
    ],
    rating: 4.7,
    reviewCount: 134,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'boondi-kara',
    name: 'BOONDI KARA',
    slug: 'boondi-kara',
    category: 'snacks',
    description: 'Savory gram flour droplets seasoned with aromatic spices. Crispy bite-sized snacks perfect for munching.',
    tagline: 'Crispy Savory Gram Flour Drops',
    ingredients: ['Gram flour', 'Rice flour', 'Red chilli powder', 'Turmeric', 'Asafoetida', 'Salt', 'Oil'],
    spiceLevel: 'Medium',
    allergens: [],
    shelfLife: '30 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Protein rich', 'Gluten-free', 'Low calorie'],
    bestWith: ['Yogurt', 'Raita', 'As topping'],
    badges: ['Versatile', 'Protein Rich'],
    images: ['https://images.pexels.com/photos/5560764/pexels-photo-5560764.jpeg'],
    variants: [
      { weight: '250g', price: 140, stock: 55 },
      { weight: '500g', price: 270, stock: 32 },
      { weight: '1kg', price: 520, stock: 16 }
    ],
    rating: 4.3,
    reviewCount: 76,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'cornflakes-chudva-chilli',
    name: 'CORNFLAKES CHUDVA (CHILLI)',
    slug: 'cornflakes-chudva-chilli',
    category: 'snacks',
    description: 'Spicy cornflakes mix with peanuts, curry leaves, and aromatic spices. Modern twist on traditional chudva.',
    tagline: 'Spicy Cornflakes Mix',
    ingredients: ['Cornflakes', 'Peanuts', 'Curry leaves', 'Green chillies', 'Ginger', 'Turmeric', 'Salt', 'Oil'],
    spiceLevel: 'Medium',
    allergens: ['Peanuts'],
    shelfLife: '30 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Vitamin enriched', 'Crunchy texture', 'Modern recipe'],
    bestWith: ['Evening snack', 'Travel food', 'Movie time'],
    badges: ['Modern', 'Crunchy'],
    images: ['https://images.pexels.com/photos/4518644/pexels-photo-4518644.jpeg'],
    variants: [
      { weight: '250g', price: 120, stock: 60 },
      { weight: '500g', price: 230, stock: 35 },
      { weight: '1kg', price: 440, stock: 20 }
    ],
    rating: 4.2,
    reviewCount: 92,
    isBestseller: false,
    isNew: true
  },
  {
    id: 'poha-chudva-salt',
    name: 'POHA CHUDVA (SALT)',
    slug: 'poha-chudva-salt',
    category: 'snacks',
    description: 'Light and crispy flattened rice snack with mild salt seasoning. Perfect healthy snacking option.',
    tagline: 'Light Salted Flattened Rice Snack',
    ingredients: ['Poha (flattened rice)', 'Peanuts', 'Curry leaves', 'Turmeric', 'Salt', 'Oil'],
    spiceLevel: 'None',
    allergens: ['Peanuts'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Light and airy', 'Low calorie', 'Iron fortified'],
    bestWith: ['Tea', 'Coffee', 'Kids snack'],
    badges: ['Light', 'Healthy'],
    images: ['https://images.pexels.com/photos/6646318/pexels-photo-6646318.jpeg'],
    variants: [
      { weight: '250g', price: 100, stock: 70 },
      { weight: '500g', price: 190, stock: 40 },
      { weight: '1kg', price: 360, stock: 25 }
    ],
    rating: 4.1,
    reviewCount: 58,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'poha-chudva-karam',
    name: 'POHA CHUDVA (KARAM)',
    slug: 'poha-chudva-karam',
    category: 'snacks',
    description: 'Spicy flattened rice snack with traditional Andhra spices. Flavorful and addictive snacking experience.',
    tagline: 'Spicy Flattened Rice Snack',
    ingredients: ['Poha (flattened rice)', 'Red chilli powder', 'Peanuts', 'Curry leaves', 'Coriander powder', 'Salt', 'Oil'],
    spiceLevel: 'Medium',
    allergens: ['Peanuts'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Spice rich', 'Light texture', 'Digestive'],
    bestWith: ['Buttermilk', 'Lemon juice', 'Cool beverages'],
    badges: ['Spicy', 'Popular'],
    images: ['https://images.pexels.com/photos/5560762/pexels-photo-5560762.jpeg'],
    variants: [
      { weight: '250g', price: 110, stock: 65 },
      { weight: '500g', price: 210, stock: 38 },
      { weight: '1kg', price: 400, stock: 22 }
    ],
    rating: 4.4,
    reviewCount: 103,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'chakodilu',
    name: 'CHAKODILU',
    slug: 'chakodilu',
    category: 'snacks',
    description: 'Traditional ring-shaped rice crackers with sesame seeds. Classic Telangana snack with authentic taste.',
    tagline: 'Traditional Ring-shaped Rice Crackers',
    ingredients: ['Rice flour', 'Sesame seeds', 'Cumin seeds', 'Salt', 'Oil'],
    spiceLevel: 'Mild',
    allergens: ['Sesame'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Traditional recipe', 'Sesame benefits', 'Authentic taste'],
    bestWith: ['Pickle', 'Chutney', 'Yogurt'],
    badges: ['Traditional', 'Authentic'],
    images: ['https://images.pexels.com/photos/4518672/pexels-photo-4518672.jpeg'],
    variants: [
      { weight: '250g', price: 145, stock: 48 },
      { weight: '500g', price: 280, stock: 26 },
      { weight: '1kg', price: 540, stock: 14 }
    ],
    rating: 4.5,
    reviewCount: 67,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'mixture',
    name: 'MIXTURE',
    slug: 'mixture',
    category: 'snacks',
    description: 'Classic South Indian mixture with variety of ingredients. Perfect blend of textures and flavors in every bite.',
    tagline: 'Classic Mixed Snacks Variety',
    ingredients: ['Sev', 'Peanuts', 'Curry leaves', 'Cashews', 'Raisins', 'Various spices', 'Salt', 'Oil'],
    spiceLevel: 'Medium',
    allergens: ['Peanuts', 'Cashews'],
    shelfLife: '30 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Variety of textures', 'Mixed nutrients', 'Classic taste'],
    bestWith: ['Tea', 'Coffee', 'Any time snack'],
    badges: ['Bestseller', 'Classic'],
    images: ['https://images.pexels.com/photos/4518647/pexels-photo-4518647.jpeg'],
    variants: [
      { weight: '250g', price: 160, stock: 80 },
      { weight: '500g', price: 310, stock: 45 },
      { weight: '1kg', price: 600, stock: 25 }
    ],
    rating: 4.8,
    reviewCount: 245,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'namak-para',
    name: 'NAMAK PARA',
    slug: 'namak-para',
    category: 'snacks',
    description: 'Crispy diamond-shaped savory biscuits. North Indian favorite with perfect salt and spice balance.',
    tagline: 'Crispy Savory Diamond Biscuits',
    ingredients: ['All-purpose flour', 'Carom seeds', 'Cumin seeds', 'Salt', 'Oil'],
    spiceLevel: 'Mild',
    allergens: ['Gluten'],
    shelfLife: '45 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Crispy texture', 'Long shelf life', 'Tea time favorite'],
    bestWith: ['Hot tea', 'Coffee', 'Milk'],
    badges: ['North Indian', 'Tea Time'],
    images: ['https://images.pexels.com/photos/5560766/pexels-photo-5560766.jpeg'],
    variants: [
      { weight: '250g', price: 130, stock: 55 },
      { weight: '500g', price: 250, stock: 32 },
      { weight: '1kg', price: 480, stock: 18 }
    ],
    rating: 4.3,
    reviewCount: 89,
    isBestseller: false,
    isNew: false
  },

  // POWDERS
  {
    id: 'karive-paku-powder',
    name: 'KARIVE PAKU POWDER',
    slug: 'karive-paku-powder',
    category: 'powders',
    description: 'Aromatic curry leaf powder with authentic South Indian flavor. Perfect seasoning for rice and curries.',
    tagline: 'Aromatic Curry Leaf Seasoning',
    ingredients: ['Curry leaves', 'Red chilli', 'Urad dal', 'Chana dal', 'Coriander seeds', 'Salt'],
    spiceLevel: 'Medium',
    allergens: [],
    shelfLife: '6 months',
    storage: 'Store in airtight container away from moisture',
    isVegetarian: true,
    nutritionHighlights: ['Rich in antioxidants', 'Natural flavor enhancer', 'Traditional blend'],
    bestWith: ['Rice', 'Idli', 'Dosa', 'Curries'],
    badges: ['Traditional', 'Aromatic'],
    images: ['https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg'],
    variants: [
      { weight: '250g', price: 220, stock: 30 },
      { weight: '500g', price: 420, stock: 18 },
      { weight: '1kg', price: 800, stock: 10 }
    ],
    rating: 4.7,
    reviewCount: 78,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'pudina-powder',
    name: 'PUDINA POWDER',
    slug: 'pudina-powder',
    category: 'powders',
    description: 'Fresh mint powder with cooling properties. Refreshing seasoning perfect for hot weather meals.',
    tagline: 'Refreshing Mint Seasoning',
    ingredients: ['Fresh mint leaves', 'Green chillies', 'Ginger', 'Cumin', 'Salt'],
    spiceLevel: 'Mild',
    allergens: [],
    shelfLife: '4 months',
    storage: 'Store in airtight container in refrigerator',
    isVegetarian: true,
    nutritionHighlights: ['Cooling properties', 'Digestive aid', 'Fresh flavor'],
    bestWith: ['Curd rice', 'Buttermilk', 'Raita', 'Salads'],
    badges: ['Cooling', 'Fresh'],
    images: ['https://images.pexels.com/photos/4198172/pexels-photo-4198172.jpeg'],
    variants: [
      { weight: '250g', price: 200, stock: 25 },
      { weight: '500g', price: 380, stock: 15 },
      { weight: '1kg', price: 720, stock: 8 }
    ],
    rating: 4.5,
    reviewCount: 45,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'vellule-powder',
    name: 'VELLULE POWDER',
    slug: 'vellule-powder',
    category: 'powders',
    description: 'Traditional garlic powder with medicinal properties. Strong flavor enhancer for various dishes.',
    tagline: 'Traditional Garlic Seasoning',
    ingredients: ['Dried garlic', 'Red chilli', 'Cumin', 'Coriander', 'Turmeric', 'Salt'],
    spiceLevel: 'Medium',
    allergens: [],
    shelfLife: '8 months',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Medicinal properties', 'Immunity booster', 'Strong flavor'],
    bestWith: ['Rice', 'Rotis', 'Vegetables', 'Dal'],
    badges: ['Medicinal', 'Traditional'],
    images: ['https://images.pexels.com/photos/4198174/pexels-photo-4198174.jpeg'],
    variants: [
      { weight: '250g', price: 240, stock: 28 },
      { weight: '500g', price: 460, stock: 16 },
      { weight: '1kg', price: 880, stock: 9 }
    ],
    rating: 4.6,
    reviewCount: 67,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'idly-powder',
    name: 'IDLY POWDER',
    slug: 'idly-powder',
    category: 'powders',
    description: 'Classic South Indian powder perfect for idlis and dosas. Authentic blend of lentils and spices.',
    tagline: 'Classic South Indian Breakfast Powder',
    ingredients: ['Urad dal', 'Chana dal', 'Red chilli', 'Sesame seeds', 'Cumin', 'Asafoetida', 'Salt'],
    spiceLevel: 'Medium',
    allergens: ['Sesame'],
    shelfLife: '6 months',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Protein rich', 'Traditional recipe', 'Authentic taste'],
    bestWith: ['Idli', 'Dosa', 'Uttapam', 'Plain rice'],
    badges: ['Bestseller', 'Traditional'],
    images: ['https://images.pexels.com/photos/4198176/pexels-photo-4198176.jpeg'],
    variants: [
      { weight: '250g', price: 180, stock: 50 },
      { weight: '500g', price: 350, stock: 30 },
      { weight: '1kg', price: 680, stock: 18 }
    ],
    rating: 4.8,
    reviewCount: 234,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'sambar-powder',
    name: 'SAMBAR POWDER',
    slug: 'sambar-powder',
    category: 'powders',
    description: 'Authentic sambar masala with perfect spice balance. Essential ingredient for traditional South Indian sambar.',
    tagline: 'Authentic Sambar Masala Blend',
    ingredients: ['Coriander seeds', 'Red chilli', 'Fenugreek', 'Cumin', 'Black pepper', 'Turmeric', 'Asafoetida'],
    spiceLevel: 'Medium',
    allergens: [],
    shelfLife: '8 months',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Perfect spice blend', 'Traditional recipe', 'Authentic flavor'],
    bestWith: ['Sambar', 'Rasam', 'Vegetable curries', 'Dal'],
    badges: ['Bestseller', 'Authentic'],
    images: ['https://images.pexels.com/photos/4198178/pexels-photo-4198178.jpeg'],
    variants: [
      { weight: '250g', price: 200, stock: 45 },
      { weight: '500g', price: 380, stock: 28 },
      { weight: '1kg', price: 740, stock: 15 }
    ],
    rating: 4.9,
    reviewCount: 189,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'masala-karam-powder',
    name: 'MASALA KARAM POWDER',
    slug: 'masala-karam-powder',
    category: 'powders',
    description: 'Spicy masala powder with complex flavor profile. Perfect for adding heat and flavor to any dish.',
    tagline: 'Complex Spicy Masala Blend',
    ingredients: ['Red chilli', 'Coriander', 'Cumin', 'Fennel', 'Black pepper', 'Cloves', 'Cinnamon', 'Salt'],
    spiceLevel: 'Spicy',
    allergens: [],
    shelfLife: '8 months',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Complex spice blend', 'Flavor enhancer', 'Versatile use'],
    bestWith: ['Rice', 'Vegetables', 'Curries', 'Meat dishes'],
    badges: ['Spicy', 'Versatile'],
    images: ['https://images.pexels.com/photos/4198180/pexels-photo-4198180.jpeg'],
    variants: [
      { weight: '250g', price: 220, stock: 35 },
      { weight: '500g', price: 420, stock: 20 },
      { weight: '1kg', price: 800, stock: 12 }
    ],
    rating: 4.7,
    reviewCount: 145,
    isBestseller: false,
    isNew: false
  },

  // SWEETS
  {
    id: 'dry-fruits-laddu',
    name: 'DRY FRUITS LADDU',
    slug: 'dry-fruits-laddu',
    category: 'sweets',
    description: 'Premium laddus made with assorted dry fruits and nuts. Rich, nutritious, and perfectly sweet.',
    tagline: 'Premium Mixed Dry Fruit Balls',
    ingredients: ['Almonds', 'Cashews', 'Dates', 'Raisins', 'Pistachios', 'Ghee', 'Cardamom'],
    spiceLevel: 'None',
    allergens: ['Nuts', 'Dairy'],
    shelfLife: '15 days',
    storage: 'Store in airtight container in cool place',
    isVegetarian: true,
    nutritionHighlights: ['High protein', 'Rich in healthy fats', 'Natural sweetness'],
    bestWith: ['Festival celebrations', 'Gift item', 'Energy boost'],
    badges: ['Premium', 'Festive'],
    images: ['https://images.pexels.com/photos/4110008/pexels-photo-4110008.jpeg'],
    variants: [
      { weight: '250g', price: 450, stock: 25 },
      { weight: '500g', price: 880, stock: 15 },
      { weight: '1kg', price: 1700, stock: 8 }
    ],
    rating: 4.9,
    reviewCount: 156,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'boondi-laddu',
    name: 'BOONDI LADDU',
    slug: 'boondi-laddu',
    category: 'sweets',
    description: 'Traditional gram flour laddus with perfect sweetness. Classic Indian sweet for all occasions.',
    tagline: 'Traditional Gram Flour Sweet Balls',
    ingredients: ['Gram flour', 'Sugar', 'Ghee', 'Cardamom', 'Cashews', 'Raisins'],
    spiceLevel: 'None',
    allergens: ['Dairy', 'Cashews'],
    shelfLife: '10 days',
    storage: 'Store in airtight container in cool place',
    isVegetarian: true,
    nutritionHighlights: ['Traditional recipe', 'Protein source', 'Festival favorite'],
    bestWith: ['Tea', 'Milk', 'Special occasions'],
    badges: ['Traditional', 'Popular'],
    images: ['https://images.pexels.com/photos/4110010/pexels-photo-4110010.jpeg'],
    variants: [
      { weight: '250g', price: 280, stock: 40 },
      { weight: '500g', price: 540, stock: 25 },
      { weight: '1kg', price: 1050, stock: 12 }
    ],
    rating: 4.7,
    reviewCount: 201,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'sunnundallu-sugar',
    name: 'SUNNUNDALLU (SUGAR)',
    slug: 'sunnundallu-sugar',
    category: 'sweets',
    description: 'Traditional sesame seed balls with sugar. Healthy and energizing Andhra sweet with authentic taste.',
    tagline: 'Traditional Sesame Sweet Balls',
    ingredients: ['Sesame seeds', 'Sugar', 'Ghee', 'Cardamom'],
    spiceLevel: 'None',
    allergens: ['Sesame', 'Dairy'],
    shelfLife: '20 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Calcium rich', 'Healthy fats', 'Energy booster'],
    bestWith: ['Winter season', 'Breakfast', 'Energy snack'],
    badges: ['Healthy', 'Traditional'],
    images: ['https://images.pexels.com/photos/4110012/pexels-photo-4110012.jpeg'],
    variants: [
      { weight: '250g', price: 320, stock: 35 },
      { weight: '500g', price: 620, stock: 20 },
      { weight: '1kg', price: 1200, stock: 10 }
    ],
    rating: 4.6,
    reviewCount: 89,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'sunnundallu-jaggery',
    name: 'SUNNUNDALLU (JAGGERY)',
    slug: 'sunnundallu-jaggery',
    category: 'sweets',
    description: 'Traditional sesame seed balls with jaggery. Natural sweetness with enhanced nutritional benefits.',
    tagline: 'Natural Jaggery Sesame Balls',
    ingredients: ['Sesame seeds', 'Jaggery', 'Ghee', 'Cardamom'],
    spiceLevel: 'None',
    allergens: ['Sesame', 'Dairy'],
    shelfLife: '20 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Natural sweetener', 'Iron rich', 'Digestive benefits'],
    bestWith: ['Winter season', 'Morning energy', 'Health conscious'],
    badges: ['Natural', 'Healthy'],
    images: ['https://images.pexels.com/photos/4110014/pexels-photo-4110014.jpeg'],
    variants: [
      { weight: '250g', price: 340, stock: 30 },
      { weight: '500g', price: 660, stock: 18 },
      { weight: '1kg', price: 1280, stock: 9 }
    ],
    rating: 4.8,
    reviewCount: 112,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'rose-cookies',
    name: 'ROSE COOKIES',
    slug: 'rose-cookies',
    category: 'sweets',
    description: 'Delicate flower-shaped cookies with rose essence. Beautiful and flavorful treats perfect for gifting.',
    tagline: 'Delicate Rose-scented Flower Cookies',
    ingredients: ['All-purpose flour', 'Rice flour', 'Coconut milk', 'Sugar', 'Rose essence', 'Oil'],
    spiceLevel: 'None',
    allergens: ['Gluten'],
    shelfLife: '15 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Light texture', 'Aromatic', 'Gift-worthy presentation'],
    bestWith: ['Tea time', 'Gifting', 'Special occasions'],
    badges: ['Gifting', 'Aromatic'],
    images: ['https://images.pexels.com/photos/4110016/pexels-photo-4110016.jpeg'],
    variants: [
      { weight: '250g', price: 260, stock: 45 },
      { weight: '500g', price: 500, stock: 26 },
      { weight: '1kg', price: 980, stock: 14 }
    ],
    rating: 4.5,
    reviewCount: 78,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'gavalu',
    name: 'GAVALU',
    slug: 'gavalu',
    category: 'sweets',
    description: 'Traditional shell-shaped sweet with coconut filling. Classic Andhra sweet with authentic preparation.',
    tagline: 'Traditional Shell-shaped Coconut Sweets',
    ingredients: ['Rice flour', 'Fresh coconut', 'Jaggery', 'Ghee', 'Cardamom', 'Cashews'],
    spiceLevel: 'None',
    allergens: ['Dairy', 'Cashews'],
    shelfLife: '7 days',
    storage: 'Store in refrigerator in airtight container',
    isVegetarian: true,
    nutritionHighlights: ['Fresh coconut', 'Natural jaggery', 'Traditional recipe'],
    bestWith: ['Festival celebrations', 'Traditional meals', 'Special occasions'],
    badges: ['Traditional', 'Festive'],
    images: ['https://images.pexels.com/photos/4110018/pexels-photo-4110018.jpeg'],
    variants: [
      { weight: '250g', price: 380, stock: 20 },
      { weight: '500g', price: 740, stock: 12 },
      { weight: '1kg', price: 1450, stock: 6 }
    ],
    rating: 4.7,
    reviewCount: 95,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'ariselu',
    name: 'ARISELU',
    slug: 'ariselu',
    category: 'sweets',
    description: 'Traditional festival sweet made with rice flour and jaggery. Essential sweet for Sankranti celebrations.',
    tagline: 'Traditional Festival Rice Sweet',
    ingredients: ['Rice flour', 'Jaggery', 'Sesame seeds', 'Ghee', 'Cardamom'],
    spiceLevel: 'None',
    allergens: ['Sesame', 'Dairy'],
    shelfLife: '5 days',
    storage: 'Store in airtight container at room temperature',
    isVegetarian: true,
    nutritionHighlights: ['Festival special', 'Natural sweetener', 'Traditional preparation'],
    bestWith: ['Sankranti festival', 'Traditional celebrations', 'Religious offerings'],
    badges: ['Festival Special', 'Traditional'],
    images: ['https://images.pexels.com/photos/4110020/pexels-photo-4110020.jpeg'],
    variants: [
      { weight: '250g', price: 350, stock: 15 },
      { weight: '500g', price: 680, stock: 8 },
      { weight: '1kg', price: 1320, stock: 4 }
    ],
    rating: 4.8,
    reviewCount: 134,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'sweet-puffs-garjalu-jaggery',
    name: 'SWEET PUFFS/GARJALU (JAGGERY)',
    slug: 'sweet-puffs-garjalu-jaggery',
    category: 'sweets',
    description: 'Crispy sweet puffs filled with jaggery and coconut. Light, airy texture with natural sweetness.',
    tagline: 'Crispy Jaggery-filled Sweet Puffs',
    ingredients: ['All-purpose flour', 'Jaggery', 'Fresh coconut', 'Ghee', 'Cardamom', 'Oil'],
    spiceLevel: 'None',
    allergens: ['Gluten', 'Dairy'],
    shelfLife: '10 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Light and crispy', 'Natural jaggery', 'Fresh coconut filling'],
    bestWith: ['Tea time', 'Evening snack', 'Light dessert'],
    badges: ['Light', 'Natural'],
    images: ['https://images.pexels.com/photos/4110022/pexels-photo-4110022.jpeg'],
    variants: [
      { weight: '250g', price: 290, stock: 35 },
      { weight: '500g', price: 560, stock: 20 },
      { weight: '1kg', price: 1080, stock: 10 }
    ],
    rating: 4.4,
    reviewCount: 67,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'sweet-puffs-garjalu-sugar',
    name: 'SWEET PUFFS/GARJALU (SUGAR)',
    slug: 'sweet-puffs-garjalu-sugar',
    category: 'sweets',
    description: 'Crispy sweet puffs filled with sugar and coconut. Classic preparation with perfect sweetness.',
    tagline: 'Crispy Sugar-filled Sweet Puffs',
    ingredients: ['All-purpose flour', 'Sugar', 'Fresh coconut', 'Ghee', 'Cardamom', 'Oil'],
    spiceLevel: 'None',
    allergens: ['Gluten', 'Dairy'],
    shelfLife: '10 days',
    storage: 'Store in airtight container in cool, dry place',
    isVegetarian: true,
    nutritionHighlights: ['Crispy texture', 'Perfect sweetness', 'Fresh coconut'],
    bestWith: ['Tea time', 'Kids favorite', 'Light dessert'],
    badges: ['Kids-friendly', 'Classic'],
    images: ['https://images.pexels.com/photos/4110024/pexels-photo-4110024.jpeg'],
    variants: [
      { weight: '250g', price: 270, stock: 40 },
      { weight: '500g', price: 520, stock: 24 },
      { weight: '1kg', price: 1000, stock: 12 }
    ],
    rating: 4.3,
    reviewCount: 58,
    isBestseller: false,
    isNew: false
  },

  // PICKLES
  {
    id: 'mix-veg-pickle',
    name: 'MIX VEG PICKLE',
    slug: 'mix-veg-pickle',
    category: 'pickles',
    description: 'Traditional mixed vegetable pickle with authentic Andhra spices. Perfect accompaniment for rice and rotis.',
    tagline: 'Traditional Mixed Vegetable Pickle',
    ingredients: ['Mixed vegetables', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'],
    spiceLevel: 'Spicy',
    allergens: [],
    shelfLife: '12 months',
    storage: 'Store in cool, dry place. Use dry spoon.',
    isVegetarian: true,
    nutritionHighlights: ['Probiotic benefits', 'Vitamin C rich', 'Digestive aid'],
    bestWith: ['Rice', 'Rotis', 'Parathas', 'Curd rice'],
    badges: ['Traditional', 'Long Lasting'],
    images: ['https://images.pexels.com/photos/4518656/pexels-photo-4518656.jpeg'],
    variants: [
      { weight: '250g', price: 180, stock: 45 },
      { weight: '500g', price: 350, stock: 28 },
      { weight: '1kg', price: 680, stock: 15 }
    ],
    rating: 4.6,
    reviewCount: 178,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'mango-pickle',
    name: 'MANGO PICKLE',
    slug: 'mango-pickle',
    category: 'pickles',
    description: 'Classic mango pickle with traditional Andhra preparation. Tangy and spicy flavor that enhances every meal.',
    tagline: 'Classic Tangy Mango Pickle',
    ingredients: ['Raw mangoes', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'],
    spiceLevel: 'Spicy',
    allergens: [],
    shelfLife: '12 months',
    storage: 'Store in cool, dry place. Use dry spoon.',
    isVegetarian: true,
    nutritionHighlights: ['Vitamin A rich', 'Antioxidants', 'Digestive properties'],
    bestWith: ['Plain rice', 'Curd rice', 'Parathas', 'Traditional meals'],
    badges: ['Bestseller', 'Classic'],
    images: ['https://images.pexels.com/photos/4518658/pexels-photo-4518658.jpeg'],
    variants: [
      { weight: '250g', price: 200, stock: 60 },
      { weight: '500g', price: 380, stock: 35 },
      { weight: '1kg', price: 740, stock: 20 }
    ],
    rating: 4.9,
    reviewCount: 267,
    isBestseller: true,
    isNew: false
  },
  {
    id: 'lemon-pickle',
    name: 'LEMON PICKLE',
    slug: 'lemon-pickle',
    category: 'pickles',
    description: 'Tangy lemon pickle with perfect balance of spices. Refreshing and appetizing pickle for all seasons.',
    tagline: 'Refreshing Tangy Lemon Pickle',
    ingredients: ['Fresh lemons', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'],
    spiceLevel: 'Medium',
    allergens: [],
    shelfLife: '8 months',
    storage: 'Store in cool, dry place. Use dry spoon.',
    isVegetarian: true,
    nutritionHighlights: ['Vitamin C rich', 'Digestive aid', 'Natural detox'],
    bestWith: ['Rice dishes', 'Breakfast items', 'Light meals'],
    badges: ['Refreshing', 'Vitamin C'],
    images: ['https://images.pexels.com/photos/4518660/pexels-photo-4518660.jpeg'],
    variants: [
      { weight: '250g', price: 160, stock: 50 },
      { weight: '500g', price: 310, stock: 30 },
      { weight: '1kg', price: 600, stock: 18 }
    ],
    rating: 4.5,
    reviewCount: 134,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'tomato-pickle',
    name: 'TOMATO PICKLE',
    slug: 'tomato-pickle',
    category: 'pickles',
    description: 'Unique tomato pickle with rich flavor. Perfect blend of tanginess and spices in traditional style.',
    tagline: 'Rich and Tangy Tomato Pickle',
    ingredients: ['Ripe tomatoes', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'],
    spiceLevel: 'Medium',
    allergens: [],
    shelfLife: '6 months',
    storage: 'Store in refrigerator after opening. Use dry spoon.',
    isVegetarian: true,
    nutritionHighlights: ['Lycopene rich', 'Antioxidants', 'Unique flavor'],
    bestWith: ['Rice', 'Bread', 'Rotis', 'Snacks'],
    badges: ['Unique', 'Antioxidant Rich'],
    images: ['https://images.pexels.com/photos/4518662/pexels-photo-4518662.jpeg'],
    variants: [
      { weight: '250g', price: 170, stock: 40 },
      { weight: '500g', price: 330, stock: 22 },
      { weight: '1kg', price: 640, stock: 12 }
    ],
    rating: 4.4,
    reviewCount: 89,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'ginger-pickle',
    name: 'GINGER PICKLE',
    slug: 'ginger-pickle',
    category: 'pickles',
    description: 'Spicy ginger pickle with medicinal properties. Warming and flavorful pickle perfect for cold weather.',
    tagline: 'Warming Spicy Ginger Pickle',
    ingredients: ['Fresh ginger', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'],
    spiceLevel: 'Spicy',
    allergens: [],
    shelfLife: '10 months',
    storage: 'Store in cool, dry place. Use dry spoon.',
    isVegetarian: true,
    nutritionHighlights: ['Digestive aid', 'Anti-inflammatory', 'Warming properties'],
    bestWith: ['Winter meals', 'Heavy foods', 'Traditional cuisine'],
    badges: ['Medicinal', 'Warming'],
    images: ['https://images.pexels.com/photos/4518664/pexels-photo-4518664.jpeg'],
    variants: [
      { weight: '250g', price: 190, stock: 35 },
      { weight: '500g', price: 370, stock: 20 },
      { weight: '1kg', price: 720, stock: 10 }
    ],
    rating: 4.7,
    reviewCount: 112,
    isBestseller: false,
    isNew: false
  },
  {
    id: 'red-chilli-pickle',
    name: 'RED CHILLI PICKLE',
    slug: 'red-chilli-pickle',
    category: 'pickles',
    description: 'Fiery red chilli pickle for spice lovers. Intense heat with authentic Andhra flavor profile.',
    tagline: 'Fiery Hot Red Chilli Pickle',
    ingredients: ['Red chillies', 'Mustard oil', 'Garlic', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'],
    spiceLevel: 'Very Spicy',
    allergens: [],
    shelfLife: '12 months',
    storage: 'Store in cool, dry place. Use dry spoon.',
    isVegetarian: true,
    nutritionHighlights: ['Capsaicin benefits', 'Metabolism booster', 'Vitamin C rich'],
    bestWith: ['Plain rice', 'Curd', 'Buttermilk', 'For spice lovers'],
    badges: ['Very Spicy', 'For Spice Lovers'],
    images: ['https://images.pexels.com/photos/4518666/pexels-photo-4518666.jpeg'],
    variants: [
      { weight: '250g', price: 220, stock: 25 },
      { weight: '500g', price: 420, stock: 15 },
      { weight: '1kg', price: 800, stock: 8 }
    ],
    rating: 4.8,
    reviewCount: 201,
    isBestseller: false,
    isNew: false
  }
];

export const categories = [
  {
    id: 'snacks',
    name: 'Snacks',
    description: 'Traditional crispy snacks and savories',
    image: 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg'
  },
  {
    id: 'powders',
    name: 'Powders',
    description: 'Aromatic spice powders and seasonings',
    image: 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg'
  },
  {
    id: 'sweets',
    name: 'Sweets',
    description: 'Traditional homemade sweets and desserts',
    image: 'https://images.pexels.com/photos/4110008/pexels-photo-4110008.jpeg'
  },
  {
    id: 'pickles',
    name: 'Pickles',
    description: 'Tangy and spicy traditional pickles',
    image: 'https://images.pexels.com/photos/4518656/pexels-photo-4518656.jpeg'
  }
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.slug === slug);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(lowercaseQuery)
      )
  );
};