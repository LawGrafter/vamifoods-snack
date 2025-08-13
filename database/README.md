# Vamifoods Database Documentation

## Overview
This directory contains the complete SQL database schema and migrations for the Vamifoods ecommerce platform. The database is designed for PostgreSQL with Supabase and includes comprehensive ecommerce functionality.

## Database Structure

### Core Tables

#### Users & Authentication
- **users** - Customer accounts and authentication
- **user_addresses** - Customer delivery addresses
- **admin_users** - Admin panel access control

#### Product Management
- **categories** - Product categories (Snacks, Powders, Sweets, Pickles)
- **products** - Main product information with ingredients, spice levels, etc.
- **product_images** - Product image gallery
- **product_variants** - Size variants (250g, 500g, 1kg) with individual pricing
- **product_reviews** - Customer reviews and ratings

#### Shopping & Orders
- **cart_items** - Shopping cart functionality
- **wishlist_items** - Customer wishlist
- **orders** - Order management with status tracking
- **order_items** - Individual order line items

#### Marketing & Promotions
- **coupons** - Discount codes and promotions
- **coupon_usage** - Coupon usage tracking
- **newsletter_subscribers** - Email marketing list

#### Support & Communication
- **contact_submissions** - Contact form and bulk order inquiries

## Migration Files

### 1. `20250109140000_create_vamifoods_schema.sql`
**Main database schema creation**
- Creates all tables with proper relationships
- Sets up indexes for performance optimization
- Implements Row Level Security (RLS) policies
- Creates triggers for automatic timestamp updates
- Includes functions for order number generation and rating calculations

### 2. `20250109140100_insert_sample_data.sql`
**Sample data population**
- Inserts all 4 product categories
- Creates 60+ products across all categories
- Generates product variants with realistic pricing
- Adds sample users, addresses, and coupons
- Includes demo data for testing

### 3. `20250109140200_common_queries.sql`
**Optimized query functions**
- Product listing and search functions
- Cart management operations
- Wishlist functionality
- Order creation and management
- Coupon validation logic
- Analytics and reporting queries

## Key Features

### Security
- **Row Level Security (RLS)** enabled on all user-facing tables
- **Comprehensive policies** for data access control
- **Secure authentication** integration with Supabase Auth
- **Input validation** through database constraints

### Performance
- **Strategic indexing** on frequently queried columns
- **Optimized JOIN operations** for complex queries
- **Efficient aggregation** functions for analytics
- **Parameterized queries** for security and performance

### Business Logic
- **Automatic order numbering** with unique identifiers
- **Real-time rating calculations** when reviews are added
- **Inventory tracking** per product variant
- **Coupon validation** with usage limits and expiration
- **Order status tracking** with timestamps

## Product Data Structure

### Categories
1. **Snacks** - Traditional crispy snacks and savories
2. **Powders** - Aromatic spice powders and seasonings  
3. **Sweets** - Traditional homemade sweets and desserts
4. **Pickles** - Tangy and spicy traditional pickles

### Product Variants
Each product includes three size variants:
- **250g** - Entry-level pricing
- **500g** - Mid-tier value option
- **1kg** - Bulk pricing for families

### Pricing Structure
Realistic pricing based on:
- Product category and complexity
- Ingredient costs and preparation time
- Market positioning (premium traditional foods)
- Volume discounts for larger sizes

## Usage Examples

### Get Product Listing
```sql
SELECT * FROM product_listing 
WHERE category_slug = 'snacks' 
ORDER BY rating DESC;
```

### Search Products
```sql
SELECT * FROM search_products('palli', 5);
```

### Get User Cart
```sql
SELECT * FROM get_user_cart('user-uuid-here');
```

### Validate Coupon
```sql
SELECT * FROM validate_coupon('WELCOME10', 'user-uuid', 500.00);
```

### Create Order
```sql
SELECT * FROM create_order(
    'user-uuid',
    450.00, -- subtotal
    50.00,  -- shipping
    90.00,  -- tax
    45.00,  -- discount
    545.00, -- total
    'UPI',
    '{"name": "John Doe", "phone": "+91 9876543210", "address_line1": "123 Main St", "city": "Hyderabad", "state": "Telangana", "pincode": "500001"}'::json,
    '[{"product_id": "uuid", "variant_id": "uuid", "product_name": "PALLI CHEKKALU", "variant_weight": "250g", "quantity": 2, "unit_price": 180.00, "total_price": 360.00}]'::json
);
```

## Deployment

### With Supabase
1. Connect your project to Supabase
2. Run migrations in order:
   ```bash
   supabase db push
   ```

### Manual PostgreSQL Setup
1. Create a new PostgreSQL database
2. Enable UUID extension: `CREATE EXTENSION "uuid-ossp";`
3. Run migration files in numerical order
4. Set up authentication and RLS policies

## Environment Variables

Required environment variables for application integration:
```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-database-connection-string
```

## Testing Data

### Demo User Account
- **Email**: demo@vamifoods.com
- **Password**: demo123 (hashed in database)
- **Features**: Sample address, wishlist items, order history

### Sample Coupons
- **WELCOME10** - 10% off first order (min ₹500)
- **FIRST50** - ₹50 off first order (min ₹300)
- **FESTIVE15** - 15% off festival special (min ₹1000)

### Admin Account
- **Email**: admin@vamifoods.com
- **Role**: admin
- **Access**: Full backend management

## Maintenance

### Regular Tasks
- Monitor query performance and optimize indexes
- Clean up expired coupons and old cart items
- Update product ratings when new reviews are added
- Archive old orders and maintain data retention policies

### Backup Strategy
- Daily automated backups of all data
- Point-in-time recovery capability
- Regular backup restoration testing
- Separate backups for user data and product catalog

## Support

For database-related issues:
1. Check migration logs for errors
2. Verify RLS policies are correctly applied
3. Monitor query performance with EXPLAIN ANALYZE
4. Review indexes for optimal query execution

This database schema provides a solid foundation for a production-ready ecommerce platform with all the features needed for the Vamifoods business requirements.