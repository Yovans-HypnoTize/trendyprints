
import HeroSection from "@/components/products/HeroSection";
import CategoryFilter from "@/components/products/CategoryFilter";
import ProductSortControl from "@/components/products/ProductSortControl";
import ProductsGrid from "@/components/products/ProductsGrid";
import ProductInfoCards from "@/components/products/ProductInfoCards";
import Breadcrumb from "@/components/products/Breadcrumb";
import { useProducts } from "@/hooks/useProducts";

const ProductsPage = () => {
  const { 
    products, 
    categories, 
    selectedCategory, 
    sortBy, 
    setSortBy, 
    handleCategorySelect 
  } = useProducts();
  
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Products" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Category Pills */}
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategorySelect={handleCategorySelect} 
      />
      
      {/* Sort Controls */}
      <ProductSortControl 
        sortBy={sortBy} 
        onSortChange={setSortBy} 
        productCount={products.length}
        selectedCategory={selectedCategory}
      />
      
      {/* Products Grid */}
      <ProductsGrid 
        products={products} 
        selectedCategory={selectedCategory}
        onClearFilter={() => handleCategorySelect("")}
      />
      
      {/* Info Cards */}
      <ProductInfoCards />
    </div>
  );
};

export default ProductsPage;
