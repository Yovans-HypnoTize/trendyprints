
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Edit, 
  Eye, 
  Trash2, 
  Star, 
  Calendar 
} from "lucide-react";
import { Product } from "@/types/product";
import { format } from "date-fns";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onViewReviews: (id: string) => void;
  onToggleVisibility: (id: string, isVisible: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductList = ({ 
  products, 
  onEdit, 
  onDelete, 
  onView, 
  onViewReviews,
  onToggleVisibility,
  currentPage,
  totalPages,
  onPageChange
}: ProductListProps) => {
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const calculatePrice = (product: Product) => {
    const actualPrice = parseFloat(product.actualPrice || '0');
    const shippingCost = parseFloat(product.shippingCost || '0');
    const discountAmount = parseFloat(product.discountAmount || '0');
    
    return product.price || `₹${actualPrice + shippingCost - discountAmount}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} className="flex flex-col">
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={product.images && product.images.length > 0 ? product.images[0] : product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              {product.isNewArrival && (
                <Badge className="absolute top-2 left-2 bg-primary">New</Badge>
              )}
              {product.isFeatured && (
                <Badge className="absolute top-2 right-2 bg-amber-500">Featured</Badge>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <Switch 
                  checked={product.isVisibleOnHomepage ?? true}
                  onCheckedChange={(checked) => onToggleVisibility(product.id, checked)}
                  aria-label="Toggle homepage visibility"
                />
              </div>
              <CardDescription className="flex justify-between">
                <span>₹{calculatePrice(product)}</span>
                <span>{product.category}</span>
              </CardDescription>
              {product.rating && (
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviewCount || 0})
                  </span>
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              
              {product.colors && product.colors.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Available Colors:</p>
                  <div className="flex flex-wrap gap-1">
                    {product.colors.map((color, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 text-xs bg-muted rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-3">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Created: {formatDate(product.createdAt || new Date().toISOString())}</span>
                </div>
                {product.updatedAt && (
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Updated: {formatDate(product.updatedAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => onEdit(product)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => onView(product.id)}
                >
                  <Eye className="h-4 w-4 mr-1" /> View
                </Button>
              </div>
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewReviews(product.id)}
                >
                  <Eye className="h-4 w-4 mr-1" /> Reviews
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  className="flex-1"
                  onClick={() => onDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {products.length === 0 && (
          <div className="text-center py-12 col-span-full">
            <p className="text-muted-foreground">No products found. Add some products to get started.</p>
          </div>
        )}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Only show current page, first, last, and pages immediately around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                (page === 2 && currentPage > 3) ||
                (page === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProductList;
