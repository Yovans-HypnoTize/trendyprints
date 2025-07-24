
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from "date-fns";
import { Star, Trash2, Plus } from "lucide-react";
import { Product, ProductReview } from "@/types/product";

interface ProductReviewsModalProps {
  product: Product;
  onClose: () => void;
  onSaveReviews: (updatedProduct: Product) => void;
}

const ProductReviewsModal = ({ product, onClose, onSaveReviews }: ProductReviewsModalProps) => {
  const [reviews, setReviews] = useState<ProductReview[]>(product.reviews || []);
  const [newReview, setNewReview] = useState<Partial<ProductReview>>({
    productId: product.id,
    userName: "",
    rating: 5,
    comment: "",
    date: new Date().toISOString()
  });
  const [isAddingReview, setIsAddingReview] = useState(false);
  
  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };
  
  const handleSaveReviews = () => {
    const updatedProduct = {
      ...product,
      reviews: reviews,
      reviewCount: reviews.length,
      rating: reviews.length ? 
        parseFloat((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)) : 
        undefined
    };
    onSaveReviews(updatedProduct);
  };
  
  const handleAddReview = () => {
    if (!newReview.userName || !newReview.comment) return;
    
    const review: ProductReview = {
      id: Date.now().toString(),
      productId: product.id,
      name: newReview.userName || "Anonymous", // Set name to the same value as userName
      userName: newReview.userName || "Anonymous",
      rating: newReview.rating || 5,
      comment: newReview.comment || "",
      date: new Date().toISOString()
    };
    
    setReviews([...reviews, review]);
    setNewReview({
      productId: product.id,
      userName: "",
      rating: 5,
      comment: "",
      date: new Date().toISOString()
    });
    setIsAddingReview(false);
  };
  
  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reviews for {product.name}</DialogTitle>
          <DialogDescription>
            Manage product reviews and ratings
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">
                {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
              </h3>
              {product.rating && (
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-sm">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            
            <Button
              size="sm"
              onClick={() => setIsAddingReview(true)}
              disabled={isAddingReview}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Review
            </Button>
          </div>
          
          {isAddingReview && (
            <div className="bg-muted/40 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Add New Review</h4>
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Reviewer Name"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({...newReview, userName: e.target.value})}
                  />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <span className="mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        size={20}
                        className={`cursor-pointer ${
                          rating <= (newReview.rating || 5)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => setNewReview({...newReview, rating})}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Textarea
                    placeholder="Review comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingReview(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddReview}
                  >
                    Add Review
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {reviews.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[80px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">{review.userName}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(review.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">{review.comment}</TableCell>
                      <TableCell>{format(new Date(review.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReview(review.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md">
              <p className="text-muted-foreground">No reviews yet for this product.</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveReviews}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductReviewsModal;
