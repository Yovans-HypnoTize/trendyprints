
export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductReview {
  id: string;
  name: string; // Original property
  userName: string; // Added property being used in components
  rating: number;
  comment: string;
  date: string;
  productId?: string; // Added property being used in ProductReviewsModal
}

export interface CustomizationOptions {
  printPositions: string[];
  blankTemplates: { [position: string]: string };
  colorBlankTemplates?: { [color: string]: { [position: string]: string } };
}

export interface Product {
  id: string;
  name: string;
  price: string;
  actualPrice?: string;
  discountPrice?: string; // Added property for discount price
  discount?: string; // Added property for discount percentage/text
  shippingCost?: string;
  discountAmount?: string;
  description?: string;
  category: string;
  image: string;
  images?: string[];
  colorImages?: { [color: string]: string[] };
  colors?: string[];
  sizes?: string[];
  features?: string[];
  specifications?: ProductSpecification[];
  rating?: number;
  reviewCount?: number;
  reviews?: ProductReview[];
  isVisibleOnHomepage?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isCustomizable?: boolean;
  customizationOptions?: CustomizationOptions;
  offers?: string[];
  isFeatured?: boolean; // Added property for featured products
  isNewArrival?: boolean; // Added property for new arrivals
  printingOptions?: string[]; // Added property for printing options
}
