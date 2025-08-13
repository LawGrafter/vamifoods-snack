@@ .. @@
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
 
+-- =============================================
+-- DATABASE CREATION
+-- =============================================
+
+-- Create the vamifoods database
+CREATE DATABASE IF NOT EXISTS vamifoods;
+
+-- Connect to the vamifoods database
+\c vamifoods;
+
 -- =============================================
 -- EXTENSIONS & SETUP
 -- =============================================