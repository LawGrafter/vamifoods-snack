import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: searchParams.get('priceRange') || '',
    inStock: searchParams.get('inStock') === 'true',
    sortBy: searchParams.get('sortBy') || 'popularity'
  });

  // Update URL when filters change
  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    const params = new URLSearchParams();
    Object.entries(updatedFilters).forEach(([key, value]) => {
      if (value && value !== false) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const minPrice = Math.min(...product.variants.map(v => v.price));
        return minPrice >= min && minPrice <= max;
      });
    }



    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => 
        product.variants.some(v => v.stock > 0)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low-high':
        filtered.sort((a, b) => 
          Math.min(...a.variants.map(v => v.price)) - 
          Math.min(...b.variants.map(v => v.price))
        );
        break;
      case 'price-high-low':
        filtered.sort((a, b) => 
          Math.min(...b.variants.map(v => v.price)) - 
          Math.min(...a.variants.map(v => v.price))
        );
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: '',
      inStock: false,
      sortBy: 'popularity'
    });
    setSearchParams({});
  };

  const activeFilterCount = Object.values(filters).filter(value => 
    value && value !== false && value !== 'popularity'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-container py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Shop All Products
          </h1>
          <p className="text-gray-600">
            Discover our complete range of authentic Hyderabadi foods
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 bg-[#D13F4A] text-white text-xs px-2 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#D13F4A] hover:underline"
                  disabled={activeFilterCount === 0}
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        checked={filters.category === ''}
                        onChange={(e) => updateFilters({ category: e.target.value })}
                        className="text-[#D13F4A] focus:ring-[#D13F4A]"
                      />
                      <span className="ml-2 text-sm text-gray-600">All Categories</span>
                    </label>
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={filters.category === category.id}
                          onChange={(e) => updateFilters({ category: e.target.value })}
                          className="text-[#D13F4A] focus:ring-[#D13F4A]"
                        />
                        <span className="ml-2 text-sm text-gray-600">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'All Prices', value: '' },
                      { label: 'Under ₹150', value: '0-150' },
                      { label: '₹150 - ₹300', value: '150-300' },
                      { label: '₹300 - ₹500', value: '300-500' },
                      { label: 'Above ₹500', value: '500-9999' }
                    ].map(range => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange"
                          value={range.value}
                          checked={filters.priceRange === range.value}
                          onChange={(e) => updateFilters({ priceRange: e.target.value })}
                          className="text-[#D13F4A] focus:ring-[#D13F4A]"
                        />
                        <span className="ml-2 text-sm text-gray-600">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>



                {/* Availability */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Availability</h4>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => updateFilters({ inStock: e.target.checked })}
                      className="text-[#D13F4A] focus:ring-[#D13F4A]"
                    />
                    <span className="ml-2 text-sm text-gray-600">In Stock Only</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Toggle & Sort */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="bg-[#D13F4A] text-white text-xs px-2 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products
                </span>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#D13F4A]"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  No products found matching your criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-[#D13F4A] hover:bg-[#B8363F] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;