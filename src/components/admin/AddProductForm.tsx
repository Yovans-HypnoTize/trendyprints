import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ImagePlus,
  Save,
  Upload,
  X,
  Star,
  Plus,
  Trash2,
  DollarSign,
  Truck,
  Image,
  PaintBucket,
} from "lucide-react";
import { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

const CATEGORIES = ["T-Shirt", "Mug", "Bottle", "Mouse Pad", "Keychain", "Bag"];

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
  "Gray",
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const PRINT_POSITIONS = {
  "T-Shirt": ["Front", "Back", "Sleeve", "Custom"],
  Mug: ["Front", "Back", "Side"],
  Bottle: ["Front", "Back", "Side"],
  Keychain: [],
  "Mouse Pad": [],
  Bag: ["Front", "Back", "Side"],
};

const AddProductForm = ({ onAddProduct }: AddProductFormProps) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: "",
    actualPrice: "",
    shippingCost: " ",
    discountAmount: "",
    description: "",
    image: "",
    images: [],
    category: "",
    colors: [],
    sizes: [],
    features: [],
    offers: [],
    specifications: [
      { name: "Material", value: "Premium Quality" },
      { name: "Pattern", value: "Customizable" },
      { name: "Care", value: "Machine Wash" },
    ],
    rating: 0,
    reviewCount: 0,
    isCustomizable: true,
    isVisibleOnHomepage: false,
    customizationOptions: {
      printPositions: [],
      blankTemplates: {},
      colorBlankTemplates: {},
    },
    colorImages: {},
  });

  const [newFeature, setNewFeature] = useState("");
  const [newOffer, setNewOffer] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [customizationImages, setCustomizationImages] = useState<{
    [position: string]: string;
  }>({});
  const [colorCustomizationImages, setColorCustomizationImages] = useState<{
    [color: string]: { [position: string]: string };
  }>({});
  const [activeColorTab, setActiveColorTab] = useState<string | null>(null);
  const [activeCustomizationTab, setActiveCustomizationTab] = useState<
    string | null
  >(null);

  // Effect to set active color tab when colors change
  useState(() => {
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
    } else if (
      activeCustomizationTab &&
      !selectedColors.includes(activeCustomizationTab)
    ) {
      setActiveCustomizationTab(selectedColors[0]);
    }
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Parse to number if empty string, set to 0
    const numValue = value === "" ? "0" : value;
    setNewProduct((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "category") {
      // Update print positions based on category
      const printPositions =
        PRINT_POSITIONS[value as keyof typeof PRINT_POSITIONS] || [];

      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
        customizationOptions: {
          ...prev.customizationOptions,
          printPositions,
        },
      }));

      // Reset customization images when category changes
      setCustomizationImages({});
      setColorCustomizationImages({});
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleColorToggle = (color: string) => {
    const newSelectedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];

    setSelectedColors(newSelectedColors);

    setNewProduct((prev) => ({
      ...prev,
      colors: newSelectedColors,
    }));

    // If we're removing the active color tab, set a new one
    if (activeColorTab === color) {
      const remainingColors = newSelectedColors.filter((c) => c !== color);
      setActiveColorTab(remainingColors.length > 0 ? remainingColors[0] : null);
    }

    // If this is our first color, make it the active tab
    if (newSelectedColors.length === 1 && !activeColorTab) {
      setActiveColorTab(newSelectedColors[0]);
    }
  };

  const handleSizeToggle = (size: string) => {
    const newSelectedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];

    setSelectedSizes(newSelectedSizes);

    setNewProduct((prev) => ({
      ...prev,
      sizes: newSelectedSizes,
    }));
  };

  const handleCustomizableChange = (checked: boolean) => {
    setNewProduct((prev) => ({
      ...prev,
      isCustomizable: checked,
    }));
  };

  const handleVisibilityChange = (checked: boolean) => {
    setNewProduct((prev) => ({
      ...prev,
      isVisibleOnHomepage: checked,
    }));
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (event.target) {
  //         const newImage = event.target.result as string;

  //         // Set as main image if none exists
  //         if (!newProduct.image) {
  //           setNewProduct(prev => ({
  //             ...prev,
  //             image: newImage,
  //             images: [...(prev.images || []), newImage]
  //           }));
  //         } else {
  //           // Add to images array if we have less than 4 images
  //           if ((newProduct.images?.length || 0) < 4) {
  //             setNewProduct(prev => ({
  //               ...prev,
  //               images: [...(prev.images || []), newImage]
  //             }));
  //           }
  //         }
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleColorImageUpload = (
    color: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const newImage = event.target.result as string;

          setNewProduct((prev) => {
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
              colorImages,
            };
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const handleCustomizationImageUpload = (position: string, e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       if (event.target) {
  //         const newImage = event.target.result as string;
  //         const updatedImages = { ...customizationImages, [position]: newImage };

  //         setCustomizationImages(updatedImages);

  //         // Update the newProduct with new customization images
  //         setNewProduct(prev => ({
  //           ...prev,
  //           customizationOptions: {
  //             ...prev.customizationOptions,
  //             blankTemplates: updatedImages
  //           }
  //         }));
  //       }
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //   }
  // };

  const handleColorCustomizationImageUpload = (
    color: string,
    position: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const newImage = event.target.result as string;

          setColorCustomizationImages((prev) => {
            const updatedImages = { ...prev };
            if (!updatedImages[color]) {
              updatedImages[color] = {};
            }
            updatedImages[color][position] = newImage;
            return updatedImages;
          });

          // Update the newProduct with new color customization images
          setNewProduct((prev) => {
            const updatedCustomOptions = { ...prev.customizationOptions };
            if (!updatedCustomOptions.colorBlankTemplates) {
              updatedCustomOptions.colorBlankTemplates = {};
            }
            if (!updatedCustomOptions.colorBlankTemplates[color]) {
              updatedCustomOptions.colorBlankTemplates[color] = {};
            }
            updatedCustomOptions.colorBlankTemplates[color][position] =
              newImage;

            return {
              ...prev,
              customizationOptions: updatedCustomOptions,
            };
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // const removeImage = (index: number) => {
  //   setNewProduct(prev => {
  //     const updatedImages = [...(prev.images || [])];
  //     updatedImages.splice(index, 1);

  //     // If we're removing the main image, set the first remaining image as main
  //     let updatedMainImage = prev.image;
  //     if (prev.images && prev.images[index] === prev.image) {
  //       updatedMainImage = updatedImages.length > 0 ? updatedImages[0] : "";
  //     }

  //     return {
  //       ...prev,
  //       images: updatedImages,
  //       image: updatedMainImage
  //     };
  //   });
  // };

  const removeColorImage = (color: string, index: number) => {
    setNewProduct((prev) => {
      const colorImages = { ...prev.colorImages };
      if (colorImages && colorImages[color]) {
        const updatedImages = [...colorImages[color]];
        updatedImages.splice(index, 1);
        colorImages[color] = updatedImages;
      }

      return {
        ...prev,
        colorImages,
      };
    });
  };

  // const removeCustomizationImage = (position: string) => {
  //   const updatedImages = { ...customizationImages };
  //   delete updatedImages[position];

  //   setCustomizationImages(updatedImages);

  //   // Update the newProduct with new customization images
  //   setNewProduct(prev => ({
  //     ...prev,
  //     customizationOptions: {
  //       ...prev.customizationOptions,
  //       blankTemplates: updatedImages
  //     }
  //   }));
  // };

  const removeColorCustomizationImage = (color: string, position: string) => {
    setColorCustomizationImages((prev) => {
      const updatedImages = { ...prev };
      if (updatedImages[color]) {
        delete updatedImages[color][position];
      }
      return updatedImages;
    });

    // Update the newProduct with new color customization images
    setNewProduct((prev) => {
      const updatedCustomOptions = { ...prev.customizationOptions };
      if (
        updatedCustomOptions.colorBlankTemplates &&
        updatedCustomOptions.colorBlankTemplates[color]
      ) {
        delete updatedCustomOptions.colorBlankTemplates[color][position];
      }

      return {
        ...prev,
        customizationOptions: updatedCustomOptions,
      };
    });
  };

  // const setAsMainImage = (index: number) => {
  //   if (newProduct.images && newProduct.images[index]) {
  //     setNewProduct(prev => ({
  //       ...prev,
  //       image: prev.images![index]
  //     }));
  //   }
  // };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setNewProduct((prev) => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index),
    }));
  };

  const handleAddOffer = () => {
    if (newOffer.trim()) {
      setNewProduct((prev) => ({
        ...prev,
        offers: [...(prev.offers || []), newOffer.trim()],
      }));
      setNewOffer("");
    }
  };

  const removeOffer = (index: number) => {
    setNewProduct((prev) => ({
      ...prev,
      offers: prev.offers?.filter((_, i) => i !== index),
    }));
  };

  const updateRating = (rating: number) => {
    setNewProduct((prev) => ({
      ...prev,
      rating,
    }));
  };

  const calculateTotalPrice = () => {
    const actualPrice = parseFloat(newProduct.actualPrice || "0");
    const shippingCost = parseFloat(newProduct.shippingCost || "0");
    const discountAmount = parseFloat(newProduct.discountAmount || "0");

    return (actualPrice + shippingCost - discountAmount).toFixed(2);
  };

  const handleSubmit = () => {
    if (!newProduct.name || !newProduct.actualPrice || !newProduct.category) {
      return false;
    }

    const totalPrice = calculateTotalPrice();

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name || "",
      price: totalPrice,
      actualPrice: newProduct.actualPrice || "",
      shippingCost: newProduct.shippingCost || "0",
      discountAmount: newProduct.discountAmount || "0",
      description: newProduct.description || "",
      image:
        newProduct.image || "https://placehold.co/400x300?text=Product+Image",
      images: newProduct.images || [
        newProduct.image || "https://placehold.co/400x300?text=Product+Image",
      ],
      category: newProduct.category || "",
      colors: newProduct.colors || [],
      sizes: newProduct.sizes || [],
      features: newProduct.features || [],
      offers: newProduct.offers || [],
      colorImages: newProduct.colorImages || {},
      specifications: newProduct.specifications || [
        { name: "Material", value: "Premium Quality" },
        { name: "Pattern", value: "Customizable" },
        { name: "Care", value: "Machine Wash" },
      ],
      rating: newProduct.rating || 0,
      reviewCount: newProduct.reviewCount || 0,
      isCustomizable: newProduct.isCustomizable ?? true,
      isVisibleOnHomepage: newProduct.isVisibleOnHomepage ?? false,
      customizationOptions: {
        ...(newProduct.customizationOptions || {}),
        printPositions: newProduct.customizationOptions?.printPositions || [],
        blankTemplates: customizationImages,
        colorBlankTemplates: colorCustomizationImages,
      },
    };

    onAddProduct(product);

    // Reset form
    setNewProduct({
      name: "",
      price: "",
      actualPrice: "",
      shippingCost: "0",
      discountAmount: "0",
      description: "",
      image: "",
      images: [],
      category: "",
      colors: [],
      sizes: [],
      features: [],
      offers: [],
      specifications: [
        { name: "Material", value: "Premium Quality" },
        { name: "Pattern", value: "Customizable" },
        { name: "Care", value: "Machine Wash" },
      ],
      rating: 0,
      reviewCount: 0,
      isCustomizable: true,
      isVisibleOnHomepage: false,
      customizationOptions: {
        printPositions: [],
        blankTemplates: {},
        colorBlankTemplates: {},
      },
      colorImages: {},
    });
    setSelectedColors([]);
    setSelectedSizes([]);
    setCustomizationImages({});
    setColorCustomizationImages({});
    setActiveColorTab(null);
    setActiveCustomizationTab(null);

    return true;
  };

  const activePositions = newProduct.category
    ? PRINT_POSITIONS[newProduct.category as keyof typeof PRINT_POSITIONS] || []
    : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>
          Fill in the details to add a new product to your catalog
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="product-details"
        >
          <AccordionItem value="product-details">
            <AccordionTrigger className="text-lg font-semibold">
              Product Details
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category*</Label>
                  <Select
                    value={newProduct.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
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
                  <Label htmlFor="name">Product Title*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="actualPrice">Actual Price (₹)*</Label>
                    <Input
                      id="actualPrice"
                      name="actualPrice"
                      type="number"
                      value={newProduct.actualPrice}
                      onChange={handleNumberInputChange}
                      placeholder="Enter actual price"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="discountAmount"
                      className="flex items-center gap-1"
                    >
                      <DollarSign className="h-4 w-4" />
                      Discount Amount (₹)
                    </Label>
                    <Input
                      id="discountAmount"
                      name="discountAmount"
                      type="number"
                      value={newProduct.discountAmount}
                      onChange={handleNumberInputChange}
                      placeholder="Enter discount amount"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="shippingCost"
                      className="flex items-center gap-1"
                    >
                      <Truck className="h-4 w-4" />
                      Shipping Cost (₹)
                    </Label>
                    <Input
                      id="shippingCost"
                      name="shippingCost"
                      type="number"
                      value={newProduct.shippingCost}
                      onChange={handleNumberInputChange}
                      placeholder="Enter shipping cost"
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

                <div className="space-y-2 flex flex-col gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isCustomizable"
                      checked={newProduct.isCustomizable}
                      onCheckedChange={handleCustomizableChange}
                    />
                    <Label htmlFor="isCustomizable">Enable Customization</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVisibleOnHomepage"
                      checked={newProduct.isVisibleOnHomepage}
                      onCheckedChange={handleVisibilityChange}
                    />
                    <Label htmlFor="isVisibleOnHomepage">
                      Show on Homepage
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Available Offers</Label>
                  <div className="space-y-2">
                    {newProduct.offers?.map((offer, index) => (
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
                    <Button type="button" onClick={handleAddOffer} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Available Colors</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {COLORS.map((color) => (
                        <div
                          key={color}
                          className={`flex items-center space-x-2 border rounded p-2 cursor-pointer ${
                            selectedColors.includes(color)
                              ? "border-primary bg-primary/10"
                              : "border-muted"
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

                  <div className="space-y-2">
                    <Label>Available Sizes</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {SIZES.map((size) => (
                        <div
                          key={size}
                          className={`flex items-center space-x-2 border rounded p-2 cursor-pointer ${
                            selectedSizes.includes(size)
                              ? "border-primary bg-primary/10"
                              : "border-muted"
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">Star Rating</Label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        className={`h-5 w-5 cursor-pointer ${
                          rating <= (newProduct.rating || 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                        onClick={() => updateRating(rating)}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {newProduct.rating || 0} out of 5
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewCount">Review Count</Label>
                  <Input
                    id="reviewCount"
                    name="reviewCount"
                    type="number"
                    value={newProduct.reviewCount}
                    onChange={handleInputChange}
                    placeholder="Enter number of reviews"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description Content</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Key Features</Label>
                  <div className="space-y-2">
                    {newProduct.features?.map((feature, index) => (
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
                    <Button type="button" onClick={handleAddFeature} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Specifications</Label>
                  <div className="space-y-2">
                    {newProduct.specifications?.map((spec, index) => (
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
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* <AccordionItem value="product-images">
            <AccordionTrigger className="text-lg font-semibold">
              Product Images
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label>Product Preview Images (Up to 4)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                  {newProduct.images && newProduct.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {newProduct.images.map((img, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={img} 
                            alt={`Product preview ${index + 1}`} 
                            className={`h-40 w-full object-cover rounded ${
                              img === newProduct.image ? 'ring-2 ring-primary' : ''
                            }`}
                          />
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <Button 
                              variant="outline" 
                              size="icon"
                              className="h-6 w-6 bg-background/80"
                              onClick={() => setAsMainImage(index)}
                              disabled={img === newProduct.image}
                            >
                              <Star className={`h-3 w-3 ${img === newProduct.image ? 'fill-primary text-primary' : ''}`} />
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
                          {img === newProduct.image && (
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
                  
                  {(newProduct.images?.length || 0) < 4 && (
                    <div className="text-center">
                      <Input 
                        type="file" 
                        className="hidden" 
                        id="product-image"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <Button 
                        variant="outline" 
                        onClick={() => document.getElementById("product-image")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" /> Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem> */}

          <AccordionItem value="color-images">
            <AccordionTrigger className="text-lg font-semibold">
              Color-Specific Images
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">
                    Color-Specific Images
                  </Label>
                  <div className="text-sm text-muted-foreground">
                    Each color can have up to 4 images
                  </div>
                </div>

                {selectedColors.length === 0 ? (
                  <Card className="border border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <PaintBucket className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground text-center">
                        No colors selected yet. Please select colors in the
                        "Product Details" section first.
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
                          <TabsTrigger
                            key={color}
                            value={color}
                            className="min-w-[80px]"
                          >
                            <div className="flex items-center space-x-2">
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: color.toLowerCase(),
                                  border:
                                    color.toLowerCase() === "white"
                                      ? "1px solid #e2e8f0"
                                      : "none",
                                }}
                              ></span>
                              <span>{color}</span>
                            </div>
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {selectedColors.map((color) => (
                        <TabsContent
                          key={color}
                          value={color}
                          className="space-y-4"
                        >
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                            {newProduct.colorImages &&
                            newProduct.colorImages[color] &&
                            newProduct.colorImages[color].length > 0 ? (
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                {newProduct.colorImages[color].map(
                                  (img, index) => (
                                    <div key={index} className="relative">
                                      <img
                                        src={img}
                                        alt={`${color} product preview ${
                                          index + 1
                                        }`}
                                        className="h-40 w-full object-cover rounded"
                                      />
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6 bg-background/80"
                                        onClick={() =>
                                          removeColorImage(color, index)
                                        }
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                      <div className="absolute bottom-2 left-2 bg-primary/80 text-primary-foreground text-xs px-2 py-0.5 rounded">
                                        Image {index + 1}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <Image className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                  No images uploaded for {color} yet
                                </p>
                              </div>
                            )}

                            {(!newProduct.colorImages?.[color] ||
                              newProduct.colorImages[color].length < 4) && (
                              <div className="text-center">
                                <Input
                                  type="file"
                                  className="hidden"
                                  id={`color-image-${color}`}
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleColorImageUpload(color, e)
                                  }
                                />
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    document
                                      .getElementById(`color-image-${color}`)
                                      ?.click()
                                  }
                                >
                                  <Upload className="h-4 w-4 mr-2" /> Upload{" "}
                                  {color} Image
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
            </AccordionContent>
          </AccordionItem>

          {/* <AccordionItem value="customization">
            <AccordionTrigger className="text-lg font-semibold">
              Default Customization Templates
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              {newProduct.isCustomizable ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload background images for each print position that users will customize. These will be used when no specific color is selected.
                  </p>
                  
                  {activePositions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activePositions.map(position => (
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
                        {newProduct.category ? 
                          `The selected category "${newProduct.category}" does not support customization positions.` : 
                          "Please select a category first to see available customization options."}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center p-8 bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground">
                    Customization is disabled for this product. To enable it, go to the "Product Details" section and turn on "Enable Customization".
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem> */}

          <AccordionItem value="color-customization">
            <AccordionTrigger className="text-lg font-semibold">
              Color-Specific Templates
            </AccordionTrigger>
            <AccordionContent className="space-y-6 pt-4">
              {newProduct.isCustomizable ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload specific background images for each color and print
                    position.
                  </p>

                  {selectedColors.length === 0 ? (
                    <Card className="border border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <PaintBucket className="h-12 w-12 text-muted-foreground/50 mb-2" />
                        <p className="text-muted-foreground text-center">
                          No colors selected yet. Please select colors in the
                          "Product Details" section first.
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div>
                      <Tabs
                        value={activeCustomizationTab || undefined}
                        onValueChange={(value) =>
                          setActiveCustomizationTab(value)
                        }
                        className="w-full"
                      >
                        <TabsList className="mb-4 flex flex-wrap">
                          {selectedColors.map((color) => (
                            <TabsTrigger
                              key={color}
                              value={color}
                              className="min-w-[80px]"
                            >
                              <div className="flex items-center space-x-2">
                                <span
                                  className="w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: color.toLowerCase(),
                                    border:
                                      color.toLowerCase() === "white"
                                        ? "1px solid #e2e8f0"
                                        : "none",
                                  }}
                                ></span>
                                <span>{color}</span>
                              </div>
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {selectedColors.map((color) => (
                          <TabsContent
                            key={color}
                            value={color}
                            className="space-y-4"
                          >
                            {activePositions.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activePositions.map((position) => {
                                  const colorTemplateImage =
                                    colorCustomizationImages[color]?.[position];

                                  return (
                                    <div
                                      key={position}
                                      className="border rounded-lg p-4 space-y-3"
                                    >
                                      <h3 className="font-medium">
                                        {color} - {position} Position
                                      </h3>

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
                                            onClick={() =>
                                              removeColorCustomizationImage(
                                                color,
                                                position
                                              )
                                            }
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 flex flex-col items-center justify-center h-40">
                                          <ImagePlus className="h-8 w-8 text-muted-foreground/50 mb-2" />
                                          <p className="text-sm text-muted-foreground">
                                            Upload template
                                          </p>
                                          <Input
                                            type="file"
                                            className="hidden"
                                            id={`customization-${color}-${position}`}
                                            accept="image/*"
                                            onChange={(e) =>
                                              handleColorCustomizationImageUpload(
                                                color,
                                                position,
                                                e
                                              )
                                            }
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2"
                                            onClick={() =>
                                              document
                                                .getElementById(
                                                  `customization-${color}-${position}`
                                                )
                                                ?.click()
                                            }
                                          >
                                            <Upload className="h-3 w-3 mr-1" />{" "}
                                            Upload
                                          </Button>
                                        </div>
                                      )}

                                      <p className="text-xs text-muted-foreground">
                                        This will be used as the {color}{" "}
                                        background for {position.toLowerCase()}{" "}
                                        customization
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="text-center p-6 bg-muted/20 rounded-lg">
                                <p className="text-muted-foreground">
                                  {newProduct.category
                                    ? `The selected category "${newProduct.category}" does not support customization positions.`
                                    : "Please select a category first to see available customization options."}
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
                    Customization is disabled for this product. To enable it, go
                    to the "Product Details" section and turn on "Enable
                    Customization".
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" /> Save Product
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddProductForm;
