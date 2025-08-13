/*
# Common Queries for Vamifoods Ecommerce Database
Frequently used SQL queries for the application with optimized performance

## Query Categories
1. **Product Queries** - Product listing, search, filtering
2. **Cart Queries** - Shopping cart management
3. **Wishlist Queries** - User wishlist operations
4. **Order Queries** - Order management and history
5. **User Queries** - Authentication and profile management
6. **Coupon Queries** - Discount code validation
7. **Analytics Queries** - Business intelligence and reporting

## Performance Optimizations
- Proper indexing for fast lookups
- Efficient JOIN operations
- Parameterized queries for security
- Aggregation functions for analytics
*/

-- =============================================
-- PRODUCT QUERIES
-- =============================================

-- Get all active products with their variants and primary image
-- Usage: Product listing pages, search results
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

-- Get product details by slug with all related data
-- Usage: Product detail pages
CREATE OR REPLACE FUNCTION get_product_by_slug(product_slug TEXT)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    slug VARCHAR,
    description TEXT,
    tagline VARCHAR,
    ingredients TEXT[],
    spice_level VARCHAR,
    allergens TEXT[],
    shelf_life VARCHAR,
    storage_instructions TEXT,
    is_vegetarian BOOLEAN,
    nutrition_highlights TEXT[],
    best_with TEXT[],
    badges TEXT[],
    rating DECIMAL,
    review_count INTEGER,
    is_bestseller BOOLEAN,
    is_new BOOLEAN,
    category_name VARCHAR,
    category_slug VARCHAR,
    images JSON,
    variants JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.name,
        p.slug,
        p.description,
        p.tagline,
        p.ingredients,
        p.spice_level,
        p.allergens,
        p.shelf_life,
        p.storage_instructions,
        p.is_vegetarian,
        p.nutrition_highlights,
        p.best_with,
        p.badges,
        p.rating,
        p.review_count,
        p.is_bestseller,
        p.is_new,
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
    WHERE p.slug = product_slug AND p.is_active = TRUE
    GROUP BY p.id, c.name, c.slug;
END;
$$ LANGUAGE plpgsql;

-- Search products by name, description, or ingredients
-- Usage: Search functionality
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

-- =============================================
-- CART QUERIES
-- =============================================

-- Get user's cart items with product details
CREATE OR REPLACE FUNCTION get_user_cart(user_uuid UUID)
RETURNS TABLE (
    cart_item_id UUID,
    quantity INTEGER,
    product_id UUID,
    product_name VARCHAR,
    product_slug VARCHAR,
    variant_id UUID,
    variant_weight VARCHAR,
    variant_price DECIMAL,
    product_image VARCHAR,
    total_price DECIMAL,
    stock_available INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ci.id as cart_item_id,
        ci.quantity,
        p.id as product_id,
        p.name as product_name,
        p.slug as product_slug,
        pv.id as variant_id,
        pv.weight as variant_weight,
        pv.price as variant_price,
        pi.image_url as product_image,
        (ci.quantity * pv.price) as total_price,
        pv.stock_quantity as stock_available
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    JOIN product_variants pv ON ci.variant_id = pv.id
    LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
    WHERE ci.user_id = user_uuid
    ORDER BY ci.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Add or update cart item
CREATE OR REPLACE FUNCTION upsert_cart_item(
    user_uuid UUID,
    product_uuid UUID,
    variant_uuid UUID,
    item_quantity INTEGER
)
RETURNS UUID AS $$
DECLARE
    cart_item_id UUID;
BEGIN
    INSERT INTO cart_items (user_id, product_id, variant_id, quantity)
    VALUES (user_uuid, product_uuid, variant_uuid, item_quantity)
    ON CONFLICT (user_id, product_id, variant_id)
    DO UPDATE SET 
        quantity = cart_items.quantity + EXCLUDED.quantity,
        updated_at = CURRENT_TIMESTAMP
    RETURNING id INTO cart_item_id;
    
    RETURN cart_item_id;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- WISHLIST QUERIES
-- =============================================

-- Get user's wishlist with product details
CREATE OR REPLACE FUNCTION get_user_wishlist(user_uuid UUID)
RETURNS TABLE (
    wishlist_item_id UUID,
    product_id UUID,
    product_name VARCHAR,
    product_slug VARCHAR,
    tagline VARCHAR,
    rating DECIMAL,
    review_count INTEGER,
    primary_image VARCHAR,
    min_price DECIMAL,
    category_name VARCHAR,
    is_in_stock BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        wi.id as wishlist_item_id,
        p.id as product_id,
        p.name as product_name,
        p.slug as product_slug,
        p.tagline,
        p.rating,
        p.review_count,
        pi.image_url as primary_image,
        MIN(pv.price) as min_price,
        c.name as category_name,
        (SUM(pv.stock_quantity) > 0) as is_in_stock
    FROM wishlist_items wi
    JOIN products p ON wi.product_id = p.id
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_primary = TRUE
    LEFT JOIN product_variants pv ON p.id = pv.product_id AND pv.is_active = TRUE
    WHERE wi.user_id = user_uuid AND p.is_active = TRUE
    GROUP BY wi.id, p.id, p.name, p.slug, p.tagline, p.rating, p.review_count, pi.image_url, c.name
    ORDER BY wi.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ORDER QUERIES
-- =============================================

-- Create new order with items
CREATE OR REPLACE FUNCTION create_order(
    user_uuid UUID,
    order_subtotal DECIMAL,
    order_shipping DECIMAL,
    order_tax DECIMAL,
    order_discount DECIMAL,
    order_total DECIMAL,
    payment_method_name VARCHAR,
    delivery_details JSON,
    order_items JSON,
    notes TEXT DEFAULT NULL
)
RETURNS TABLE (order_id UUID, order_number VARCHAR) AS $$
DECLARE
    new_order_id UUID;
    new_order_number VARCHAR;
    item JSON;
BEGIN
    -- Insert order
    INSERT INTO orders (
        user_id, subtotal, shipping_cost, tax_amount, discount_amount, total_amount,
        payment_method, delivery_name, delivery_phone, delivery_address_line1,
        delivery_address_line2, delivery_city, delivery_state, delivery_pincode,
        order_notes
    ) VALUES (
        user_uuid, order_subtotal, order_shipping, order_tax, order_discount, order_total,
        payment_method_name, 
        delivery_details->>'name',
        delivery_details->>'phone',
        delivery_details->>'address_line1',
        delivery_details->>'address_line2',
        delivery_details->>'city',
        delivery_details->>'state',
        delivery_details->>'pincode',
        notes
    ) RETURNING id, order_number INTO new_order_id, new_order_number;
    
    -- Insert order items
    FOR item IN SELECT * FROM json_array_elements(order_items)
    LOOP
        INSERT INTO order_items (
            order_id, product_id, variant_id, product_name, variant_weight,
            quantity, unit_price, total_price
        ) VALUES (
            new_order_id,
            (item->>'product_id')::UUID,
            (item->>'variant_id')::UUID,
            item->>'product_name',
            item->>'variant_weight',
            (item->>'quantity')::INTEGER,
            (item->>'unit_price')::DECIMAL,
            (item->>'total_price')::DECIMAL
        );
    END LOOP;
    
    RETURN QUERY SELECT new_order_id, new_order_number;
END;
$$ LANGUAGE plpgsql;

-- Get user's orders with summary
CREATE OR REPLACE FUNCTION get_user_orders(user_uuid UUID)
RETURNS TABLE (
    order_id UUID,
    order_number VARCHAR,
    status VARCHAR,
    total_amount DECIMAL,
    payment_method VARCHAR,
    payment_status VARCHAR,
    tracking_number VARCHAR,
    created_at TIMESTAMPTZ,
    shipped_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    item_count BIGINT,
    total_quantity BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id as order_id,
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
    WHERE o.user_id = user_uuid
    GROUP BY o.id, o.order_number, o.status, o.total_amount, o.payment_method, 
             o.payment_status, o.tracking_number, o.created_at, o.shipped_at, o.delivered_at
    ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- COUPON QUERIES
-- =============================================

-- Validate coupon for user and order
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
-- ANALYTICS QUERIES
-- =============================================

-- Get sales summary for date range
CREATE OR REPLACE FUNCTION get_sales_summary(
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ
)
RETURNS TABLE (
    total_orders BIGINT,
    total_revenue DECIMAL,
    average_order_value DECIMAL,
    delivered_orders BIGINT,
    pending_orders BIGINT,
    cancelled_orders BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(o.total_amount), 0) as total_revenue,
        COALESCE(AVG(o.total_amount), 0) as average_order_value,
        COUNT(CASE WHEN o.status = 'delivered' THEN 1 END) as delivered_orders,
        COUNT(CASE WHEN o.status IN ('pending', 'confirmed', 'processing', 'shipped') THEN 1 END) as pending_orders,
        COUNT(CASE WHEN o.status = 'cancelled' THEN 1 END) as cancelled_orders
    FROM orders o
    WHERE o.created_at >= start_date AND o.created_at <= end_date;
END;
$$ LANGUAGE plpgsql;

-- Get top selling products
CREATE OR REPLACE FUNCTION get_top_products(
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    result_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    product_name VARCHAR,
    product_slug VARCHAR,
    total_sold BIGINT,
    total_revenue DECIMAL,
    avg_rating DECIMAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.name as product_name,
        p.slug as product_slug,
        SUM(oi.quantity) as total_sold,
        SUM(oi.total_price) as total_revenue,
        p.rating as avg_rating
    FROM order_items oi
    JOIN products p ON oi.product_id = p.id
    JOIN orders o ON oi.order_id = o.id
    WHERE o.created_at >= start_date 
        AND o.created_at <= end_date
        AND o.status IN ('delivered', 'shipped')
    GROUP BY p.id, p.name, p.slug, p.rating
    ORDER BY total_sold DESC
    LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;