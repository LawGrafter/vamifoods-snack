-- Common Queries for Vamifoods Ecommerce Database
-- This file contains frequently used queries for the application

-- =============================================
-- PRODUCT QUERIES
-- =============================================

-- Get all active products with their variants and primary image
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
    ) as variants
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
LEFT JOIN product_variants pv ON p.id = pv.product_id AND pv.is_active = TRUE
WHERE p.is_active = TRUE
GROUP BY p.id, p.name, p.slug, p.description, p.tagline, p.rating, p.review_count, 
         p.is_bestseller, p.is_new, c.name, c.slug, pi.image_url
ORDER BY p.created_at DESC;

-- Get product details by slug
SELECT 
    p.*,
    c.name as category_name,
    c.slug as category_slug,
    json_agg(DISTINCT pi.image_url ORDER BY pi.sort_order) as images,
    json_agg(
        DISTINCT json_build_object(
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
    ) as variants
FROM products p
JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id
LEFT JOIN product_variants pv ON p.id = pv.product_id AND pv.is_active = TRUE
WHERE p.slug = $1 AND p.is_active = TRUE
GROUP BY p.id, c.name, c.slug;

-- Search products by name or description
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
        p.name ILIKE '%' || $1 || '%' 
        OR p.description ILIKE '%' || $1 || '%'
        OR array_to_string(p.ingredients, ' ') ILIKE '%' || $1 || '%'
    )
GROUP BY p.id, p.name, p.slug, p.description, p.tagline, p.rating, c.name, pi.image_url
ORDER BY p.rating DESC, p.review_count DESC
LIMIT 10;

-- Get products by category with filters
SELECT 
    p.id,
    p.name,
    p.slug,
    p.description,
    p.tagline,
    p.rating,
    p.review_count,
    p.spice_level,
    pi.image_url as primary_image,
    MIN(pv.price) as min_price,
    MAX(pv.price) as max_price,
    SUM(pv.stock_quantity) as total_stock
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
LEFT JOIN product_variants pv ON p.id = pv.product_id AND pv.is_active = TRUE
WHERE p.is_active = TRUE
    AND ($1::UUID IS NULL OR p.category_id = $1)
    AND ($2::TEXT IS NULL OR p.spice_level = $2)
    AND ($3::DECIMAL IS NULL OR EXISTS (
        SELECT 1 FROM product_variants pv2 
        WHERE pv2.product_id = p.id AND pv2.price >= $3
    ))
    AND ($4::DECIMAL IS NULL OR EXISTS (
        SELECT 1 FROM product_variants pv2 
        WHERE pv2.product_id = p.id AND pv2.price <= $4
    ))
    AND ($5::BOOLEAN IS NULL OR $5 = FALSE OR EXISTS (
        SELECT 1 FROM product_variants pv2 
        WHERE pv2.product_id = p.id AND pv2.stock_quantity > 0
    ))
GROUP BY p.id, p.name, p.slug, p.description, p.tagline, p.rating, p.review_count, p.spice_level, pi.image_url
ORDER BY 
    CASE $6
        WHEN 'popularity' THEN p.review_count
        WHEN 'rating' THEN p.rating
        WHEN 'newest' THEN EXTRACT(EPOCH FROM p.created_at)
        ELSE p.review_count
    END DESC,
    CASE $6
        WHEN 'price-low-high' THEN MIN(pv.price)
        ELSE NULL
    END ASC,
    CASE $6
        WHEN 'price-high-low' THEN MIN(pv.price)
        ELSE NULL
    END DESC;

-- =============================================
-- CART QUERIES
-- =============================================

-- Get user's cart items
SELECT 
    ci.id,
    ci.quantity,
    p.id as product_id,
    p.name as product_name,
    p.slug as product_slug,
    pv.id as variant_id,
    pv.weight,
    pv.price,
    pi.image_url as product_image,
    (ci.quantity * pv.price) as total_price
FROM cart_items ci
JOIN products p ON ci.product_id = p.id
JOIN product_variants pv ON ci.variant_id = pv.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
WHERE ci.user_id = $1
ORDER BY ci.created_at DESC;

-- Add item to cart (upsert)
INSERT INTO cart_items (user_id, product_id, variant_id, quantity)
VALUES ($1, $2, $3, $4)
ON CONFLICT (user_id, product_id, variant_id)
DO UPDATE SET 
    quantity = cart_items.quantity + EXCLUDED.quantity,
    updated_at = CURRENT_TIMESTAMP;

-- Update cart item quantity
UPDATE cart_items 
SET quantity = $3, updated_at = CURRENT_TIMESTAMP
WHERE user_id = $1 AND id = $2;

-- Remove item from cart
DELETE FROM cart_items 
WHERE user_id = $1 AND id = $2;

-- Clear user's cart
DELETE FROM cart_items WHERE user_id = $1;

-- =============================================
-- WISHLIST QUERIES
-- =============================================

-- Get user's wishlist
SELECT 
    wi.id,
    p.id as product_id,
    p.name,
    p.slug,
    p.tagline,
    p.rating,
    p.review_count,
    pi.image_url as primary_image,
    MIN(pv.price) as min_price,
    c.name as category_name
FROM wishlist_items wi
JOIN products p ON wi.product_id = p.id
JOIN categories c ON p.category_id = c.id
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
LEFT JOIN product_variants pv ON p.id = pv.product_id AND pv.is_active = TRUE
WHERE wi.user_id = $1 AND p.is_active = TRUE
GROUP BY wi.id, p.id, p.name, p.slug, p.tagline, p.rating, p.review_count, pi.image_url, c.name
ORDER BY wi.created_at DESC;

-- Add item to wishlist
INSERT INTO wishlist_items (user_id, product_id)
VALUES ($1, $2)
ON CONFLICT (user_id, product_id) DO NOTHING;

-- Remove item from wishlist
DELETE FROM wishlist_items 
WHERE user_id = $1 AND product_id = $2;

-- Check if product is in user's wishlist
SELECT EXISTS(
    SELECT 1 FROM wishlist_items 
    WHERE user_id = $1 AND product_id = $2
);

-- =============================================
-- ORDER QUERIES
-- =============================================

-- Create new order
INSERT INTO orders (
    user_id, subtotal, shipping_cost, tax_amount, discount_amount, total_amount,
    payment_method, delivery_name, delivery_phone, delivery_address_line1,
    delivery_address_line2, delivery_city, delivery_state, delivery_pincode,
    order_notes
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
) RETURNING id, order_number;

-- Add order items
INSERT INTO order_items (
    order_id, product_id, variant_id, product_name, variant_weight,
    quantity, unit_price, total_price
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

-- Get user's orders
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.total_amount,
    o.payment_method,
    o.payment_status,
    o.tracking_number,
    o.created_at,
    o.shipped_at,
    o.delivered_at,
    COUNT(oi.id) as item_count,
    SUM(oi.quantity) as total_quantity
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.user_id = $1
GROUP BY o.id, o.order_number, o.status, o.total_amount, o.payment_method, 
         o.payment_status, o.tracking_number, o.created_at, o.shipped_at, o.delivered_at
ORDER BY o.created_at DESC;

-- Get order details with items
SELECT 
    o.*,
    json_agg(
        json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', oi.product_name,
            'variant_weight', oi.variant_weight,
            'quantity', oi.quantity,
            'unit_price', oi.unit_price,
            'total_price', oi.total_price
        ) ORDER BY oi.created_at
    ) as items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = $1 AND o.user_id = $2
GROUP BY o.id;

-- Update order status
UPDATE orders 
SET status = $2, updated_at = CURRENT_TIMESTAMP,
    shipped_at = CASE WHEN $2 = 'shipped' THEN CURRENT_TIMESTAMP ELSE shipped_at END,
    delivered_at = CASE WHEN $2 = 'delivered' THEN CURRENT_TIMESTAMP ELSE delivered_at END
WHERE id = $1;

-- =============================================
-- USER QUERIES
-- =============================================

-- Create new user
INSERT INTO users (email, password_hash, name, phone)
VALUES ($1, $2, $3, $4)
RETURNING id, email, name, phone, created_at;

-- Get user by email
SELECT id, email, password_hash, name, phone, email_verified, created_at
FROM users 
WHERE email = $1;

-- Update user profile
UPDATE users 
SET name = $2, phone = $3, updated_at = CURRENT_TIMESTAMP
WHERE id = $1;

-- Get user addresses
SELECT * FROM user_addresses 
WHERE user_id = $1 
ORDER BY is_default DESC, created_at DESC;

-- Add user address
INSERT INTO user_addresses (
    user_id, name, phone, address_line1, address_line2, 
    city, state, pincode, is_default
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING id;

-- Update address
UPDATE user_addresses 
SET name = $3, phone = $4, address_line1 = $5, address_line2 = $6,
    city = $7, state = $8, pincode = $9, is_default = $10,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $2 AND user_id = $1;

-- Delete address
DELETE FROM user_addresses 
WHERE id = $2 AND user_id = $1;

-- Set default address (unset others first)
UPDATE user_addresses SET is_default = FALSE WHERE user_id = $1;
UPDATE user_addresses SET is_default = TRUE WHERE id = $2 AND user_id = $1;

-- =============================================
-- COUPON QUERIES
-- =============================================

-- Validate coupon
SELECT 
    c.*,
    (c.usage_limit IS NULL OR c.used_count < c.usage_limit) as is_available,
    (c.valid_until IS NULL OR c.valid_until > CURRENT_TIMESTAMP) as is_valid_date
FROM coupons c
WHERE c.code = $1 AND c.is_active = TRUE;

-- Apply coupon (check if user already used it)
SELECT EXISTS(
    SELECT 1 FROM coupon_usage cu
    WHERE cu.coupon_id = $1 AND cu.user_id = $2
);

-- Record coupon usage
INSERT INTO coupon_usage (coupon_id, user_id, order_id, discount_amount)
VALUES ($1, $2, $3, $4);

-- Update coupon used count
UPDATE coupons 
SET used_count = used_count + 1 
WHERE id = $1;

-- =============================================
-- ANALYTICS QUERIES
-- =============================================

-- Get sales summary
SELECT 
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_order_value,
    COUNT(CASE WHEN status = 'delivered' THEN 1 END) as delivered_orders
FROM orders
WHERE created_at >= $1 AND created_at <= $2;

-- Get top selling products
SELECT 
    p.name,
    p.slug,
    SUM(oi.quantity) as total_sold,
    SUM(oi.total_price) as total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= $1 AND o.created_at <= $2
    AND o.status IN ('delivered', 'shipped')
GROUP BY p.id, p.name, p.slug
ORDER BY total_sold DESC
LIMIT 10;

-- Get category performance
SELECT 
    c.name as category_name,
    COUNT(DISTINCT oi.order_id) as orders_count,
    SUM(oi.quantity) as items_sold,
    SUM(oi.total_price) as revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= $1 AND o.created_at <= $2
    AND o.status IN ('delivered', 'shipped')
GROUP BY c.id, c.name
ORDER BY revenue DESC;