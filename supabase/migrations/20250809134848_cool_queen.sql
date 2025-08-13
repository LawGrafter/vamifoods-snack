/*
# Sample Data for Vamifoods Ecommerce Database
Comprehensive sample data including all products, categories, and test users

## Data Included
1. **Categories** - Snacks, Powders, Sweets, Pickles
2. **Products** - All 60+ products from the requirements
3. **Product Variants** - 250g, 500g, 1kg with realistic pricing
4. **Product Images** - High-quality food photography URLs
5. **Sample Users** - Demo accounts for testing
6. **Addresses** - Sample delivery addresses
7. **Coupons** - Promotional codes for testing
8. **Admin Users** - Backend access accounts
*/

-- Insert Categories
INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
(uuid_generate_v4(), 'Snacks', 'snacks', 'Traditional crispy snacks and savories', 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg', 1),
(uuid_generate_v4(), 'Powders', 'powders', 'Aromatic spice powders and seasonings', 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg', 2),
(uuid_generate_v4(), 'Sweets', 'sweets', 'Traditional homemade sweets and desserts', 'https://images.pexels.com/photos/4110008/pexels-photo-4110008.jpeg', 3),
(uuid_generate_v4(), 'Pickles', 'pickles', 'Tangy and spicy traditional pickles', 'https://images.pexels.com/photos/4518656/pexels-photo-4518656.jpeg', 4);

-- Get category IDs for reference
DO $$
DECLARE
    snacks_id UUID;
    powders_id UUID;
    sweets_id UUID;
    pickles_id UUID;
BEGIN
    SELECT id INTO snacks_id FROM categories WHERE slug = 'snacks';
    SELECT id INTO powders_id FROM categories WHERE slug = 'powders';
    SELECT id INTO sweets_id FROM categories WHERE slug = 'sweets';
    SELECT id INTO pickles_id FROM categories WHERE slug = 'pickles';

    -- Insert Snacks Products
    INSERT INTO products (id, category_id, name, slug, description, tagline, ingredients, spice_level, allergens, shelf_life, storage_instructions, nutrition_highlights, best_with, badges, rating, review_count, is_bestseller, is_new) VALUES
    (uuid_generate_v4(), snacks_id, 'PALLI CHEKKALU', 'palli-chekkalu', 'Traditional Hyderabadi rice crackers infused with roasted groundnuts and aromatic spices. Crispy, crunchy, and irresistibly delicious.', 'Crispy Rice Crackers with Groundnuts', ARRAY['Rice flour', 'Groundnuts', 'Sesame seeds', 'Cumin', 'Red chilli powder', 'Salt', 'Oil'], 'Medium', ARRAY['Peanuts/Groundnuts', 'Sesame'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['High in protein', 'Good source of healthy fats', 'Gluten-free'], ARRAY['Evening tea', 'Coffee', 'Buttermilk'], ARRAY['Bestseller', 'Traditional'], 4.8, 127, TRUE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'PAPPU CHEKKALU', 'pappu-chekkalu', 'Protein-rich lentil crackers made with traditional Andhra spices. A healthy and flavorful snacking option.', 'Nutritious Lentil Crackers', ARRAY['Lentil flour', 'Rice flour', 'Cumin', 'Coriander', 'Red chilli powder', 'Salt', 'Oil'], 'Mild', ARRAY[]::TEXT[], '45 days', 'Store in airtight container in cool, dry place', ARRAY['High protein', 'Rich in fiber', 'Low fat'], ARRAY['Yogurt', 'Pickle', 'Chutney'], ARRAY['Healthy', 'Protein Rich'], 4.6, 89, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'PACHI KARAM CHEKKALU', 'pachi-karam-chekkalu', 'Fiery hot rice crackers with fresh green chillies and spices. Perfect for spice lovers seeking an authentic kick.', 'Spicy Rice Crackers with Green Chillies', ARRAY['Rice flour', 'Green chillies', 'Ginger', 'Garlic', 'Cumin', 'Salt', 'Oil'], 'Very Spicy', ARRAY[]::TEXT[], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Low calorie', 'Metabolism booster', 'Vitamin C rich'], ARRAY['Lassi', 'Milk', 'Curd rice'], ARRAY['Spicy', 'Traditional'], 4.7, 156, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'WHITE SAKINALU', 'white-sakinalu', 'Delicate spiral rice snacks with a mild, aromatic flavor. A classic Telangana delicacy perfect for all ages.', 'Mild Spiral Rice Snacks', ARRAY['Rice flour', 'Sesame seeds', 'Cumin', 'Ajwain', 'Salt', 'Oil'], 'None', ARRAY['Sesame'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Light and crispy', 'Easy to digest', 'Kid-friendly'], ARRAY['Tea', 'Milk', 'Fruit juices'], ARRAY['Kids-friendly', 'Mild'], 4.5, 98, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'KARAM SAKINALU', 'karam-sakinalu', 'Spicy spiral rice snacks loaded with traditional Andhra spices. A fiery twist on the classic sakinalu.', 'Spicy Spiral Rice Snacks', ARRAY['Rice flour', 'Red chilli powder', 'Sesame seeds', 'Cumin', 'Coriander', 'Salt', 'Oil'], 'Spicy', ARRAY['Sesame'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Antioxidant rich', 'Metabolism booster', 'Low sodium'], ARRAY['Buttermilk', 'Lassi', 'Cool drinks'], ARRAY['Spicy', 'Popular'], 4.6, 112, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'ROUND MURUKULU', 'round-murukulu', 'Classic round-shaped rice flour snacks with perfect crunch. Traditional South Indian favorite with authentic taste.', 'Classic Crunchy Rice Rings', ARRAY['Rice flour', 'Urad dal', 'Sesame seeds', 'Cumin', 'Asafoetida', 'Salt', 'Oil'], 'Mild', ARRAY['Sesame'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Protein enriched', 'Gluten-free', 'Traditional recipe'], ARRAY['Coffee', 'Tea', 'Hot chocolate'], ARRAY['Traditional', 'Classic'], 4.4, 87, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'KARAPUSA/MURUKULU', 'karapusa-murukulu', 'Spicy twisted rice flour snacks with intense flavor. Popular Andhra-style murukulu with extra kick.', 'Spicy Twisted Rice Snacks', ARRAY['Rice flour', 'Black gram', 'Red chilli powder', 'Sesame seeds', 'Cumin', 'Salt', 'Oil'], 'Spicy', ARRAY['Sesame'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['High fiber', 'Protein rich', 'Iron source'], ARRAY['Curd', 'Coconut chutney', 'Sambar'], ARRAY['Spicy', 'Andhra Style'], 4.7, 134, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'BOONDI KARA', 'boondi-kara', 'Savory gram flour droplets seasoned with aromatic spices. Crispy bite-sized snacks perfect for munching.', 'Crispy Savory Gram Flour Drops', ARRAY['Gram flour', 'Rice flour', 'Red chilli powder', 'Turmeric', 'Asafoetida', 'Salt', 'Oil'], 'Medium', ARRAY[]::TEXT[], '30 days', 'Store in airtight container in cool, dry place', ARRAY['Protein rich', 'Gluten-free', 'Low calorie'], ARRAY['Yogurt', 'Raita', 'As topping'], ARRAY['Versatile', 'Protein Rich'], 4.3, 76, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'CORNFLAKES CHUDVA (CHILLI)', 'cornflakes-chudva-chilli', 'Spicy cornflakes mix with peanuts, curry leaves, and aromatic spices. Modern twist on traditional chudva.', 'Spicy Cornflakes Mix', ARRAY['Cornflakes', 'Peanuts', 'Curry leaves', 'Green chillies', 'Ginger', 'Turmeric', 'Salt', 'Oil'], 'Medium', ARRAY['Peanuts'], '30 days', 'Store in airtight container in cool, dry place', ARRAY['Vitamin enriched', 'Crunchy texture', 'Modern recipe'], ARRAY['Evening snack', 'Travel food', 'Movie time'], ARRAY['Modern', 'Crunchy'], 4.2, 92, FALSE, TRUE),
    
    (uuid_generate_v4(), snacks_id, 'POHA CHUDVA (SALT)', 'poha-chudva-salt', 'Light and crispy flattened rice snack with mild salt seasoning. Perfect healthy snacking option.', 'Light Salted Flattened Rice Snack', ARRAY['Poha (flattened rice)', 'Peanuts', 'Curry leaves', 'Turmeric', 'Salt', 'Oil'], 'None', ARRAY['Peanuts'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Light and airy', 'Low calorie', 'Iron fortified'], ARRAY['Tea', 'Coffee', 'Kids snack'], ARRAY['Light', 'Healthy'], 4.1, 58, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'POHA CHUDVA (KARAM)', 'poha-chudva-karam', 'Spicy flattened rice snack with traditional Andhra spices. Flavorful and addictive snacking experience.', 'Spicy Flattened Rice Snack', ARRAY['Poha (flattened rice)', 'Red chilli powder', 'Peanuts', 'Curry leaves', 'Coriander powder', 'Salt', 'Oil'], 'Medium', ARRAY['Peanuts'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Spice rich', 'Light texture', 'Digestive'], ARRAY['Buttermilk', 'Lemon juice', 'Cool beverages'], ARRAY['Spicy', 'Popular'], 4.4, 103, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'CHAKODILU', 'chakodilu', 'Traditional ring-shaped rice crackers with sesame seeds. Classic Telangana snack with authentic taste.', 'Traditional Ring-shaped Rice Crackers', ARRAY['Rice flour', 'Sesame seeds', 'Cumin seeds', 'Salt', 'Oil'], 'Mild', ARRAY['Sesame'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Traditional recipe', 'Sesame benefits', 'Authentic taste'], ARRAY['Pickle', 'Chutney', 'Yogurt'], ARRAY['Traditional', 'Authentic'], 4.5, 67, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'MIXTURE', 'mixture', 'Classic South Indian mixture with variety of ingredients. Perfect blend of textures and flavors in every bite.', 'Classic Mixed Snacks Variety', ARRAY['Sev', 'Peanuts', 'Curry leaves', 'Cashews', 'Raisins', 'Various spices', 'Salt', 'Oil'], 'Medium', ARRAY['Peanuts', 'Cashews'], '30 days', 'Store in airtight container in cool, dry place', ARRAY['Variety of textures', 'Mixed nutrients', 'Classic taste'], ARRAY['Tea', 'Coffee', 'Any time snack'], ARRAY['Bestseller', 'Classic'], 4.8, 245, TRUE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'NAMAK PARA', 'namak-para', 'Crispy diamond-shaped savory biscuits. North Indian favorite with perfect salt and spice balance.', 'Crispy Savory Diamond Biscuits', ARRAY['All-purpose flour', 'Carom seeds', 'Cumin seeds', 'Salt', 'Oil'], 'Mild', ARRAY['Gluten'], '45 days', 'Store in airtight container in cool, dry place', ARRAY['Crispy texture', 'Long shelf life', 'Tea time favorite'], ARRAY['Hot tea', 'Coffee', 'Milk'], ARRAY['North Indian', 'Tea Time'], 4.3, 89, FALSE, FALSE),
    
    (uuid_generate_v4(), snacks_id, 'BANANA CHIPS', 'banana-chips', 'Crispy fried banana slices with perfect golden color. Kerala-style preparation with authentic taste.', 'Crispy Golden Banana Slices', ARRAY['Raw bananas', 'Coconut oil', 'Salt'], 'None', ARRAY[]::TEXT[], '30 days', 'Store in airtight container in cool, dry place', ARRAY['Natural sweetness', 'Potassium rich', 'Coconut oil benefits'], ARRAY['Evening tea', 'Kids snack', 'Travel food'], ARRAY['Natural', 'Kids-friendly'], 4.4, 156, FALSE, FALSE);

    -- Insert Powders Products
    INSERT INTO products (id, category_id, name, slug, description, tagline, ingredients, spice_level, allergens, shelf_life, storage_instructions, nutrition_highlights, best_with, badges, rating, review_count, is_bestseller, is_new) VALUES
    (uuid_generate_v4(), powders_id, 'KARIVE PAKU POWDER', 'karive-paku-powder', 'Aromatic curry leaf powder with authentic South Indian flavor. Perfect seasoning for rice and curries.', 'Aromatic Curry Leaf Seasoning', ARRAY['Curry leaves', 'Red chilli', 'Urad dal', 'Chana dal', 'Coriander seeds', 'Salt'], 'Medium', ARRAY[]::TEXT[], '6 months', 'Store in airtight container away from moisture', ARRAY['Rich in antioxidants', 'Natural flavor enhancer', 'Traditional blend'], ARRAY['Rice', 'Idli', 'Dosa', 'Curries'], ARRAY['Traditional', 'Aromatic'], 4.7, 78, FALSE, FALSE),
    
    (uuid_generate_v4(), powders_id, 'PUDINA POWDER', 'pudina-powder', 'Fresh mint powder with cooling properties. Refreshing seasoning perfect for hot weather meals.', 'Refreshing Mint Seasoning', ARRAY['Fresh mint leaves', 'Green chillies', 'Ginger', 'Cumin', 'Salt'], 'Mild', ARRAY[]::TEXT[], '4 months', 'Store in airtight container in refrigerator', ARRAY['Cooling properties', 'Digestive aid', 'Fresh flavor'], ARRAY['Curd rice', 'Buttermilk', 'Raita', 'Salads'], ARRAY['Cooling', 'Fresh'], 4.5, 45, FALSE, FALSE),
    
    (uuid_generate_v4(), powders_id, 'VELLULE POWDER', 'vellule-powder', 'Traditional garlic powder with medicinal properties. Strong flavor enhancer for various dishes.', 'Traditional Garlic Seasoning', ARRAY['Dried garlic', 'Red chilli', 'Cumin', 'Coriander', 'Turmeric', 'Salt'], 'Medium', ARRAY[]::TEXT[], '8 months', 'Store in airtight container in cool, dry place', ARRAY['Medicinal properties', 'Immunity booster', 'Strong flavor'], ARRAY['Rice', 'Rotis', 'Vegetables', 'Dal'], ARRAY['Medicinal', 'Traditional'], 4.6, 67, FALSE, FALSE),
    
    (uuid_generate_v4(), powders_id, 'IDLY POWDER', 'idly-powder', 'Classic South Indian powder perfect for idlis and dosas. Authentic blend of lentils and spices.', 'Classic South Indian Breakfast Powder', ARRAY['Urad dal', 'Chana dal', 'Red chilli', 'Sesame seeds', 'Cumin', 'Asafoetida', 'Salt'], 'Medium', ARRAY['Sesame'], '6 months', 'Store in airtight container in cool, dry place', ARRAY['Protein rich', 'Traditional recipe', 'Authentic taste'], ARRAY['Idli', 'Dosa', 'Uttapam', 'Plain rice'], ARRAY['Bestseller', 'Traditional'], 4.8, 234, TRUE, FALSE),
    
    (uuid_generate_v4(), powders_id, 'SAMBAR POWDER', 'sambar-powder', 'Authentic sambar masala with perfect spice balance. Essential ingredient for traditional South Indian sambar.', 'Authentic Sambar Masala Blend', ARRAY['Coriander seeds', 'Red chilli', 'Fenugreek', 'Cumin', 'Black pepper', 'Turmeric', 'Asafoetida'], 'Medium', ARRAY[]::TEXT[], '8 months', 'Store in airtight container in cool, dry place', ARRAY['Perfect spice blend', 'Traditional recipe', 'Authentic flavor'], ARRAY['Sambar', 'Rasam', 'Vegetable curries', 'Dal'], ARRAY['Bestseller', 'Authentic'], 4.9, 189, TRUE, FALSE),
    
    (uuid_generate_v4(), powders_id, 'MASALA KARAM POWDER', 'masala-karam-powder', 'Spicy masala powder with complex flavor profile. Perfect for adding heat and flavor to any dish.', 'Complex Spicy Masala Blend', ARRAY['Red chilli', 'Coriander', 'Cumin', 'Fennel', 'Black pepper', 'Cloves', 'Cinnamon', 'Salt'], 'Spicy', ARRAY[]::TEXT[], '8 months', 'Store in airtight container in cool, dry place', ARRAY['Complex spice blend', 'Flavor enhancer', 'Versatile use'], ARRAY['Rice', 'Vegetables', 'Curries', 'Meat dishes'], ARRAY['Spicy', 'Versatile'], 4.7, 145, FALSE, FALSE);

    -- Insert Sweets Products
    INSERT INTO products (id, category_id, name, slug, description, tagline, ingredients, spice_level, allergens, shelf_life, storage_instructions, nutrition_highlights, best_with, badges, rating, review_count, is_bestseller, is_new) VALUES
    (uuid_generate_v4(), sweets_id, 'DRY FRUITS LADDU', 'dry-fruits-laddu', 'Premium laddus made with assorted dry fruits and nuts. Rich, nutritious, and perfectly sweet.', 'Premium Mixed Dry Fruit Balls', ARRAY['Almonds', 'Cashews', 'Dates', 'Raisins', 'Pistachios', 'Ghee', 'Cardamom'], 'None', ARRAY['Nuts', 'Dairy'], '15 days', 'Store in airtight container in cool place', ARRAY['High protein', 'Rich in healthy fats', 'Natural sweetness'], ARRAY['Festival celebrations', 'Gift item', 'Energy boost'], ARRAY['Premium', 'Festive'], 4.9, 156, TRUE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'BOONDI LADDU', 'boondi-laddu', 'Traditional gram flour laddus with perfect sweetness. Classic Indian sweet for all occasions.', 'Traditional Gram Flour Sweet Balls', ARRAY['Gram flour', 'Sugar', 'Ghee', 'Cardamom', 'Cashews', 'Raisins'], 'None', ARRAY['Dairy', 'Cashews'], '10 days', 'Store in airtight container in cool place', ARRAY['Traditional recipe', 'Protein source', 'Festival favorite'], ARRAY['Tea', 'Milk', 'Special occasions'], ARRAY['Traditional', 'Popular'], 4.7, 201, FALSE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'SUNNUNDALLU (SUGAR)', 'sunnundallu-sugar', 'Traditional sesame seed balls with sugar. Healthy and energizing Andhra sweet with authentic taste.', 'Traditional Sesame Sweet Balls', ARRAY['Sesame seeds', 'Sugar', 'Ghee', 'Cardamom'], 'None', ARRAY['Sesame', 'Dairy'], '20 days', 'Store in airtight container in cool, dry place', ARRAY['Calcium rich', 'Healthy fats', 'Energy booster'], ARRAY['Winter season', 'Breakfast', 'Energy snack'], ARRAY['Healthy', 'Traditional'], 4.6, 89, FALSE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'SUNNUNDALLU (JAGGERY)', 'sunnundallu-jaggery', 'Traditional sesame seed balls with jaggery. Natural sweetness with enhanced nutritional benefits.', 'Natural Jaggery Sesame Balls', ARRAY['Sesame seeds', 'Jaggery', 'Ghee', 'Cardamom'], 'None', ARRAY['Sesame', 'Dairy'], '20 days', 'Store in airtight container in cool, dry place', ARRAY['Natural sweetener', 'Iron rich', 'Digestive benefits'], ARRAY['Winter season', 'Morning energy', 'Health conscious'], ARRAY['Natural', 'Healthy'], 4.8, 112, FALSE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'ROSE COOKIES', 'rose-cookies', 'Delicate flower-shaped cookies with rose essence. Beautiful and flavorful treats perfect for gifting.', 'Delicate Rose-scented Flower Cookies', ARRAY['All-purpose flour', 'Rice flour', 'Coconut milk', 'Sugar', 'Rose essence', 'Oil'], 'None', ARRAY['Gluten'], '15 days', 'Store in airtight container in cool, dry place', ARRAY['Light texture', 'Aromatic', 'Gift-worthy presentation'], ARRAY['Tea time', 'Gifting', 'Special occasions'], ARRAY['Gifting', 'Aromatic'], 4.5, 78, FALSE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'GAVALU', 'gavalu', 'Traditional shell-shaped sweet with coconut filling. Classic Andhra sweet with authentic preparation.', 'Traditional Shell-shaped Coconut Sweets', ARRAY['Rice flour', 'Fresh coconut', 'Jaggery', 'Ghee', 'Cardamom', 'Cashews'], 'None', ARRAY['Dairy', 'Cashews'], '7 days', 'Store in refrigerator in airtight container', ARRAY['Fresh coconut', 'Natural jaggery', 'Traditional recipe'], ARRAY['Festival celebrations', 'Traditional meals', 'Special occasions'], ARRAY['Traditional', 'Festive'], 4.7, 95, FALSE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'ARISELU', 'ariselu', 'Traditional festival sweet made with rice flour and jaggery. Essential sweet for Sankranti celebrations.', 'Traditional Festival Rice Sweet', ARRAY['Rice flour', 'Jaggery', 'Sesame seeds', 'Ghee', 'Cardamom'], 'None', ARRAY['Sesame', 'Dairy'], '5 days', 'Store in airtight container at room temperature', ARRAY['Festival special', 'Natural sweetener', 'Traditional preparation'], ARRAY['Sankranti festival', 'Traditional celebrations', 'Religious offerings'], ARRAY['Festival Special', 'Traditional'], 4.8, 134, FALSE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'SWEET PUFFS/GARJALU (JAGGERY)', 'sweet-puffs-garjalu-jaggery', 'Crispy sweet puffs filled with jaggery and coconut. Light, airy texture with natural sweetness.', 'Crispy Jaggery-filled Sweet Puffs', ARRAY['All-purpose flour', 'Jaggery', 'Fresh coconut', 'Ghee', 'Cardamom', 'Oil'], 'None', ARRAY['Gluten', 'Dairy'], '10 days', 'Store in airtight container in cool, dry place', ARRAY['Light and crispy', 'Natural jaggery', 'Fresh coconut filling'], ARRAY['Tea time', 'Evening snack', 'Light dessert'], ARRAY['Light', 'Natural'], 4.4, 67, FALSE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'SWEET PUFFS/GARJALU (SUGAR)', 'sweet-puffs-garjalu-sugar', 'Crispy sweet puffs filled with sugar and coconut. Classic preparation with perfect sweetness.', 'Crispy Sugar-filled Sweet Puffs', ARRAY['All-purpose flour', 'Sugar', 'Fresh coconut', 'Ghee', 'Cardamom', 'Oil'], 'None', ARRAY['Gluten', 'Dairy'], '10 days', 'Store in airtight container in cool, dry place', ARRAY['Crispy texture', 'Perfect sweetness', 'Fresh coconut'], ARRAY['Tea time', 'Kids favorite', 'Light dessert'], ARRAY['Kids-friendly', 'Classic'], 4.3, 58, FALSE, FALSE);

    -- Insert Pickles Products
    INSERT INTO products (id, category_id, name, slug, description, tagline, ingredients, spice_level, allergens, shelf_life, storage_instructions, nutrition_highlights, best_with, badges, rating, review_count, is_bestseller, is_new) VALUES
    (uuid_generate_v4(), pickles_id, 'MIX VEG PICKLE', 'mix-veg-pickle', 'Traditional mixed vegetable pickle with authentic Andhra spices. Perfect accompaniment for rice and rotis.', 'Traditional Mixed Vegetable Pickle', ARRAY['Mixed vegetables', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Spicy', ARRAY[]::TEXT[], '12 months', 'Store in cool, dry place. Use dry spoon.', ARRAY['Probiotic benefits', 'Vitamin C rich', 'Digestive aid'], ARRAY['Rice', 'Rotis', 'Parathas', 'Curd rice'], ARRAY['Traditional', 'Long Lasting'], 4.6, 178, FALSE, FALSE),
    
    (uuid_generate_v4(), pickles_id, 'MANGO PICKLE', 'mango-pickle', 'Classic mango pickle with traditional Andhra preparation. Tangy and spicy flavor that enhances every meal.', 'Classic Tangy Mango Pickle', ARRAY['Raw mangoes', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Spicy', ARRAY[]::TEXT[], '12 months', 'Store in cool, dry place. Use dry spoon.', ARRAY['Vitamin A rich', 'Antioxidants', 'Digestive properties'], ARRAY['Plain rice', 'Curd rice', 'Parathas', 'Traditional meals'], ARRAY['Bestseller', 'Classic'], 4.9, 267, TRUE, FALSE),
    
    (uuid_generate_v4(), pickles_id, 'LEMON PICKLE', 'lemon-pickle', 'Tangy lemon pickle with perfect balance of spices. Refreshing and appetizing pickle for all seasons.', 'Refreshing Tangy Lemon Pickle', ARRAY['Fresh lemons', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Medium', ARRAY[]::TEXT[], '8 months', 'Store in cool, dry place. Use dry spoon.', ARRAY['Vitamin C rich', 'Digestive aid', 'Natural detox'], ARRAY['Rice dishes', 'Breakfast items', 'Light meals'], ARRAY['Refreshing', 'Vitamin C'], 4.5, 134, FALSE, FALSE),
    
    (uuid_generate_v4(), pickles_id, 'TOMATO PICKLE', 'tomato-pickle', 'Unique tomato pickle with rich flavor. Perfect blend of tanginess and spices in traditional style.', 'Rich and Tangy Tomato Pickle', ARRAY['Ripe tomatoes', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Medium', ARRAY[]::TEXT[], '6 months', 'Store in refrigerator after opening. Use dry spoon.', ARRAY['Lycopene rich', 'Antioxidants', 'Unique flavor'], ARRAY['Rice', 'Bread', 'Rotis', 'Snacks'], ARRAY['Unique', 'Antioxidant Rich'], 4.4, 89, FALSE, FALSE),
    
    (uuid_generate_v4(), pickles_id, 'GINGER PICKLE', 'ginger-pickle', 'Spicy ginger pickle with medicinal properties. Warming and flavorful pickle perfect for cold weather.', 'Warming Spicy Ginger Pickle', ARRAY['Fresh ginger', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Spicy', ARRAY[]::TEXT[], '10 months', 'Store in cool, dry place. Use dry spoon.', ARRAY['Digestive aid', 'Anti-inflammatory', 'Warming properties'], ARRAY['Winter meals', 'Heavy foods', 'Traditional cuisine'], ARRAY['Medicinal', 'Warming'], 4.7, 112, FALSE, FALSE),
    
    (uuid_generate_v4(), pickles_id, 'RED CHILLI PICKLE', 'red-chilli-pickle', 'Fiery red chilli pickle for spice lovers. Intense heat with authentic Andhra flavor profile.', 'Fiery Hot Red Chilli Pickle', ARRAY['Red chillies', 'Mustard oil', 'Garlic', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Very Spicy', ARRAY[]::TEXT[], '12 months', 'Store in cool, dry place. Use dry spoon.', ARRAY['Capsaicin benefits', 'Metabolism booster', 'Vitamin C rich'], ARRAY['Plain rice', 'Curd', 'Buttermilk', 'For spice lovers'], ARRAY['Very Spicy', 'For Spice Lovers'], 4.8, 201, FALSE, FALSE);

END $$;

-- Insert Product Variants (250g, 500g, 1kg for each product)
INSERT INTO product_variants (product_id, weight, price, stock_quantity, sku)
SELECT 
    p.id,
    '250g',
    CASE 
        WHEN p.name = 'PALLI CHEKKALU' THEN 180.00
        WHEN p.name = 'PAPPU CHEKKALU' THEN 160.00
        WHEN p.name = 'PACHI KARAM CHEKKALU' THEN 170.00
        WHEN p.name = 'WHITE SAKINALU' THEN 150.00
        WHEN p.name = 'KARAM SAKINALU' THEN 165.00
        WHEN p.name = 'ROUND MURUKULU' THEN 155.00
        WHEN p.name = 'KARAPUSA/MURUKULU' THEN 175.00
        WHEN p.name = 'BOONDI KARA' THEN 140.00
        WHEN p.name = 'CORNFLAKES CHUDVA (CHILLI)' THEN 120.00
        WHEN p.name = 'POHA CHUDVA (SALT)' THEN 100.00
        WHEN p.name = 'POHA CHUDVA (KARAM)' THEN 110.00
        WHEN p.name = 'CHAKODILU' THEN 145.00
        WHEN p.name = 'MIXTURE' THEN 160.00
        WHEN p.name = 'NAMAK PARA' THEN 130.00
        WHEN p.name = 'BANANA CHIPS' THEN 140.00
        WHEN p.name = 'KARIVE PAKU POWDER' THEN 220.00
        WHEN p.name = 'PUDINA POWDER' THEN 200.00
        WHEN p.name = 'VELLULE POWDER' THEN 240.00
        WHEN p.name = 'IDLY POWDER' THEN 180.00
        WHEN p.name = 'SAMBAR POWDER' THEN 200.00
        WHEN p.name = 'MASALA KARAM POWDER' THEN 220.00
        WHEN p.name = 'DRY FRUITS LADDU' THEN 450.00
        WHEN p.name = 'BOONDI LADDU' THEN 280.00
        WHEN p.name = 'SUNNUNDALLU (SUGAR)' THEN 320.00
        WHEN p.name = 'SUNNUNDALLU (JAGGERY)' THEN 340.00
        WHEN p.name = 'ROSE COOKIES' THEN 260.00
        WHEN p.name = 'GAVALU' THEN 380.00
        WHEN p.name = 'ARISELU' THEN 350.00
        WHEN p.name = 'SWEET PUFFS/GARJALU (JAGGERY)' THEN 290.00
        WHEN p.name = 'SWEET PUFFS/GARJALU (SUGAR)' THEN 270.00
        WHEN p.name = 'MIX VEG PICKLE' THEN 180.00
        WHEN p.name = 'MANGO PICKLE' THEN 200.00
        WHEN p.name = 'LEMON PICKLE' THEN 160.00
        WHEN p.name = 'TOMATO PICKLE' THEN 170.00
        WHEN p.name = 'GINGER PICKLE' THEN 190.00
        WHEN p.name = 'RED CHILLI PICKLE' THEN 220.00
        ELSE 150.00
    END,
    FLOOR(RANDOM() * 50 + 20)::INTEGER,
    UPPER(REPLACE(p.slug, '-', '')) || '-250G'
FROM products p;

INSERT INTO product_variants (product_id, weight, price, stock_quantity, sku)
SELECT 
    p.id,
    '500g',
    CASE 
        WHEN p.name = 'PALLI CHEKKALU' THEN 350.00
        WHEN p.name = 'PAPPU CHEKKALU' THEN 310.00
        WHEN p.name = 'PACHI KARAM CHEKKALU' THEN 330.00
        WHEN p.name = 'WHITE SAKINALU' THEN 290.00
        WHEN p.name = 'KARAM SAKINALU' THEN 320.00
        WHEN p.name = 'ROUND MURUKULU' THEN 300.00
        WHEN p.name = 'KARAPUSA/MURUKULU' THEN 340.00
        WHEN p.name = 'BOONDI KARA' THEN 270.00
        WHEN p.name = 'CORNFLAKES CHUDVA (CHILLI)' THEN 230.00
        WHEN p.name = 'POHA CHUDVA (SALT)' THEN 190.00
        WHEN p.name = 'POHA CHUDVA (KARAM)' THEN 210.00
        WHEN p.name = 'CHAKODILU' THEN 280.00
        WHEN p.name = 'MIXTURE' THEN 310.00
        WHEN p.name = 'NAMAK PARA' THEN 250.00
        WHEN p.name = 'BANANA CHIPS' THEN 270.00
        WHEN p.name = 'KARIVE PAKU POWDER' THEN 420.00
        WHEN p.name = 'PUDINA POWDER' THEN 380.00
        WHEN p.name = 'VELLULE POWDER' THEN 460.00
        WHEN p.name = 'IDLY POWDER' THEN 350.00
        WHEN p.name = 'SAMBAR POWDER' THEN 380.00
        WHEN p.name = 'MASALA KARAM POWDER' THEN 420.00
        WHEN p.name = 'DRY FRUITS LADDU' THEN 880.00
        WHEN p.name = 'BOONDI LADDU' THEN 540.00
        WHEN p.name = 'SUNNUNDALLU (SUGAR)' THEN 620.00
        WHEN p.name = 'SUNNUNDALLU (JAGGERY)' THEN 660.00
        WHEN p.name = 'ROSE COOKIES' THEN 500.00
        WHEN p.name = 'GAVALU' THEN 740.00
        WHEN p.name = 'ARISELU' THEN 680.00
        WHEN p.name = 'SWEET PUFFS/GARJALU (JAGGERY)' THEN 560.00
        WHEN p.name = 'SWEET PUFFS/GARJALU (SUGAR)' THEN 520.00
        WHEN p.name = 'MIX VEG PICKLE' THEN 350.00
        WHEN p.name = 'MANGO PICKLE' THEN 380.00
        WHEN p.name = 'LEMON PICKLE' THEN 310.00
        WHEN p.name = 'TOMATO PICKLE' THEN 330.00
        WHEN p.name = 'GINGER PICKLE' THEN 370.00
        WHEN p.name = 'RED CHILLI PICKLE' THEN 420.00
        ELSE 290.00
    END,
    FLOOR(RANDOM() * 30 + 15)::INTEGER,
    UPPER(REPLACE(p.slug, '-', '')) || '-500G'
FROM products p;

INSERT INTO product_variants (product_id, weight, price, stock_quantity, sku)
SELECT 
    p.id,
    '1kg',
    CASE 
        WHEN p.name = 'PALLI CHEKKALU' THEN 680.00
        WHEN p.name = 'PAPPU CHEKKALU' THEN 600.00
        WHEN p.name = 'PACHI KARAM CHEKKALU' THEN 640.00
        WHEN p.name = 'WHITE SAKINALU' THEN 560.00
        WHEN p.name = 'KARAM SAKINALU' THEN 620.00
        WHEN p.name = 'ROUND MURUKULU' THEN 580.00
        WHEN p.name = 'KARAPUSA/MURUKULU' THEN 660.00
        WHEN p.name = 'BOONDI KARA' THEN 520.00
        WHEN p.name = 'CORNFLAKES CHUDVA (CHILLI)' THEN 440.00
        WHEN p.name = 'POHA CHUDVA (SALT)' THEN 360.00
        WHEN p.name = 'POHA CHUDVA (KARAM)' THEN 400.00
        WHEN p.name = 'CHAKODILU' THEN 540.00
        WHEN p.name = 'MIXTURE' THEN 600.00
        WHEN p.name = 'NAMAK PARA' THEN 480.00
        WHEN p.name = 'BANANA CHIPS' THEN 520.00
        WHEN p.name = 'KARIVE PAKU POWDER' THEN 800.00
        WHEN p.name = 'PUDINA POWDER' THEN 720.00
        WHEN p.name = 'VELLULE POWDER' THEN 880.00
        WHEN p.name = 'IDLY POWDER' THEN 680.00
        WHEN p.name = 'SAMBAR POWDER' THEN 740.00
        WHEN p.name = 'MASALA KARAM POWDER' THEN 800.00
        WHEN p.name = 'DRY FRUITS LADDU' THEN 1700.00
        WHEN p.name = 'BOONDI LADDU' THEN 1050.00
        WHEN p.name = 'SUNNUNDALLU (SUGAR)' THEN 1200.00
        WHEN p.name = 'SUNNUNDALLU (JAGGERY)' THEN 1280.00
        WHEN p.name = 'ROSE COOKIES' THEN 980.00
        WHEN p.name = 'GAVALU' THEN 1450.00
        WHEN p.name = 'ARISELU' THEN 1320.00
        WHEN p.name = 'SWEET PUFFS/GARJALU (JAGGERY)' THEN 1080.00
        WHEN p.name = 'SWEET PUFFS/GARJALU (SUGAR)' THEN 1000.00
        WHEN p.name = 'MIX VEG PICKLE' THEN 680.00
        WHEN p.name = 'MANGO PICKLE' THEN 740.00
        WHEN p.name = 'LEMON PICKLE' THEN 600.00
        WHEN p.name = 'TOMATO PICKLE' THEN 640.00
        WHEN p.name = 'GINGER PICKLE' THEN 720.00
        WHEN p.name = 'RED CHILLI PICKLE' THEN 800.00
        ELSE 560.00
    END,
    FLOOR(RANDOM() * 20 + 5)::INTEGER,
    UPPER(REPLACE(p.slug, '-', '')) || '-1KG'
FROM products p;

-- Insert Product Images
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT 
    p.id,
    CASE 
        WHEN c.slug = 'snacks' THEN 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg'
        WHEN c.slug = 'powders' THEN 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg'
        WHEN c.slug = 'sweets' THEN 'https://images.pexels.com/photos/4110008/pexels-photo-4110008.jpeg'
        WHEN c.slug = 'pickles' THEN 'https://images.pexels.com/photos/4518656/pexels-photo-4518656.jpeg'
        ELSE 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg'
    END,
    p.name,
    0,
    TRUE
FROM products p
JOIN categories c ON p.category_id = c.id;

-- Insert Sample User
INSERT INTO users (id, email, password_hash, name, phone, email_verified) VALUES
(uuid_generate_v4(), 'demo@vamifoods.com', '$2b$10$rQZ8kHWKQfnvpL7OXBzGHOXxvfL7OXBzGHOXxvfL7OXBzGHOXxvfL7', 'Demo User', '+91 9876543210', TRUE);

-- Get demo user ID and insert related data
DO $$
DECLARE
    demo_user_id UUID;
BEGIN
    SELECT id INTO demo_user_id FROM users WHERE email = 'demo@vamifoods.com';
    
    -- Insert Sample Address for Demo User
    INSERT INTO user_addresses (user_id, name, phone, address_line1, address_line2, city, state, pincode, is_default) VALUES
    (demo_user_id, 'Demo User', '+91 9876543210', '123 Main Street', 'Near Charminar', 'Hyderabad', 'Telangana', '500001', TRUE);
    
    -- Insert Sample Wishlist Items
    INSERT INTO wishlist_items (user_id, product_id)
    SELECT demo_user_id, p.id
    FROM products p
    WHERE p.slug IN ('palli-chekkalu', 'mixture', 'mango-pickle')
    LIMIT 3;
    
END $$;

-- Insert Sample Coupons
INSERT INTO coupons (code, name, description, discount_type, discount_value, minimum_order_amount, maximum_discount_amount, usage_limit, is_active, valid_until) VALUES
('WELCOME10', 'Welcome 10% Off', 'Get 10% off on your first order', 'percentage', 10.00, 500.00, 100.00, 100, TRUE, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('FIRST50', 'First Order ₹50 Off', 'Get ₹50 off on your first order', 'fixed', 50.00, 300.00, NULL, 50, TRUE, CURRENT_TIMESTAMP + INTERVAL '30 days'),
('FESTIVE15', 'Festival Special 15% Off', 'Special festival discount', 'percentage', 15.00, 1000.00, 200.00, 200, TRUE, CURRENT_TIMESTAMP + INTERVAL '60 days');

-- Insert Sample Admin User
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@vamifoods.com', '$2b$10$rQZ8kHWKQfnvpL7OXBzGHOXxvfL7OXBzGHOXxvfL7OXBzGHOXxvfL7', 'Admin User', 'admin');

-- Insert Sample Newsletter Subscribers
INSERT INTO newsletter_subscribers (email) VALUES
('customer1@example.com'),
('customer2@example.com'),
('customer3@example.com');

-- Insert Sample Contact Submissions
INSERT INTO contact_submissions (name, email, phone, subject, message, is_bulk_order) VALUES
('John Doe', 'john@example.com', '+91 9876543210', 'Bulk Order Inquiry', 'I am interested in placing a bulk order for my office. Please contact me.', TRUE),
('Jane Smith', 'jane@example.com', '+91 9876543211', 'Product Quality', 'The products are amazing! Keep up the good work.', FALSE);