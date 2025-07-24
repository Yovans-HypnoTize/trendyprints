
import { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export const useProducts = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts) as Product[];
        setProducts(parsedProducts);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(parsedProducts.map(product => product.category))] as string[];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error parsing admin products:", error);
        setProducts([]);
        setCategories([]);
        toast({
          variant: "destructive",
          title: "Error loading products",
          description: "There was a problem loading the products data."
        });
      }
    } else {
      setProducts([]);
      setCategories([]);
    }
  }, [toast]);
  
  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(product => product.category === selectedCategory);
    }
    return products;
  }, [products, selectedCategory]);
  
  // Convert price strings to numbers for sorting
  const getNumericPrice = (product: Product) => {
    if (product.discountPrice) {
      return parseFloat(product.discountPrice);
    } else if (product.price) {
      return parseFloat(product.price);
    }
    return 0;
  };
  
  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return getNumericPrice(a) - getNumericPrice(b);
        case "price-high-low":
          return getNumericPrice(b) - getNumericPrice(a);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default: // featured - featured first, then new arrivals
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isNewArrival && !b.isNewArrival) return -1;
          if (!a.isNewArrival && b.isNewArrival) return 1;
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === "" ? null : category);
  };

  return {
    products: sortedProducts,
    categories,
    selectedCategory,
    sortBy,
    setSortBy,
    handleCategorySelect
  };
};
