import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ChevronRight, 
  Star, 
  Truck, 
  Info, 
  Check,
  Box,
  Share2,
  Upload
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CustomizationEditor from "@/components/CustomizationEditor";
import { Product } from "@/types/product";

const productCatalog = [
  {
    id: "1",
    name: "Custom T-Shirt",
    price: "499",
    discountPrice: "399",
    discount: "20% OFF",
    rating: 4.5,
    reviewCount: 128,
    description: "Experience comfort and style with our Pure Cotton T-Shirt. Crafted from premium-quality cotton, this t-shirt offers a perfect blend of sophistication and casual appeal. Customize it with your own design or choose from our pre-designed collection.",
    features: [
      "100% Pure Cotton material",
      "Customizable design",
      "Comfortable fit",
      "Breathable fabric",
      "Easy to maintain",
      "Available in multiple colors"
    ],
    colors: ["Black", "White", "Navy Blue", "Grey", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      material: "100% Cotton",
      fit: "Regular Fit",
      care: "Machine wash cold, tumble dry low",
      model: "Model is 6'0\" and wearing size M"
    },
    specifications: [
      { name: "Material", value: "100% Pure Cotton" },
      { name: "Pattern", value: "Customizable" },
      { name: "Fit", value: "Regular Fit" },
      { name: "Sleeve", value: "Short Sleeve" },
      { name: "Collar", value: "Regular Collar" },
      { name: "Care", value: "Machine Wash" }
    ],
    printingOptions: [
      "Front",
      "Back",
      "Sleeve",
      "Custom"
    ],
    customizationOptions: {
      allowCustomText: true,
      allowCustomImage: true,
      allowColorChange: true,
      templates: ["Template 1", "Template 2"],
      blankTemplates: {
        "White": "/lovable-uploads/deb1594e-d5e5-46ea-a0fe-a56611df9d78.png",
        "Black": "/lovable-uploads/b8ec29c5-fd5e-4ee1-a6dc-c7f0582d81bd.png"
      },
      textColors: ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF"],
      defaultTextColor: "#000000",
      maxTextLength: 100,
      defaultFontFamily: "Arial",
      fontFamilies: ["Arial", "Helvetica", "Times New Roman", "Courier New"],
      printPositions: ["Front", "Back", "Sleeve", "Custom"]
    },
    category: "T-Shirt",
    isCustomizable: true
  },
  {
    id: "2",
    name: "Custom Mug",
    price: "299",
    discountPrice: "249",
    discount: "17% OFF",
    rating: 4.7,
    reviewCount: 86,
    description: "Our premium quality mugs are perfect for your morning coffee or tea. Made from high-grade ceramic with a glossy finish, they're both microwave and dishwasher safe. Customize with your favorite photo, quote, or design for a personal touch.",
    features: [
      "High-grade ceramic material",
      "Customizable design",
      "Dishwasher and microwave safe",
      "Capacity: 330ml",
      "Durable and long-lasting",
      "Available in white, black, and color-changing options"
    ],
    colors: ["White", "Black", "Color-changing"],
    sizes: ["Standard (330ml)"],
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577937927133-3a236afa7a90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525513453391-1817b73715a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509042239860-f190347c6975?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ],
    details: {
      material: "Ceramic",
      capacity: "330ml",
      care: "Dishwasher and microwave safe",
      dimensions: "8cm x 9.5cm"
    },
    specifications: [
      { name: "Material", value: "Ceramic" },
      { name: "Capacity", value: "330ml" },
      { name: "Microwave Safe", value: "Yes" },
      { name: "Dishwasher Safe", value: "Yes" },
      { name: "Dimensions", value: "8cm x 9.5cm" },
      { name: "Print Method", value: "Sublimation" }
    ],
    printingOptions: [
      "Full wrap-around design",
      "One-sided print",
      "Two-sided print",
      "Handle print"
    ],
    category: "Mug",
    isCustomizable: true,
    customizationOptions: {
      allowCustomText: true,
      allowCustomImage: true,
      blankTemplates: {
        "White": "/lovable-uploads/9b11d210-6348-4cc6-adf3-bf047266cfcd.png",
        "Black": "/lovable-uploads/3ae24929-302f-4f83-b70d-29b4c5df9484.png"
      },
      printPositions: ["Front", "Back", "Side"]
    }
  }
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldCustomize = location.search.includes('customize=true');
  
  const [product, setProduct] = useState<Product | null>(null);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);
  const [showCustomizePanel, setShowCustomizePanel] = useState(false);
  const [customizedPreview, setCustomizedPreview] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    setAdminProducts(storedProducts);
    console.log(storedProducts)
    
    const adminProduct = storedProducts.find((p: Product) => p.id === id);
    
    if (adminProduct) {
      setProduct(adminProduct);
      
      const defaultColor = adminProduct.colors ? adminProduct.colors[0] : 'Default';
      setSelectedColor(defaultColor);
      setSelectedSize(adminProduct.sizes ? adminProduct.sizes[0] : 'M');
      setSelectedPosition(adminProduct.printingOptions ? adminProduct.printingOptions[0] : 'Front');
      
      updateImagesForColor(adminProduct, defaultColor);
    } else {
      const catalogProduct = productCatalog.find(p => p.id === id) || productCatalog[0];
      setProduct(catalogProduct as Product);
      const defaultColor = catalogProduct.colors ? catalogProduct.colors[0] : 'Default';
      setSelectedColor(defaultColor);
      setSelectedSize(catalogProduct.sizes[0]);
      setSelectedPosition(catalogProduct.printingOptions[0]);
      
      updateImagesForColor(catalogProduct as Product, defaultColor);
    }
    
    if (shouldCustomize) {
      setShowCustomizePanel(true);
    }
  }, [id, shouldCustomize]);
  
  const updateImagesForColor = (product: Product, color: string) => {
    if (product.colorImages && product.colorImages[color] && product.colorImages[color].length > 0) {
      const colorImages = product.colorImages[color];
      setProductImages(colorImages);
      setMainImage(colorImages[0]);
    } else {
      const defaultImages = product.images || [product.image];
      setProductImages(defaultImages);
      setMainImage(defaultImages[0]);
    }
  };

  useEffect(() => {
    if (product && selectedColor) {
      updateImagesForColor(product, selectedColor);
    }
  }, [product, selectedColor]);

  const handleProceedToCustomize = () => {
    if (!product?.isCustomizable) {
      toast({
        title: "Not customizable",
        description: `This product doesn't support customization`,
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Product selected",
      description: `You've selected ${product.name} in ${selectedColor}, size ${selectedSize}`,
    });
    setShowCustomizePanel(true);
  };

  const getBlankTemplateImage = () => {
    if (product?.customizationOptions?.blankTemplates?.[selectedColor]) {
      return product.customizationOptions.blankTemplates[selectedColor];
    }
    
    if (product?.category === "T-Shirt") {
      const blankTemplates = {
        "White": "/lovable-uploads/deb1594e-d5e5-46ea-a0fe-a56611df9d78.png",
        "Black": "/lovable-uploads/b8ec29c5-fd5e-4ee1-a6dc-c7f0582d81bd.png"
      };
      return blankTemplates[selectedColor] || blankTemplates["White"];
    } else if (product?.category === "Mug") {
      const blankTemplates = {
        "White": "/lovable-uploads/9b11d210-6348-4cc6-adf3-bf047266cfcd.png",
        "Black": "/lovable-uploads/3ae24929-302f-4f83-b70d-29b4c5df9484.png"
      };
      return blankTemplates[selectedColor] || blankTemplates["White"];
    }
    
    return mainImage || product?.image || "";
  };
  
  const handleSaveCustomization = (customizedImage: string, customText?: string, printPosition?: string) => {
    setCustomizedPreview(customizedImage);
    setShowCustomizePanel(false);
    
    if (customText) {
      setCustomMessage(customText);
    }
    
    if (printPosition) {
      setSelectedPosition(printPosition);
    }
    
    toast({
      title: "Customization saved",
      description: "Your design has been applied to the product"
    });
  };

  const handleShareOnWhatsApp = () => {
    if (!customizedPreview && !customMessage) {
      toast({
        title: "Customization required",
        description: "Please customize your product before ordering",
        variant: "destructive"
      });
      return;
    }
    
    const message = encodeURIComponent(
      `Hello! I'd like to order:\n\n` +
      `Product: ${product?.name}\n` +
      `Color: ${selectedColor}\n` +
      `Size: ${selectedSize}\n` +
      `Quantity: ${quantity}\n` +
      `Print Position: ${selectedPosition}\n` +
      `Message: ${customMessage}\n\n` +
      `Please contact me for the custom design and payment details.`
    );
    
    window.open(`https://wa.me/?text=${message}`, '_blank');
    
    toast({
      title: "Order initiated",
      description: "WhatsApp has been opened with your order details",
    });
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading product...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">{product.name}</span>
      </div>

      {!showCustomizePanel ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-muted/20">
              <img
                src={customizedPreview || mainImage}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-opacity duration-300"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!customizedPreview) {
                      setMainImage(image);
                    }
                  }}
                  className={`aspect-square overflow-hidden rounded-md bg-muted/20 ${
                    mainImage === image && !customizedPreview ? "ring-2 ring-primary" : ""
                  } ${customizedPreview ? "opacity-50" : ""}`}
                  disabled={!!customizedPreview}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{product.name}</h1>
            
            <div className="flex items-center mt-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 4)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < (product.rating || 4)
                        ? "text-yellow-400 fill-yellow-400 half-star"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                ({product.reviewCount || 0} reviews)
              </span>
            </div>

            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold text-foreground">
                ₹{product.discountPrice || product.price?.replace("Starting from ₹", "") || "499"}
              </span>
              {product.price && product.discountPrice && (
                <>
                  <span className="ml-2 text-lg line-through text-muted-foreground">₹{product.price}</span>
                  <span className="ml-2 text-sm text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                    {product.discount || "10% OFF"}
                  </span>
                </>
              )}
            </div>

            <div className="mt-4 p-3 bg-muted/30 rounded-md">
              <div className="flex">
                <Info className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Available Offers:</p>
                  <ul className="text-sm text-muted-foreground mt-1">
                    {product.offers && product.offers.length > 0 ? (
                      product.offers.map((offer, index) => (
                        <li key={index} className="flex items-start mt-1">
                          <Check className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{offer}</span>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start mt-1">
                          <Check className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Special Price: Get extra 10% off (price inclusive of discount)</span>
                        </li>
                        <li className="flex items-start mt-1">
                          <Check className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
                          <span>Free shipping on all orders above ₹499</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {product.colors && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-foreground mb-3">Color: <span className="text-muted-foreground">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setCustomizedPreview(null);
                      }}
                      className={`px-3 py-1 border rounded-md transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-medium text-foreground">Size: <span className="text-muted-foreground">{selectedSize}</span></h3>
                  {product.id === "1" && (
                    <button className="text-sm text-primary hover:underline">Size Guide</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] h-10 border rounded-md flex items-center justify-center transition-colors ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-sm font-medium text-foreground mb-3">Quantity:</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 border border-border rounded-l-md flex items-center justify-center text-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="h-10 w-16 border-y border-border text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 border border-border rounded-r-md flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {product.isCustomizable && (
                <Button 
                  onClick={handleProceedToCustomize} 
                  size="lg" 
                  className="w-full"
                  disabled={customizedPreview !== null}
                >
                  {customizedPreview ? "Already Customized" : "Customize"}
                </Button>
              )}
              
              {customizedPreview && (
                <Button 
                  onClick={handleShareOnWhatsApp} 
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Place Order via WhatsApp
                </Button>
              )}
              
              {customizedPreview && (
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    setCustomizedPreview(null);
                    setShowCustomizePanel(true);
                  }}
                >
                  Modify Customization
                </Button>
              )}
              
              {!product.isCustomizable && (
                <Button 
                  size="lg"
                  className="w-full"
                >
                  Add to Cart
                </Button>
              )}
              
              <Button variant="outline" size="lg" className="w-full flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>

            <div className="mt-6 p-4 border border-border rounded-md">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground">Delivery Options:</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enter your pincode to check delivery time and availability
                  </p>
                  <div className="flex mt-2">
                    <input
                      type="text"
                      placeholder="Enter Pincode"
                      className="px-3 py-1.5 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button variant="default" className="rounded-l-none">Check</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Design Your {product.name}</h2>
          {product && (
            <CustomizationEditor 
              product={product}
              backgroundImage={getBlankTemplateImage()} 
              onSave={handleSaveCustomization}
            />
          )}
        </div>
      )}

      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-muted-foreground leading-relaxed">
            <p className="mb-4">{product.description || "This is a premium quality product that can be customized with your own designs."}</p>
            <h3 className="text-foreground font-medium mt-6 mb-3">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {(product.features || [
                "High-quality materials",
                "Customizable design",
                "Multiple color options",
                "Comfortable fit",
                "Durable and long-lasting"
              ]).map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="specifications">
            <div className="border rounded-md overflow-hidden">
              {(product.specifications || [
                { name: "Material", value: "Premium Quality" },
                { name: "Pattern", value: "Customizable" },
                { name: "Care", value: "Machine Wash" }
              ]).map((spec: {name: string, value: string}, index: number) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-2 p-4 ${index % 2 === 0 ? 'bg-muted/20' : 'bg-background'}`}
                >
                  <div className="font-medium text-foreground">{spec.name}</div>
                  <div className="text-muted-foreground">{spec.value}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <div className="text-center py-8">
              <h3 className="text-xl font-medium mb-2">Customer Reviews</h3>
              <div className="flex justify-center items-center mb-4">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 4)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < (product.rating || 4)
                          ? "text-yellow-400 fill-yellow-400 half-star"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating || "4.5"} out of 5</span>
              </div>
              <p className="text-muted-foreground mb-6">Based on {product.reviewCount || 0} reviews</p>
              <Button>Write a Review</Button>
              
              <div className="mt-12 text-left">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{review.userName}</div>
                          <div className="text-sm text-muted-foreground">{review.date}</div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">Reviews will appear here</p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long does customization take?</AccordionTrigger>
            <AccordionContent>
              Our customization process typically takes 2-3 business days. After that, your order will be shipped and delivered based on your location.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What file formats do you accept for custom designs?</AccordionTrigger>
            <AccordionContent>
              We accept JPG, PNG, SVG, and PDF files for custom designs. For best results, please ensure your image has a resolution of at least 300 DPI.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you offer bulk orders for corporate events?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer special pricing for bulk orders. Please contact us directly for a quote if you need more than 10 items with the same design.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is the return policy for customized products?</AccordionTrigger>
            <AccordionContent>
              Since customized products are made specifically for you, we cannot accept returns unless there is a defect in the product. Please review your design carefully before finalizing your order.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...adminProducts, ...productCatalog]
            .filter(p => p.id !== id)
            .slice(0, 4)
            .map((relatedProduct) => (
            <div key={relatedProduct.id} className="border border-border rounded-lg overflow-hidden group">
              <Link to={`/products/${relatedProduct.id}`}>
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <span className="font-medium text-foreground">
                        ₹{relatedProduct.discountPrice || relatedProduct.price?.replace("Starting from ₹", "") || "499"}
                      </span>
                      {relatedProduct.discountPrice && (
                        <span className="text-xs line-through text-muted-foreground ml-1">
                          ₹{relatedProduct.price}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs ml-1">{relatedProduct.rating || "4.5"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
