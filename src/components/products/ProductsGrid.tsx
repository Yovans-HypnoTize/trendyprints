
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductsGridProps {
  products: Product[];
  selectedCategory: string | null;
  onClearFilter: () => void;
}

const ProductsGrid = ({ products, selectedCategory, onClearFilter }: ProductsGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/20 rounded-lg">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-4">
          {selectedCategory 
            ? `We couldn't find any products in the '${selectedCategory}' category.`
            : 'No products have been added yet. Please check back later or visit the admin dashboard to add products.'}
        </p>
        {selectedCategory && (
          <Button onClick={onClearFilter} variant="brand">
            View All Products
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;
