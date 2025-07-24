
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ImagePlus, Upload, Trash2, X, Star, Plus, Image, PaintBucket } from "lucide-react";
import { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

interface EditProductModalProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onCancel: () => void;
}

const CATEGORIES = [
  "T-Shirt",
  "Mug",
  "Bottle",
  "Mouse Pad",
  "Keychain",
  "Bag"
];

const COLORS = [
  "White",
  "Black",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Pink",
  "Orange",
  "Gray"
];

const SIZES = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL"
];

const PRINT_POSITIONS = {
  "T-Shirt": ["Front", "Back", "Sleeve", "Custom"],
  "Mug": ["Front", "Back", "Side"],
  "Bottle": ["Front", "Back", "Side"],
  "Keychain": [],
  "Mouse Pad": [],
  "Bag": ["Front", "Back", "Side"]
};

const EditProductModal = ({ product, onSave, onCancel }: EditProductModalProps) => {
  const [editedProduct, setEditedProduct] = useState<Product>({ 
    ...product,
    images: product.images || [product.image],
    colorImages: product.colorImages || {},
    actualPrice: product.actualPrice || product.price,
    shippingCost: product.shippingCost || "0",
    discountAmount: product.discountAmount || "0",
    offers: product.offers || [],
    isCustomizable: product.isCustomizable ?? true,
    customizationOptions: product.customizationOptions || {
      printPositions: [],
      blankTemplates: {},
      colorBlankTemplates: {}
    }
  });
  const [newFeature, setNewFeature] = useState("");
  const [newOffer, setNewOffer] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newSizeName, setNewSizeName] = useState("");
  const [selectedColors, setSelectedColors] = useState<string[]>(product.colors || []);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(product.sizes || []);
  const [customizationImages, setCustomizationImages] = useState<{ [position: string]: string }>(
    product.customizationOptions?.blankTemplates || {}
  );
  const [colorCustomizationImages, setColorCustomizationImages] = useState<{ 
    [color: string]: { [position: string]: string } 
  }>(product.customizationOptions?.colorBlankTemplates || {});
  const [activeColorTab, setActiveColorTab] = useState<string | null>(null);
  const [activeCustomizationTab, setActiveCustomizationTab] = useState<string | null>(null);

  useEffect(() => {
    if (selectedColors.length > 0 && !activeColorTab) {
      setActiveColorTab(selectedColors[0]);
    } else if (selectedColors.length === 0) {
      setActiveColorTab(null);
    } else if (activeColorTab && !selectedColors.includes(activeColorTab)) {
      setActiveColorTab(selectedColors[0]);
    }
    
    if (selectedColors.length > 0 && !activeCustomizationTab) {
      setActiveCustomizationTab(selectedColors[0]);
    } else if (selectedColors.length === 0) {
      setActiveCustomizationTab(null);
    } else if (activeCustomizationTab && !selectedColors.includes(activeCustomizationTab)) {
      setActiveCustomizationTab(selectedColors[0]);
    }
  }, [selectedColors, activeColorTab, activeCustomizationTab]);

  useEffect(() => {
    if (editedProduct.category) {
      // Set available print positions based on category
      const printPositions = PRINT_POSITIONS[editedProduct.category as keyof typeof PRINT_POSITIONS] || [];
      if (!editedProduct.customizationOptions) {
        setEditedProduct(prev => ({
          ...prev,
          customizationOptions: {
            printPositions,
            blankTemplates: customizationImages,
            colorBlankTemplates: colorCustomizationImages
          }
        }));
      } else if (!editedProduct.customizationOptions.printPositions) {
        setEditedProduct(prev => ({
          ...prev,
          customizationOptions: {
            ...prev.customizationOptions,
            printPositions,
            blankTemplates: customizationImages,
            colorBlankTemplates: colorCustomizationImages
          }
        }));
      }
    }
  }, [editedProduct.category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "category") {
      // Update print positions based on category
      const printPositions = PRINT_POSITIONS[value as keyof typeof PRINT_POSITIONS] || [];
      
      setEditedProduct(prev => ({
        ...prev,
        [name]: value,
        customizationOptions: {
          ...prev.customizationOptions,
          printPositions
        }
      }));
    } else {
      setEditedProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const newImage = event.target.result as string;
          
          // Add to images array if we have less than 4 images
          if ((editedProduct.images?.length || 0) < 4) {
            setEditedProduct(prev => ({
              ...prev,
              images: [...(prev.images || []), newImage],
              // Set as main image if none exists
              image: prev.image || newImage
            }));
          }
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleColorImageUpload = (color: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const newImage = event.target.result as string;
          
          setEditedProduct(prev => {
            const colorImages = prev.colorImages || {};
            
            if (!colorImages[color]) {
              colorImages[color] = [];
            }
            
            // Add to color images array if we have less than 4 images for this color
            if (colorImages[color].length < 4) {
              colorImages[color] = [...colorImages[color], newImage];
            }
            
            return {
              ...prev,
              colorImages
            };
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleCustomizationImageUpload = (position: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const newImage = event.target.result as string;
          const updatedImages = { ...customizationImages, [position]: newImage };
          
          setCustomizationImages(updatedImages);
          
          // Update the editedProduct with new customization images
          setEditedProduct(prev => ({
            ...prev,
            customizationOptions: {
              ...prev.customizationOptions,
              blankTemplates: updatedImages
            }
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleColorCustomizationImageUpload = (color: string, position: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const newImage = event.target.result as string;
          
          setColorCustomizationImages(prev => {
            const updatedImages = { ...prev };
            if (!updatedImages[color]) {
              updatedImages[color] = {};
            }
            updatedImages[color][position] = newImage;
            return updatedImages;
          });
          
          // Update the editedProduct with new color customization images
          setEditedProduct(prev => {
            const updatedCustomOptions = {...prev.customizationOptions};
            if (!updatedCustomOptions.colorBlankTemplates) {
              updatedCustomOptions.colorBlankTemplates = {};
            }
            if (!updatedCustomOptions.colorBlankTemplates[color]) {
              updatedCustomOptions.colorBlankTemplates[color] = {};
            }
            updatedCustomOptions.colorBlankTemplates[color][position] = newImage;
            
            return {
              ...prev,
              customizationOptions: updatedCustomOptions
            };
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const removeImage = (index: number) => {
    setEditedProduct(prev => {
      const updatedImages = [...(prev.images || [])];
      updatedImages.splice(index, 1);
      
      // If we're removing the main image, set the first remaining image as main
      let updatedMainImage = prev.image;
      if (prev.images && prev.images[index] === prev.image) {
        updatedMainImage = updatedImages.length > 0 ? updatedImages[0] : "";
      }
      
      return {
        ...prev,
        images: updatedImages,
        image: updatedMainImage
      };
    });
  };
  
  const removeColorImage = (color: string, index: number) => {
    setEditedProduct(prev => {
      const colorImages = { ...prev.colorImages };
      if (colorImages[color]) {
        const updatedImages = [...colorImages[color]];
        updatedImages.splice(index, 1);
        colorImages[color] = updatedImages;
      }
      
      return {
        ...prev,
        colorImages
      };
    });
  };
  
  const removeCustomizationImage = (position: string) => {
    const updatedImages = { ...customizationImages };
    delete updatedImages[position];
    
    setCustomizationImages(updatedImages);
    
    // Update the editedProduct with new customization images
    setEditedProduct(prev => ({
      ...prev,
      customizationOptions: {
        ...prev.customizationOptions,
        blankTemplates: updatedImages
      }
    }));
  };
  
  const removeColorCustomizationImage = (color: string, position: string) => {
    setColorCustomizationImages(prev => {
      const updatedImages = { ...prev };
      if (updatedImages[color]) {
        delete updatedImages[color][position];
      }
      return updatedImages;
    });
    
    // Update the editedProduct with new color customization images
    setEditedProduct(prev => {
      const updatedCustomOptions = {...prev.customizationOptions};
      if (updatedCustomOptions.colorBlankTemplates && updatedCustomOptions.colorBlankTemplates[color]) {
        delete updatedCustomOptions.colorBlankTemplates[color][position];
      }
      
      return {
        ...prev,
        customizationOptions: updatedCustomOptions
      };
    });
  };
  
  const setAsMainImage = (index: number) => {
    if (editedProduct.images && editedProduct.images[index]) {
      setEditedProduct(prev => ({
        ...prev,
        image: prev.images![index]
      }));
    }
  };

  const handleCustomizableChange = (checked: boolean) => {
    setEditedProduct(prev => ({
      ...prev,
      isCustomizable: checked
    }));
  };

  const handleVisibilityChange = (checked: boolean) => {
    setEditedProduct(prev => ({
      ...prev,
      isVisibleOnHomepage: checked
    }));
  };

  const handleColorToggle = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
      setEditedProduct(prev => ({
        ...prev,
        colors: prev.colors?.filter(c => c !== color)
      }));
      
      // If we removed the active color tab, set a new one
      if (activeColorTab === color) {
        const remainingColors = selectedColors.filter(c => c !== color);
        setActiveColorTab(remainingColors.length > 0 ? remainingColors[0] : null);
      }
    } else {
      setSelectedColors([...selectedColors, color]);
      setEditedProduct(prev => ({
        ...prev,
        colors: [...(prev.colors || []), color]
      }));
      
      // If this is our first color, make it the active tab
      if (!activeColorTab) {
        setActiveColorTab(color);
      }
    }
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
      setEditedProduct(prev => ({
        ...prev,
        sizes: prev.sizes?.filter(s => s !== size)
      }));
    } else {
      setSelectedSizes([...selectedSizes, size]);
      setEditedProduct(prev => ({
        ...prev,
        sizes: [...(prev.sizes || []), size]
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setEditedProduct(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setEditedProduct(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  const addOffer = () => {
    if (newOffer.trim()) {
      setEditedProduct(prev => ({
        ...prev,
        offers: [...(prev.offers || []), newOffer.trim()]
      }));
      setNewOffer("");
    }
  };

  const removeOffer = (index: number) => {
    setEditedProduct(prev => ({
      ...prev,
      offers: prev.offers?.filter((_, i) => i !== index)
    }));
  };
  
  const updateRating = (rating: number) => {
    setEditedProduct(prev => ({
      ...prev,
      rating
    }));
  };
  
  const calculateTotalPrice = () => {
    const actualPrice = parseFloat(editedProduct.actualPrice || '0');
    const shippingCost = parseFloat(editedProduct.shippingCost || '0');
    const discountAmount = parseFloat(editedProduct.discountAmount || '0');
    
    return (actualPrice + shippingCost - discountAmount).toFixed(2);
  };

  const handleSave = () => {
    const totalPrice = calculateTotalPrice();
    
    // Update the price based on calculations
    const updatedProduct = {
      ...editedProduct,
      price: totalPrice,
      customizationOptions: {
        ...editedProduct.customizationOptions,
        blankTemplates: customizationImages,
        colorBlankTemplates: colorCustomizationImages
      }
    };
    
    onSave(updatedProduct);
  };

  const activePositions = editedProduct.category 
    ? PRINT_POSITIONS[editedProduct.category as keyof typeof PRINT_POSITIONS] || []
    : [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-6 flex flex-wrap">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="images">General Images</TabsTrigger>
              <TabsTrigger value="colorImages">Color Images</TabsTrigger>
              <TabsTrigger value="options">Options</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="customization">Default Templates</TabsTrigger>
              <TabsTrigger value="colorCustomization">Color Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select 
                    value={editedProduct.category} 
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name*</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={editedProduct.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>
              
              <div className="space-y-2 flex flex-col gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isCustomizable" 
                    checked={editedProduct.isCustomizable}
                    onCheckedChange={handleCustomizableChange}
                  />
                  <Label htmlFor="isCustomizable">Enable Customization</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isVisibleOnHomepage" 
                    checked={editedProduct.isVisibleOnHomepage}
                    onCheckedChange={handleVisibilityChange}
                  />
                  <Label htmlFor="isVisibleOnHomepage">Show on Homepage</Label>
                </div>
                
                {editedProduct.isCustomizable && editedProduct.category && PRINT_POSITIONS[editedProduct.category as keyof typeof PRINT_POSITIONS]?.length > 0 && (
                  <div className="mt-2">
                    <Label className="mb-2 block">Available Print Positions</Label>
                    <div className="flex flex-wrap gap-2">
                      {PRINT_POSITIONS[editedProduct.category as keyof typeof PRINT_POSITIONS]?.map((position) => (
                        <div key={position} className="text-sm bg-muted px-2 py-1 rounded">
                          {position}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="pricing" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="actualPrice">Actual Price (₹)*</Label>
                  <Input 
                    id="actualPrice"
                    name="actualPrice"
                    type="number"
                    value={editedProduct.actualPrice}
                    onChange={handleInputChange}
                    placeholder="Enter actual price"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="shippingCost">Shipping Cost (₹)</Label>
                  <Input 
                    id="shippingCost"
                    name="shippingCost"
                    type="number"
                    value={editedProduct.shippingCost}
                    onChange={handleInputChange}
                    placeholder="Enter shipping cost"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discountAmount">Discount Amount (₹)</Label>
                  <Input 
                    id="discountAmount"
                    name="discountAmount"
                    type="number"
                    value={editedProduct.discountAmount}
                    onChange={handleInputChange}
                    placeholder="Enter discount amount"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Total Price (₹)</Label>
                  <Input 
                    value={calculateTotalPrice()}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Available Offers</Label>
                <div className="space-y-2">
                  {editedProduct.offers?.map((offer, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={offer} readOnly className="flex-grow" />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeOffer(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    value={newOffer}
                    onChange={(e) => setNewOffer(e.target.value)}
                    placeholder="Add an offer (e.g., 10% off on prepaid orders)"
                  />
                  <Button type="button" onClick={addOffer} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-5 w-5 cursor-pointer ${
                        rating <= (editedProduct.rating || 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => updateRating(rating)}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {editedProduct.rating || 0} out of 5
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reviewCount">Review Count</Label>
                <Input 
                  id="reviewCount"
                  name="reviewCount"
                  type="number"
                  value={editedProduct.reviewCount || 0}
                  onChange={handleInputChange}
                  placeholder="Enter number of reviews"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4">
              <div className="space-y-2">
                <Label>Default Product Images (Up to 4)</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  These images will be used as defaults. For color-specific images, use the "Color Images" tab.
                </p>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  {editedProduct.images && editedProduct.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {editedProduct.images.map((img, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={img} 
                            alt={`Product preview ${index + 1}`} 
                            className={`h-40 w-full object-cover rounded ${
                              img === editedProduct.image ? 'ring-2 ring-primary' : ''
                            }`}
                          />
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-6 w-6 bg-background/80"
                              onClick={() => setAsMainImage(index)}
                              disabled={img === editedProduct.image}
                            >
                              <Star className={`h-3 w-3 ${img === editedProduct.image ? 'fill-primary text-primary' : ''}`} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-6 w-6 bg-background/80"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          {img === editedProduct.image && (
                            <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImagePlus className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Add up to 4 images for your product
                      </p>
                    </div>
                  )}
                  
                  {(editedProduct.images?.length || 0) < 4 && (
                    <div className="text-center">
                      <Input 
                        type="file" 
                        className="hidden" 
                        id="product-image-edit"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById("product-image-edit")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" /> Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colorImages" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Color-Specific Images</Label>
                  <div className="text-sm text-muted-foreground">
                    Each color can have up to 4 images
                  </div>
                </div>

                {selectedColors.length === 0 ? (
                  <Card className="border border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <PaintBucket className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground text-center">
                        No colors selected yet. Please go to the "Options" tab and select colors first.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div>
                    <Tabs 
                      value={activeColorTab || undefined} 
                      onValueChange={(value) => setActiveColorTab(value)}
                      className="w-full"
                    >
                      <TabsList className="mb-4 flex flex-wrap">
                        {selectedColors.map((color) => (
                          <TabsTrigger key={color} value={color} className="min-w-[80px]">
                            <div className="flex items-center space-x-2">
                              <span 
                                className="w-3 h-3 rounded-full" 
                                style={{
                                  backgroundColor: color.toLowerCase(),
                                  border: color.toLowerCase() === 'white' ? '1px solid #e2e8f0' : 'none'
                                }}
                              ></span>
                              <span>{color}</span>
                            </div>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {selectedColors.map((color) => (
                        <TabsContent key={color} value={color} className="space-y-4">
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                            {editedProduct.colorImages && editedProduct.colorImages[color] && editedProduct.colorImages[color].length > 0 ? (
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                {editedProduct.colorImages[color].map((img, index) => (
                                  <div key={index} className="relative">
                                    <img 
                                      src={img} 
                                      alt={`${color} product preview ${index + 1}`} 
                                      className="h-40 w-full object-cover rounded"
                                    />
                                    <Button 
                                      variant="outline" 
                                      size="icon" 
                                      className="absolute top-2 right-2 h-6 w-6 bg-background/80"
                                      onClick={() => removeColorImage(color, index)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                    <div className="absolute bottom-2 left-2 bg-primary/80 text-primary-foreground text-xs px-2 py-0.5 rounded">
                                      Image {index + 1}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <Image className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                  No images uploaded for {color} yet
                                </p>
                              </div>
                            )}
                            
                            {(!editedProduct.colorImages?.[color] || editedProduct.colorImages[color].length < 4) && (
                              <div className="text-center">
                                <Input 
                                  type="file" 
                                  className="hidden" 
                                  id={`color-image-${color}`}
                                  accept="image/*"
                                  onChange={(e) => handleColorImageUpload(color, e)}
                                />
                                <Button 
                                  variant="outline" 
                                  onClick={() => document.getElementById(`color-image-${color}`)?.click()}
                                >
                                  <Upload className="h-4 w-4 mr-2" /> Upload {color} Image
                                </Button>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="options" className="space-y-4">
              <div className="space-y-2">
                <Label>Available Colors</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mt-2">
                  {COLORS.map((color) => (
                    <div 
                      key={color} 
                      className={`flex items-center space-x-2 border rounded p-2 cursor-pointer ${
                        selectedColors.includes(color) ? 'border-primary bg-primary/10' : 'border-muted'
                      }`}
                      onClick={() => handleColorToggle(color)}
                    >
                      <Checkbox 
                        checked={selectedColors.includes(color)} 
                        onCheckedChange={() => {}}
                        className="pointer-events-none"
                      />
                      <Label className="cursor-pointer">{color}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {(editedProduct.category === 'T-Shirt' || editedProduct.category === 'Bag') && (
                <div className="space-y-2">
                  <Label>Available Sizes</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2 mt-2">
                    {SIZES.map((size) => (
                      <div 
                        key={size} 
                        className={`flex items-center space-x-2 border rounded p-2 cursor-pointer ${
                          selectedSizes.includes(size) ? 'border-primary bg-primary/10' : 'border-muted'
                        }`}
                        onClick={() => handleSizeToggle(size)}
                      >
                        <Checkbox 
                          checked={selectedSizes.includes(size)} 
                          onCheckedChange={() => {}}
                          className="pointer-events-none"
                        />
                        <Label className="cursor-pointer">{size}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <div className="space-y-2">
                <Label>Product Features</Label>
                <div className="space-y-2">
                  {editedProduct.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={feature} readOnly className="flex-grow" />
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFeature(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input 
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature"
                  />
                  <Button type="button" onClick={addFeature} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Product Specifications</Label>
                <div className="space-y-2">
                  {editedProduct.specifications?.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input 
                        value={`${spec.name}: ${spec.value}`} 
                        readOnly 
                        className="flex-grow"
                        disabled
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Default specifications are pre-filled and cannot be modified
                </p>
              </div>
            </TabsContent>

            <TabsContent value="customization" className="space-y-4">
              {editedProduct.isCustomizable ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Customization Templates</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload background images for each print position that users will customize. These will be used when no specific color is selected.
                    </p>
                    
                    {activePositions.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activePositions.map((position) => (
                          <div key={position} className="border rounded-lg p-4 space-y-3">
                            <h3 className="font-medium">{position} Position</h3>
                            
                            {customizationImages[position] ? (
                              <div className="relative">
                                <img 
                                  src={customizationImages[position]} 
                                  alt={`${position} template`} 
                                  className="h-40 w-full object-contain rounded"
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="absolute top-2 right-2"
                                  onClick={() => removeCustomizationImage(position)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                                <ImagePlus className="h-8 w-8 text-muted-foreground/50 mb-2" />
                                <p className="text-sm text-muted-foreground">Upload template</p>
                                <Input
                                  type="file"
                                  className="hidden"
                                  id={`customization-${position}`}
                                  accept="image/*"
                                  onChange={(e) => handleCustomizationImageUpload(position, e)}
                                />
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="mt-2"
                                  onClick={() => document.getElementById(`customization-${position}`)?.click()}
                                >
                                  <Upload className="h-3 w-3 mr-1" /> Upload
                                </Button>
                              </div>
                            )}
                            
                            <p className="text-xs text-muted-foreground">
                              This will be used as the background for {position.toLowerCase()} customization
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-muted/20 rounded-lg">
                        <p className="text-muted-foreground">
                          {editedProduct.category ? 
                            `The selected category "${editedProduct.category}" does not support customization positions.` : 
                            "Please select a category first to see available customization options."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">
                    Customization is disabled for this product. To enable it, go to the "Basic Info" tab and turn on "Enable Customization".
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="colorCustomization" className="space-y-4">
              {editedProduct.isCustomizable ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-medium">Color-Specific Customization Templates</Label>
                    <div className="text-sm text-muted-foreground">
                      Templates specific to each color
                    </div>
                  </div>

                  {selectedColors.length === 0 ? (
                    <Card className="border border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <PaintBucket className="h-12 w-12 text-muted-foreground/50 mb-2" />
                        <p className="text-muted-foreground text-center">
                          No colors selected yet. Please go to the "Options" tab and select colors first.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <Tabs 
                        value={activeCustomizationTab || undefined} 
                        onValueChange={(value) => setActiveCustomizationTab(value)}
                        className="w-full"
                      >
                        <TabsList className="mb-4 flex flex-wrap">
                          {selectedColors.map((color) => (
                            <TabsTrigger key={color} value={color} className="min-w-[80px]">
                              <div className="flex items-center space-x-2">
                                <span 
                                  className="w-3 h-3 rounded-full" 
                                  style={{
                                    backgroundColor: color.toLowerCase(),
                                    border: color.toLowerCase() === 'white' ? '1px solid #e2e8f0' : 'none'
                                  }}
                                ></span>
                                <span>{color}</span>
                              </div>
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {selectedColors.map((color) => (
                          <TabsContent key={color} value={color} className="space-y-4">
                            {activePositions.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activePositions.map(position => {
                                  const colorTemplateImage = colorCustomizationImages[color]?.[position];
                                  
                                  return (
                                    <div key={position} className="border rounded-lg p-4 space-y-3">
                                      <h3 className="font-medium">{color} - {position} Position</h3>
                                      
                                      {colorTemplateImage ? (
                                        <div className="relative">
                                          <img 
                                            src={colorTemplateImage} 
                                            alt={`${color} ${position} template`} 
                                            className="h-40 w-full object-contain rounded"
                                          />
                                          <Button 
                                            variant="outline" 
                                            size="sm" 
                                            className="absolute top-2 right-2"
                                            onClick={() => removeColorCustomizationImage(color, position)}
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                                          <ImagePlus className="h-8 w-8 text-muted-foreground/50 mb-2" />
                                          <p className="text-sm text-muted-foreground">Upload template</p>
                                          <Input
                                            type="file"
                                            className="hidden"
                                            id={`customization-${color}-${position}`}
                                            accept="image/*"
                                            onChange={(e) => handleColorCustomizationImageUpload(color, position, e)}
                                          />
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => document.getElementById(`customization-${color}-${position}`)?.click()}
                                          >
                                            <Upload className="h-3 w-3 mr-1" /> Upload
                                          </Button>
                                        </div>
                                      )}
                                      
                                      <p className="text-xs text-muted-foreground">
                                        This will be used as the {color} background for {position.toLowerCase()} customization
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-center p-6 bg-muted/20 rounded-lg">
                                <p className="text-muted-foreground">
                                  {editedProduct.category ? 
                                    `The selected category "${editedProduct.category}" does not support customization positions.` : 
                                    "Please select a category first to see available customization options."}
                                </p>
                              </div>
                            )}
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">
                    Customization is disabled for this product. To enable it, go to the "Basic Info" tab and turn on "Enable Customization".
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
