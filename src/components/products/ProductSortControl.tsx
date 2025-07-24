
import React from "react";
import { ArrowUpDown } from "lucide-react";

interface ProductSortControlProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  productCount: number;
  selectedCategory: string | null;
}

const ProductSortControl = ({ sortBy, onSortChange, productCount, selectedCategory }: ProductSortControlProps) => {
  return (
    <>
      {/* Mobile Sorting Controls */}
      <div className="flex lg:hidden gap-2 mb-4">
        <div className="relative flex-1">
          <select 
            className="w-full h-10 px-4 rounded-md border border-input bg-background appearance-none cursor-pointer"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>
          <ArrowUpDown className="absolute right-3 top-3 h-4 w-4 pointer-events-none" />
        </div>
      </div>
      
      {/* Desktop Sorting Controls */}
      <div className="hidden lg:flex justify-between items-center mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {productCount} products
          {selectedCategory ? ` in ${selectedCategory}` : ''}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select 
            className="h-9 px-3 rounded-md border border-input bg-background"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Best Rating</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ProductSortControl;
