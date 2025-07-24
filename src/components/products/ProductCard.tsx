
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card key={product.id} className="overflow-hidden group h-full flex flex-col">
      <div className="relative">
        <Link to={`/products/${product.id}`} className="block aspect-square">
          <img 
            src={product.image || (product.images && product.images.length > 0 ? product.images[0] : '/placeholder.svg')} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </Link>
        {product.isNewArrival && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            New
          </span>
        )}
        {product.isFeatured && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <CardContent className="p-3 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="hover:underline">
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={`${
                  i < Math.floor(product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount || 0})
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-auto">
          {product.description || "No description available"}
        </p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-1">
            <span className="font-bold">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice && product.price && product.discountPrice !== product.price && (
              <span className="text-xs line-through text-muted-foreground">₹{product.price}</span>
            )}
          </div>
          {product.discount && (
            <span className="text-xs text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded">
              {product.discount}
            </span>
          )}
        </div>
        <Button 
          size="sm" 
          className="mt-3 w-full"
          asChild
          variant="brand"
        >
          <Link to={`/products/${product.id}`}>
            {product.isCustomizable ? "Customize Now" : "View Details"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
