import React from 'react';
import { Link } from 'react-router-dom';
import { searchProducts } from '../data/products';

interface SearchSuggestionsProps {
  query: string;
  onSelect: () => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ query, onSelect }) => {
  const results = searchProducts(query).slice(0, 5);

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 p-4 z-50">
        <p className="text-gray-500 text-sm">No products found for "{query}"</p>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-1 py-2 z-50">
      {results.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.slug}`}
          className="block px-4 py-2 hover:bg-gray-50 transition-colors"
          onClick={onSelect}
        >
          <div className="flex items-center space-x-3">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-10 h-10 object-cover rounded"
            />
            <div>
              <p className="font-medium text-gray-800 text-sm">{product.name}</p>
              <p className="text-gray-500 text-xs">
                From ₹{product.variants[0].price}
              </p>
            </div>
          </div>
        </Link>
      ))}
      <div className="border-t mt-2 pt-2 px-4">
        <Link
          to={`/search?q=${encodeURIComponent(query)}`}
          className="text-[#D13F4A] text-sm hover:underline"
          onClick={onSelect}
        >
          View all results for "{query}"
        </Link>
      </div>
    </div>
  );
};

export default SearchSuggestions;