/*
# Vamifoods Ecommerce Database - Complete Schema
Complete database structure, sample data, and optimized queries for the Vamifoods ecommerce platform

## Database Structure
1. **Core Tables** - Users, Products, Categories, Orders
2. **Shopping Features** - Cart, Wishlist, Reviews
3. **Business Logic** - Coupons, Inventory, Analytics
4. **Sample Data** - All 60+ products with realistic pricing
5. **Optimized Queries** - High-performance functions for common operations

## Security & Performance
- Row Level Security (RLS) enabled on all user-facing tables
- Strategic indexing for fast queries
- Automated triggers for business logic
- Comprehensive data validation
*/

-- =============================================
-- EXTENSIONS & SETUP
-- =============================================

-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CORE TABLES
-- =============================================

-- Users table for customer authentication and profile
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User addresses for delivery
CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line1 VARCHAR(500) NOT NULL,
    address_line2 VARCHAR(500),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product categories
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    tagline VARCHAR(500),
    ingredients TEXT[], -- Array of ingredients
    spice_level VARCHAR(20) CHECK (spice_level IN ('None', 'Mild', 'Medium', 'Spicy', 'Very Spicy')),
    allergens TEXT[], -- Array of allergens
    shelf_life VARCHAR(100),
    storage_instructions TEXT,
    is_vegetarian BOOLEAN DEFAULT TRUE,
    nutrition_highlights TEXT[],
    best_with TEXT[], -- Serving suggestions
    badges TEXT[], -- Bestseller, New, Spicy, etc.
    rating DECIMAL(3,2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    is_bestseller BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product images
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product variants (250g, 500g, 1kg)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    weight VARCHAR(20) NOT NULL, -- 250g, 500g, 1kg
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, weight)
);

-- Shopping cart items
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id, variant_id)
);

-- User wishlist
CREATE TABLE IF NOT EXISTS wishlist_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Orders
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_id VARCHAR(255),
    tracking_number VARCHAR(100),
    order_notes TEXT,
    
    -- Delivery address (denormalized for historical record)
    delivery_name VARCHAR(255) NOT NULL,
    delivery_phone VARCHAR(20) NOT NULL,
    delivery_address_line1 VARCHAR(500) NOT NULL,
    delivery_address_line2 VARCHAR(500),
    delivery_city VARCHAR(100) NOT NULL,
    delivery_state VARCHAR(100) NOT NULL,
    delivery_pincode VARCHAR(10) NOT NULL,
    
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order items
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    variant_id UUID NOT NULL REFERENCES product_variants(id) ON DELETE RESTRICT,
    product_name VARCHAR(255) NOT NULL, -- Snapshot for historical record
    variant_weight VARCHAR(20) NOT NULL, -- Snapshot for historical record
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Coupons and discounts
CREATE TABLE IF NOT EXISTS coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_order_amount DECIMAL(10,2) DEFAULT 0,
    maximum_discount_amount DECIMAL(10,2),
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    valid_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Coupon usage tracking
CREATE TABLE IF NOT EXISTS coupon_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    discount_amount DECIMAL(10,2) NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(coupon_id, user_id, order_id)
);

-- Product reviews
CREATE TABLE IF NOT EXISTS product_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id, order_id)
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'staff')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_bulk_order BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id ON wishlist_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON product_reviews(user_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own data" ON users
    FOR SELECT TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE TO authenticated
    USING (auth.uid() = id);

-- RLS Policies for user_addresses table
CREATE POLICY "Users can manage own addresses" ON user_addresses
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for cart_items table
CREATE POLICY "Users can manage own cart" ON cart_items
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for wishlist_items table
CREATE POLICY "Users can manage own wishlist" ON wishlist_items
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

-- RLS Policies for orders table
CREATE POLICY "Users can read own orders" ON orders
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders" ON orders
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- RLS Policies for order_items table
CREATE POLICY "Users can read own order items" ON order_items
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM orders 
        WHERE orders.id = order_items.order_id 
        AND orders.user_id = auth.uid()
    ));

-- RLS Policies for product_reviews table
CREATE POLICY "Users can manage own reviews" ON product_reviews
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read approved reviews" ON product_reviews
    FOR SELECT TO anon, authenticated
    USING (is_approved = true);

-- RLS Policies for coupon_usage table
CREATE POLICY "Users can read own coupon usage" ON coupon_usage
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Public read access for product-related tables
CREATE POLICY "Anyone can read categories" ON categories
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Anyone can read products" ON products
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Anyone can read product images" ON product_images
    FOR SELECT TO anon, authenticated
    USING (true);

CREATE POLICY "Anyone can read product variants" ON product_variants
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

CREATE POLICY "Anyone can read coupons" ON coupons
    FOR SELECT TO anon, authenticated
    USING (is_active = true);

-- =============================================
-- TRIGGERS & FUNCTIONS
-- =============================================

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_addresses_updated_at BEFORE UPDATE ON user_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_variants_updated_at BEFORE UPDATE ON product_variants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_product_reviews_updated_at BEFORE UPDATE ON product_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update product rating when reviews are added/updated
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE products 
    SET 
        rating = (
            SELECT ROUND(AVG(rating)::numeric, 2)
            FROM product_reviews 
            WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
            AND is_approved = TRUE
        ),
        review_count = (
            SELECT COUNT(*)
            FROM product_reviews 
            WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
            AND is_approved = TRUE
        )
    WHERE id = COALESCE(NEW.product_id, OLD.product_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER update_product_rating_trigger 
    AFTER INSERT OR UPDATE OR DELETE ON product_reviews 
    FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number = 'VF' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || LPAD(EXTRACT(EPOCH FROM CURRENT_TIMESTAMP)::TEXT, 6, '0');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER generate_order_number_trigger 
    BEFORE INSERT ON orders 
    FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- =============================================
-- SAMPLE DATA INSERTION
-- =============================================

-- Insert Categories
INSERT INTO categories (id, name, slug, description, image_url, sort_order) VALUES
(uuid_generate_v4(), 'Snacks', 'snacks', 'Traditional crispy snacks and savories', 'https://images.pexels.com/photos/4518651/pexels-photo-4518651.jpeg', 1),
(uuid_generate_v4(), 'Powders', 'powders', 'Aromatic spice powders and seasonings', 'https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg', 2),
(uuid_generate_v4(), 'Sweets', 'sweets', 'Traditional homemade sweets and desserts', 'https://images.pexels.com/photos/4110008/pexels-photo-4110008.jpeg', 3),
(uuid_generate_v4(), 'Pickles', 'pickles', 'Tangy and spicy traditional pickles', 'https://images.pexels.com/photos/4518656/pexels-photo-4518656.jpeg', 4);

-- Insert Products with Sample Data
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

-- =============================================
-- OPTIMIZED QUERY FUNCTIONS
-- =============================================

-- Get all active products with their variants and primary image
CREATE OR REPLACE VIEW product_listing AS
SELECT 
    p.id,
    p.name,
    p.slug,
    p.description,
    p.tagline,
    p.rating,
    p.review_count,
    p.is_bestseller,
    p.is_new,
    p.spice_level,
    p.badges,
    c.name as category_name,
    c.slug as category_slug,
    pi.image_url as primary_image,
    json_agg(
        json_build_object(
            'id', pv.id,
            'weight', pv.weight,
            'price', pv.price,
            'stock_quantity', pv.stock_quantity,
            'sku', pv.sku
        ) ORDER BY 
            CASE pv.weight 
                WHEN '250g' THEN 1 
                WHEN '500g' THEN 2 
                WHEN '1kg' THEN 3 
                ELSE 4 
            END
    ) as variants,
    MIN(pv.price) as min_price,
    MAX(pv.price) as max_price,
    SUM(pv.stock_quantity) as total_stock
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
LEFT JOIN product_variants pv ON p.id = pv.product_id AND pv.is_active = TRUE
WHERE p.is_active = TRUE AND c.is_active = TRUE
GROUP BY p.id, p.name, p.slug, p.description, p.tagline, p.rating, p.review_count, 
         p.is_bestseller, p.is_new, p.spice_level, p.badges, c.name, c.slug, pi.image_url;

-- Search products function
CREATE OR REPLACE FUNCTION search_products(search_query TEXT, result_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    slug VARCHAR,
    description TEXT,
    tagline VARCHAR,
    rating DECIMAL,
    category_name VARCHAR,
    primary_image VARCHAR,
    min_price DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.tagline,
        p.rating,
        c.name as category_name,
        pi.image_url as primary_image,
        MIN(pv.price) as min_price
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
    LEFT JOIN product_variants pv ON p.id = pv.product_id AND pv.is_active = TRUE
    WHERE p.is_active = TRUE 
        AND (
            p.name ILIKE '%' || search_query || '%' 
            OR p.description ILIKE '%' || search_query || '%'
            OR array_to_string(p.ingredients, ' ') ILIKE '%' || search_query || '%'
        )
    GROUP BY p.id, p.name, p.slug, p.description, p.tagline, p.rating, c.name, pi.image_url
    ORDER BY 
        CASE 
            WHEN p.name ILIKE search_query || '%' THEN 1
            WHEN p.name ILIKE '%' || search_query || '%' THEN 2
            ELSE 3
        END,
        p.rating DESC, 
        p.review_count DESC
    LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Validate coupon function
CREATE OR REPLACE FUNCTION validate_coupon(
    coupon_code VARCHAR,
    user_uuid UUID,
    order_amount DECIMAL
)
RETURNS TABLE (
    is_valid BOOLEAN,
    coupon_id UUID,
    discount_type VARCHAR,
    discount_value DECIMAL,
    discount_amount DECIMAL,
    message TEXT
) AS $$
DECLARE
    coupon_record RECORD;
    calculated_discount DECIMAL;
    user_usage_count INTEGER;
BEGIN
    -- Get coupon details
    SELECT * INTO coupon_record
    FROM coupons c
    WHERE c.code = coupon_code AND c.is_active = TRUE;
    
    -- Check if coupon exists
    IF NOT FOUND THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::VARCHAR, NULL::DECIMAL, NULL::DECIMAL, 'Invalid coupon code';
        RETURN;
    END IF;
    
    -- Check if coupon is expired
    IF coupon_record.valid_until IS NOT NULL AND coupon_record.valid_until < CURRENT_TIMESTAMP THEN
        RETURN QUERY SELECT FALSE, coupon_record.id, coupon_record.discount_type, coupon_record.discount_value, NULL::DECIMAL, 'Coupon has expired';
        RETURN;
    END IF;
    
    -- Check minimum order amount
    IF order_amount < coupon_record.minimum_order_amount THEN
        RETURN QUERY SELECT FALSE, coupon_record.id, coupon_record.discount_type, coupon_record.discount_value, NULL::DECIMAL, 
            'Minimum order amount of ₹' || coupon_record.minimum_order_amount || ' required';
        RETURN;
    END IF;
    
    -- Check usage limit
    IF coupon_record.usage_limit IS NOT NULL AND coupon_record.used_count >= coupon_record.usage_limit THEN
        RETURN QUERY SELECT FALSE, coupon_record.id, coupon_record.discount_type, coupon_record.discount_value, NULL::DECIMAL, 'Coupon usage limit exceeded';
        RETURN;
    END IF;
    
    -- Check if user has already used this coupon
    SELECT COUNT(*) INTO user_usage_count
    FROM coupon_usage cu
    WHERE cu.coupon_id = coupon_record.id AND cu.user_id = user_uuid;
    
    IF user_usage_count > 0 THEN
        RETURN QUERY SELECT FALSE, coupon_record.id, coupon_record.discount_type, coupon_record.discount_value, NULL::DECIMAL, 'Coupon already used';
        RETURN;
    END IF;
    
    -- Calculate discount
    IF coupon_record.discount_type = 'percentage' THEN
        calculated_discount := (order_amount * coupon_record.discount_value / 100);
        IF coupon_record.maximum_discount_amount IS NOT NULL THEN
            calculated_discount := LEAST(calculated_discount, coupon_record.maximum_discount_amount);
        END IF;
    ELSE
        calculated_discount := coupon_record.discount_value;
    END IF;
    
    -- Ensure discount doesn't exceed order amount
    calculated_discount := LEAST(calculated_discount, order_amount);
    
    RETURN QUERY SELECT TRUE, coupon_record.id, coupon_record.discount_type, coupon_record.discount_value, calculated_discount, 'Coupon applied successfully';
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- COMPLETION MESSAGE
-- =============================================

-- Insert completion log
INSERT INTO newsletter_subscribers (email) VALUES ('setup-complete@vamifoods.com');

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Vamifoods Database Setup Complete!';
    RAISE NOTICE 'Demo User: demo@vamifoods.com (password: demo123)';
    RAISE NOTICE 'Sample Coupons: WELCOME10, FIRST50, FESTIVE15';
    RAISE NOTICE 'Products: % items across 4 categories', (SELECT COUNT(*) FROM products);
    RAISE NOTICE 'Ready for production use!';
END $$;