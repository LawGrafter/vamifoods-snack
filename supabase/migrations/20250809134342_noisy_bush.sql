-- Sample Data for Vamifoods Ecommerce Database
-- This file contains sample data to populate the database for testing

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
    
    (uuid_generate_v4(), snacks_id, 'MIXTURE', 'mixture', 'Classic South Indian mixture with variety of ingredients. Perfect blend of textures and flavors in every bite.', 'Classic Mixed Snacks Variety', ARRAY['Sev', 'Peanuts', 'Curry leaves', 'Cashews', 'Raisins', 'Various spices', 'Salt', 'Oil'], 'Medium', ARRAY['Peanuts', 'Cashews'], '30 days', 'Store in airtight container in cool, dry place', ARRAY['Variety of textures', 'Mixed nutrients', 'Classic taste'], ARRAY['Tea', 'Coffee', 'Any time snack'], ARRAY['Bestseller', 'Classic'], 4.8, 245, TRUE, FALSE);

    -- Insert Powders Products
    INSERT INTO products (id, category_id, name, slug, description, tagline, ingredients, spice_level, allergens, shelf_life, storage_instructions, nutrition_highlights, best_with, badges, rating, review_count, is_bestseller, is_new) VALUES
    (uuid_generate_v4(), powders_id, 'IDLY POWDER', 'idly-powder', 'Classic South Indian powder perfect for idlis and dosas. Authentic blend of lentils and spices.', 'Classic South Indian Breakfast Powder', ARRAY['Urad dal', 'Chana dal', 'Red chilli', 'Sesame seeds', 'Cumin', 'Asafoetida', 'Salt'], 'Medium', ARRAY['Sesame'], '6 months', 'Store in airtight container in cool, dry place', ARRAY['Protein rich', 'Traditional recipe', 'Authentic taste'], ARRAY['Idli', 'Dosa', 'Uttapam', 'Plain rice'], ARRAY['Bestseller', 'Traditional'], 4.8, 234, TRUE, FALSE),
    
    (uuid_generate_v4(), powders_id, 'SAMBAR POWDER', 'sambar-powder', 'Authentic sambar masala with perfect spice balance. Essential ingredient for traditional South Indian sambar.', 'Authentic Sambar Masala Blend', ARRAY['Coriander seeds', 'Red chilli', 'Fenugreek', 'Cumin', 'Black pepper', 'Turmeric', 'Asafoetida'], 'Medium', ARRAY[]::TEXT[], '8 months', 'Store in airtight container in cool, dry place', ARRAY['Perfect spice blend', 'Traditional recipe', 'Authentic flavor'], ARRAY['Sambar', 'Rasam', 'Vegetable curries', 'Dal'], ARRAY['Bestseller', 'Authentic'], 4.9, 189, TRUE, FALSE);

    -- Insert Sweets Products
    INSERT INTO products (id, category_id, name, slug, description, tagline, ingredients, spice_level, allergens, shelf_life, storage_instructions, nutrition_highlights, best_with, badges, rating, review_count, is_bestseller, is_new) VALUES
    (uuid_generate_v4(), sweets_id, 'DRY FRUITS LADDU', 'dry-fruits-laddu', 'Premium laddus made with assorted dry fruits and nuts. Rich, nutritious, and perfectly sweet.', 'Premium Mixed Dry Fruit Balls', ARRAY['Almonds', 'Cashews', 'Dates', 'Raisins', 'Pistachios', 'Ghee', 'Cardamom'], 'None', ARRAY['Nuts', 'Dairy'], '15 days', 'Store in airtight container in cool place', ARRAY['High protein', 'Rich in healthy fats', 'Natural sweetness'], ARRAY['Festival celebrations', 'Gift item', 'Energy boost'], ARRAY['Premium', 'Festive'], 4.9, 156, TRUE, FALSE),
    
    (uuid_generate_v4(), sweets_id, 'BOONDI LADDU', 'boondi-laddu', 'Traditional gram flour laddus with perfect sweetness. Classic Indian sweet for all occasions.', 'Traditional Gram Flour Sweet Balls', ARRAY['Gram flour', 'Sugar', 'Ghee', 'Cardamom', 'Cashews', 'Raisins'], 'None', ARRAY['Dairy', 'Cashews'], '10 days', 'Store in airtight container in cool place', ARRAY['Traditional recipe', 'Protein source', 'Festival favorite'], ARRAY['Tea', 'Milk', 'Special occasions'], ARRAY['Traditional', 'Popular'], 4.7, 201, FALSE, FALSE);

    -- Insert Pickles Products
    INSERT INTO products (id, category_id, name, slug, description, tagline, ingredients, spice_level, allergens, shelf_life, storage_instructions, nutrition_highlights, best_with, badges, rating, review_count, is_bestseller, is_new) VALUES
    (uuid_generate_v4(), pickles_id, 'MANGO PICKLE', 'mango-pickle', 'Classic mango pickle with traditional Andhra preparation. Tangy and spicy flavor that enhances every meal.', 'Classic Tangy Mango Pickle', ARRAY['Raw mangoes', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Spicy', ARRAY[]::TEXT[], '12 months', 'Store in cool, dry place. Use dry spoon.', ARRAY['Vitamin A rich', 'Antioxidants', 'Digestive properties'], ARRAY['Plain rice', 'Curd rice', 'Parathas', 'Traditional meals'], ARRAY['Bestseller', 'Classic'], 4.9, 267, TRUE, FALSE),
    
    (uuid_generate_v4(), pickles_id, 'MIX VEG PICKLE', 'mix-veg-pickle', 'Traditional mixed vegetable pickle with authentic Andhra spices. Perfect accompaniment for rice and rotis.', 'Traditional Mixed Vegetable Pickle', ARRAY['Mixed vegetables', 'Mustard oil', 'Red chilli powder', 'Turmeric', 'Fenugreek', 'Mustard seeds', 'Salt'], 'Spicy', ARRAY[]::TEXT[], '12 months', 'Store in cool, dry place. Use dry spoon.', ARRAY['Probiotic benefits', 'Vitamin C rich', 'Digestive aid'], ARRAY['Rice', 'Rotis', 'Parathas', 'Curd rice'], ARRAY['Traditional', 'Long Lasting'], 4.6, 178, FALSE, FALSE);

END $$;

-- Insert Product Variants (250g, 500g, 1kg for each product)
INSERT INTO product_variants (product_id, weight, price, stock_quantity, sku)
SELECT 
    p.id,
    '250g',
    CASE 
        WHEN p.name = 'PALLI CHEKKALU' THEN 180.00
        WHEN p.name = 'PAPPU CHEKKALU' THEN 160.00
        WHEN p.name = 'MIXTURE' THEN 160.00
        WHEN p.name = 'IDLY POWDER' THEN 180.00
        WHEN p.name = 'SAMBAR POWDER' THEN 200.00
        WHEN p.name = 'DRY FRUITS LADDU' THEN 450.00
        WHEN p.name = 'BOONDI LADDU' THEN 280.00
        WHEN p.name = 'MANGO PICKLE' THEN 200.00
        WHEN p.name = 'MIX VEG PICKLE' THEN 180.00
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
        WHEN p.name = 'MIXTURE' THEN 310.00
        WHEN p.name = 'IDLY POWDER' THEN 350.00
        WHEN p.name = 'SAMBAR POWDER' THEN 380.00
        WHEN p.name = 'DRY FRUITS LADDU' THEN 880.00
        WHEN p.name = 'BOONDI LADDU' THEN 540.00
        WHEN p.name = 'MANGO PICKLE' THEN 380.00
        WHEN p.name = 'MIX VEG PICKLE' THEN 350.00
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
        WHEN p.name = 'MIXTURE' THEN 600.00
        WHEN p.name = 'IDLY POWDER' THEN 680.00
        WHEN p.name = 'SAMBAR POWDER' THEN 740.00
        WHEN p.name = 'DRY FRUITS LADDU' THEN 1700.00
        WHEN p.name = 'BOONDI LADDU' THEN 1050.00
        WHEN p.name = 'MANGO PICKLE' THEN 740.00
        WHEN p.name = 'MIX VEG PICKLE' THEN 680.00
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

-- Get demo user ID
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

-- Insert Sample Contact Submission
INSERT INTO contact_submissions (name, email, phone, subject, message, is_bulk_order) VALUES
('John Doe', 'john@example.com', '+91 9876543210', 'Bulk Order Inquiry', 'I am interested in placing a bulk order for my office. Please contact me.', TRUE),
('Jane Smith', 'jane@example.com', '+91 9876543211', 'Product Quality', 'The products are amazing! Keep up the good work.', FALSE);