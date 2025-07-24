import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductList from "@/components/admin/ProductList";
import AddProductForm from "@/components/admin/AddProductForm";
import EditProductModal from "@/components/admin/EditProductModal";
import AdminProfile from "@/components/admin/AdminProfile";
import ChangePassword from "@/components/admin/ChangePassword";
import ProductReviewsModal from "@/components/admin/ProductReviewsModal";
import AdminNav from "@/components/admin/AdminNav";
import { Product } from "@/types/product";

const ITEMS_PER_PAGE = 6;

const AdminDashboard = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the active tab from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const tabFromUrl = queryParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabFromUrl || "profile");

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Update URL when tab changes
  useEffect(() => {
    navigate(`/admin/dashboard?tab=${activeTab}`, { replace: true });
  }, [activeTab, navigate]);

  // Update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = queryParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    // Load products from localStorage or use initial products if none exist
    const storedProducts = localStorage.getItem("adminProducts");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts([]);
      localStorage.setItem("adminProducts", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    // Filter products based on search, category, and dates
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter((product) => {
        const createdAt = new Date(product.createdAt || new Date());
        return createdAt >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((product) => {
        const createdAt = new Date(product.createdAt || new Date());
        return createdAt <= end;
      });
    }

    setFilteredProducts(filtered);
    // Calculate total pages
    setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
    // Reset to page 1 when filters change
    setCurrentPage(1);
  }, [products, searchTerm, categoryFilter, startDate, endDate]);

  useEffect(() => {
    // Paginate the filtered products
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
    setDisplayedProducts(paginatedProducts);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    // Save products to localStorage whenever they change
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (product: Product) => {
    // Add timestamps
    const now = new Date().toISOString();
    const newProduct = {
      ...product,
      createdAt: now,
      updatedAt: now,
    };

    setProducts([...products, newProduct]);
    toast({
      title: "Product added",
      description: `${product.name} has been added successfully`,
    });
    setActiveTab("products");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (updatedProduct: Product) => {
    // Update the timestamp
    const now = new Date().toISOString();
    const productWithTimestamp = {
      ...updatedProduct,
      updatedAt: now,
    };

    setProducts(
      products.map((p) =>
        p.id === productWithTimestamp.id ? productWithTimestamp : p
      )
    );
    setEditingProduct(null);
    toast({
      title: "Product updated",
      description: `${updatedProduct.name} has been updated successfully`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been removed",
    });
  };

  const handleViewProduct = (id: string) => {
    window.open(`/products/${id}`, "_blank");
  };

  const handleViewReviews = (id: string) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      setReviewProduct(product);
    }
  };

  const handleToggleVisibility = (id: string, isVisible: boolean) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, isVisibleOnHomepage: isVisible };
        }
        return product;
      })
    );

    toast({
      title: `Product ${isVisible ? "shown" : "hidden"}`,
      description: `Product will ${
        isVisible ? "now appear" : "no longer appear"
      } on the homepage`,
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStartDate("");
    setEndDate("");
  };

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  // Render the content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <AdminProfile />;
      case "change-password":
        return <ChangePassword />;
      case "add-product":
        return <AddProductForm onAddProduct={handleAddProduct} />;
      case "products":
      default:
        return (
          <>
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 flex-grow">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    placeholder="Start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span>to</span>
                  <Input
                    type="date"
                    placeholder="End date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <Button variant="outline" onClick={handleClearFilters}>
                  Clear Filters
                </Button>

                <Button onClick={() => setActiveTab("add-product")}>
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </div>
            </div>

            <ProductList
              products={displayedProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onView={handleViewProduct}
              onViewReviews={handleViewReviews}
              onToggleVisibility={handleToggleVisibility}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-6">
        {/* Vertical Navigation */}
        <div className="w-64 flex-shrink-0">
          <AdminNav />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Modals */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onSave={handleSaveEdit}
          onCancel={() => setEditingProduct(null)}
        />
      )}

      {reviewProduct && (
        <ProductReviewsModal
          product={reviewProduct}
          onClose={() => setReviewProduct(null)}
          onSaveReviews={(updatedProduct) => {
            setProducts(
              products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p
              )
            );
            setReviewProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
