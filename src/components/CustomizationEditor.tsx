import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowUp,
  ArrowDown,
  Upload,
  ImageIcon,
  Text,
  Palette,
  Move,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Trash,
  Info,
  Eye,
  Edit,
  Crop,
  Hand,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types/product";
import { fabric } from "fabric";
import { Switch } from "@/components/ui/switch";

interface CustomizationEditorProps {
  product: Product;
  backgroundImage: string;
  onSave: (
    customizedImage: string,
    customText?: string,
    printPosition?: string
  ) => void;
}

const COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#800000",
  "#008080",
  "#000080",
  "#808080",
];

const FONTS = [
  "Arial",
  "Verdana",
  "Helvetica",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Georgia",
  "Garamond",
  "Courier New",
  "Brush Script MT",
];

const TEXT_SIZES = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "42px",
  "48px",
  "64px",
];

const TSHIRT_BLACK =
  "/lovable-uploads/66125a92-cbcc-46a3-8664-74ecf05c1b12.png";
const UPLOAD_PLACEHOLDER =
  "/lovable-uploads/fb97da0a-c876-4583-b5e0-81a4c0dbefef.png";

const CustomizationEditor: React.FC<CustomizationEditorProps> = ({
  product,
  backgroundImage,
  onSave,
}) => {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [selectedPrintPosition, setSelectedPrintPosition] = useState(
    product.printingOptions && product.printingOptions.length > 0
      ? product.printingOptions[0]
      : "Front"
  );
  const [activeTab, setActiveTab] = useState<"image" | "text" | "colors">(
    "image"
  );
  const [customText, setCustomText] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [textSize, setTextSize] = useState("24px");
  const [textFont, setTextFont] = useState("Arial");
  const [showHelpDialog, setShowHelpDialog] = useState(false);

  // Initialize fabric canvas on mount
  useEffect(() => {
    console.log(product);
    if (!canvasRef.current) return;

    // Initialize Fabric Canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: containerRef.current?.clientWidth || 400,
      height: (containerRef.current?.clientWidth || 400) * 1.2, // Aspect ratio for t-shirt
      backgroundColor: "transparent",
      selection: isEditMode, // Only allow selection in edit mode
    });

    fabricCanvasRef.current = canvas;

    // Set default options
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#00a8ff";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.borderColor = "#00a8ff";
    fabric.Object.prototype.borderScaleFactor = 2;

    // Load the initial background image
    loadBackgroundImage(canvas);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      canvas.setWidth(containerRef.current.clientWidth);
      canvas.setHeight(containerRef.current.clientWidth * 1.2);
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.dispose();
    };
  }, []);

  // Update canvas when edit mode changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    // Toggle selection and controls visibility based on edit mode
    canvas.selection = isEditMode;

    canvas.getObjects().forEach((obj) => {
      if (obj.type !== "image" || obj.id === "backgroundImage") return;

      obj.selectable = isEditMode;
      obj.hasControls = isEditMode;
      obj.hasBorders = isEditMode;
      obj.hoverCursor = isEditMode ? "move" : "default";
    });

    canvas.renderAll();

    if (isEditMode) {
      toast({
        title: "Edit mode active",
        description: "You can now drag, resize and rotate your design",
      });
    } else {
      toast({
        title: "Preview mode active",
        description: "This is how your final design will look",
      });
    }
  }, [isEditMode, toast]);

  // Load the background t-shirt image
  // const loadBackgroundImage = (canvas: fabric.Canvas) => {
  //   fabric.Image.fromURL(TSHIRT_BLACK, (img) => {
  //     img.scaleToWidth(canvas.width || 400);
  //     img.set({
  //       id: 'backgroundImage',
  //       selectable: false,
  //       evented: false,
  //       lockMovementX: true,
  //       lockMovementY: true,
  //       lockRotation: true,
  //       lockScalingX: true,
  //       lockScalingY: true,
  //     });

  //     canvas.add(img);
  //     canvas.centerObject(img);
  //     canvas.sendToBack(img);

  //     // Add placeholder for upload if no image uploaded yet
  //     addUploadPlaceholder(canvas);

  //     canvas.renderAll();
  //   });
  // };
  const loadBackgroundImage = (canvas: fabric.Canvas) => {
    const bgImageUrl = backgroundImage || product.image;
    console.log("Loading background image:", bgImageUrl);

    if (!bgImageUrl) return;

    fabric.Image.fromURL(bgImageUrl, (img) => {
      img.scaleToWidth(canvas.width || 400);
      img.set({
        id: "backgroundImage",
        selectable: false,
        evented: false,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
      });

      canvas.add(img);
      canvas.centerObject(img);
      canvas.sendToBack(img);

      addUploadPlaceholder(canvas);

      canvas.renderAll();
    });
  };

  // Add a placeholder for image upload
  const addUploadPlaceholder = (canvas: fabric.Canvas) => {
    const centerX = canvas.width! / 2;
    const centerY = canvas.height! / 2 - 50; // Adjust to be on chest area of t-shirt

    // Calculate dimensions (10-12 inches width × 10-14 inches height)
    // Convert inches to pixels (assuming 96 DPI)
    const placeholderWidth = Math.min(canvas.width! * 0.8, 11 * 96);
    const placeholderHeight = Math.min(canvas.height! * 0.5, 12 * 96);

    // Create upload placeholder
    fabric.Image.fromURL(UPLOAD_PLACEHOLDER, (img) => {
      img.set({
        id: "uploadPlaceholder",
        left: centerX - placeholderWidth / 2,
        top: centerY - placeholderHeight / 2,
        width: placeholderWidth,
        height: placeholderHeight,
        selectable: false,
        evented: false,
        opacity: 0.7,
      });

      canvas.add(img);
      canvas.bringToFront(img);
      canvas.renderAll();
    });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!fabricCanvasRef.current) return;

      const canvas = fabricCanvasRef.current;

      // Remove existing upload placeholder
      const placeholder = canvas
        .getObjects()
        .find((obj) => obj.id === "uploadPlaceholder");
      if (placeholder) canvas.remove(placeholder);

      // Remove existing uploaded image if any
      const existingImage = canvas
        .getObjects()
        .find((obj) => obj.id === "uploadedImage");
      if (existingImage) canvas.remove(existingImage);

      // Calculate center position and dimensions
      const centerX = canvas.width! / 2;
      const centerY = canvas.height! / 2 - 50; // Position slightly higher on the t-shirt

      // Calculate dimensions (10-12 inches width × 10-14 inches height)
      // Convert inches to pixels (assuming 96 DPI)
      const maxWidth = Math.min(canvas.width! * 0.8, 11 * 96);
      const maxHeight = Math.min(canvas.height! * 0.5, 12 * 96);

      fabric.Image.fromURL(event.target?.result as string, (img) => {
        // Scale image to fit within the specified dimensions
        if (img.width! > maxWidth || img.height! > maxHeight) {
          const scaleX = maxWidth / img.width!;
          const scaleY = maxHeight / img.height!;
          const scale = Math.min(scaleX, scaleY);
          img.scale(scale);
        }

        img.set({
          id: "uploadedImage",
          left: centerX - (img.width! * img.scaleX!) / 2,
          top: centerY - (img.height! * img.scaleY!) / 2,
          selectable: isEditMode,
          hasControls: isEditMode,
          hasBorders: isEditMode,
          cornerColor: "#00a8ff",
          borderColor: "#00a8ff",
          cornerSize: 10,
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

        toast({
          title: "Image uploaded",
          description: "You can now drag, resize and reposition your design",
        });
      });
    };

    reader.readAsDataURL(file);
  };

  // Handle saving the design
  const handleSave = () => {
    if (!fabricCanvasRef.current) return;

    // Switch to preview mode to hide controls
    setIsEditMode(false);

    setTimeout(() => {
      const canvas = fabricCanvasRef.current;
      if (!canvas) return;

      // Get the image data URL
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
      });

      onSave(dataUrl, customText, selectedPrintPosition);

      toast({
        title: "Design saved",
        description: "Your customized design has been applied",
      });
    }, 100); // Short delay to ensure the preview mode is applied before saving
  };

  // Add custom text to the canvas
  const handleAddText = () => {
    if (!fabricCanvasRef.current || !customText) return;

    const canvas = fabricCanvasRef.current;

    // Remove existing text object if any
    const existingText = canvas
      .getObjects()
      .find((obj) => obj.id === "customText");
    if (existingText) canvas.remove(existingText);

    const centerX = canvas.width! / 2;
    const centerY = canvas.height! / 2;

    // Create text object
    const text = new fabric.Text(customText, {
      id: "customText",
      left: centerX,
      top: centerY + 80, // Position below the image area
      originX: "center",
      originY: "center",
      fontFamily: textFont,
      fontSize: parseInt(textSize),
      fill: textColor,
      textAlign: "center",
      selectable: isEditMode,
      hasControls: isEditMode,
      hasBorders: isEditMode,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();

    toast({
      title: "Text added",
      description: "You can now position and style your text",
    });
  };

  // Update text properties when they change
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const textObject = canvas
      .getObjects()
      .find((obj) => obj.id === "customText") as fabric.Text;

    if (textObject) {
      textObject.set({
        text: customText,
        fontFamily: textFont,
        fontSize: parseInt(textSize),
        fill: textColor,
      });

      canvas.renderAll();
    }
  }, [customText, textFont, textSize, textColor]);

  // Get available print positions based on product category
  const getAvailablePrintPositions = () => {
    if (!product.category) return ["Front"];

    switch (product.category) {
      case "T-Shirt":
        return ["Front", "Back", "Sleeve", "Custom"];
      case "Mug":
        return ["Front", "Back", "Side"];
      case "Bottle":
        return ["Front", "Back", "Side"];
      case "Keychain":
      case "Mousepad":
      case "Bag":
      default:
        return ["Front"];
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Sidebar - Customization Tools */}
      <div className="space-y-4">
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "image" | "text" | "colors")
          }
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="image" className="flex items-center gap-1">
              <ImageIcon className="h-4 w-4" /> Design
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-1">
              <Text className="h-4 w-4" /> Text
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-1">
              <Palette className="h-4 w-4" /> Colors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="upload">
                <AccordionTrigger className="text-sm font-medium">
                  Upload Design
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 text-center">
                      <div>
                        <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Upload your design to customize
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Recommended size: 10-12 inches × 10-14 inches
                        </p>
                        <Button
                          onClick={() =>
                            document.getElementById("design-upload")?.click()
                          }
                          className="mt-3 flex items-center gap-2"
                          size="sm"
                        >
                          <Upload className="h-4 w-4" /> Upload Image
                        </Button>
                      </div>
                      <input
                        type="file"
                        id="design-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="edit-tools">
                <AccordionTrigger className="text-sm font-medium">
                  Design Tools
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Edit Mode</span>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={isEditMode}
                            onCheckedChange={setIsEditMode}
                            id="edit-mode"
                          />
                          <label
                            htmlFor="edit-mode"
                            className="text-sm cursor-pointer flex items-center gap-1"
                          >
                            {isEditMode ? (
                              <>
                                <Edit className="h-4 w-4" /> Edit
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4" /> Preview
                              </>
                            )}
                          </label>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!isEditMode) setIsEditMode(true);
                          }}
                          disabled={isEditMode}
                        >
                          <Edit className="h-3 w-3 mr-1" /> Enable Edit
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Toggle between edit mode and preview mode
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          if (!fabricCanvasRef.current) return;
                          const activeObj =
                            fabricCanvasRef.current.getActiveObject();
                          if (activeObj) {
                            activeObj.set({ angle: 0 });
                            fabricCanvasRef.current.renderAll();
                          }
                        }}
                        disabled={!isEditMode}
                      >
                        <RotateCw className="h-3 w-3" /> Reset Rotation
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          if (!fabricCanvasRef.current) return;
                          const activeObj =
                            fabricCanvasRef.current.getActiveObject();
                          if (activeObj) {
                            fabricCanvasRef.current.centerObject(activeObj);
                            fabricCanvasRef.current.renderAll();
                          }
                        }}
                        disabled={!isEditMode}
                      >
                        <Move className="h-3 w-3" /> Center
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          if (!fabricCanvasRef.current) return;
                          const activeObj =
                            fabricCanvasRef.current.getActiveObject();
                          if (activeObj) {
                            activeObj.scaleX = activeObj.scaleX! * 1.1;
                            activeObj.scaleY = activeObj.scaleY! * 1.1;
                            fabricCanvasRef.current.renderAll();
                          }
                        }}
                        disabled={!isEditMode}
                      >
                        <ZoomIn className="h-3 w-3" /> Increase Size
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          if (!fabricCanvasRef.current) return;
                          const activeObj =
                            fabricCanvasRef.current.getActiveObject();
                          if (activeObj) {
                            activeObj.scaleX = activeObj.scaleX! * 0.9;
                            activeObj.scaleY = activeObj.scaleY! * 0.9;
                            fabricCanvasRef.current.renderAll();
                          }
                        }}
                        disabled={!isEditMode}
                      >
                        <ZoomOut className="h-3 w-3" /> Decrease Size
                      </Button>
                    </div>

                    <div className="p-3 border rounded-md bg-muted/20">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Info className="h-3 w-3 flex-shrink-0" />
                        When in Edit mode, you can:
                      </p>
                      <ul className="text-xs text-muted-foreground mt-1 ml-5 list-disc space-y-1">
                        <li>Drag to reposition your design</li>
                        <li>Use corner handles to resize</li>
                        <li>Rotate using the rotation handle</li>
                        <li>Switch to Preview mode to see final result</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="position">
                <AccordionTrigger className="text-sm font-medium">
                  Print Position
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {getAvailablePrintPositions().map((position) => (
                      <div key={position} className="flex items-center">
                        <input
                          type="radio"
                          id={position}
                          name="printPosition"
                          className="mr-2"
                          checked={selectedPrintPosition === position}
                          onChange={() => setSelectedPrintPosition(position)}
                        />
                        <label htmlFor={position} className="text-sm">
                          {position}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="add-text"
            >
              <AccordionItem value="add-text">
                <AccordionTrigger className="text-sm font-medium">
                  Add Text
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Enter your custom text or message"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      maxLength={100}
                      rows={3}
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        {customText.length}/100 characters
                      </p>
                      <Button
                        size="sm"
                        onClick={handleAddText}
                        disabled={!customText}
                      >
                        Add Text
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {customText && (
                <>
                  <AccordionItem value="font">
                    <AccordionTrigger className="text-sm font-medium">
                      Font Style
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-xs font-medium">
                            Font Family
                          </label>
                          <Select value={textFont} onValueChange={setTextFont}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                              {FONTS.map((font) => (
                                <SelectItem
                                  key={font}
                                  value={font}
                                  style={{ fontFamily: font }}
                                >
                                  {font}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium">
                            Font Size
                          </label>
                          <Select value={textSize} onValueChange={setTextSize}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              {TEXT_SIZES.map((size) => (
                                <SelectItem key={size} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="color">
                    <AccordionTrigger className="text-sm font-medium">
                      Text Color
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-5 gap-2">
                        {COLORS.map((color) => (
                          <button
                            key={color}
                            className={`w-full aspect-square rounded-md ${
                              textColor === color ? "ring-2 ring-primary" : ""
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => setTextColor(color)}
                            aria-label={`Color ${color}`}
                          />
                        ))}
                      </div>
                      <div className="mt-3">
                        <label className="text-xs font-medium block mb-2">
                          Custom Color
                        </label>
                        <div className="flex">
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="cursor-pointer bg-transparent h-9 w-9 border rounded"
                          />
                          <Input
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="ml-2 flex-1"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </>
              )}
            </Accordion>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Product Colors</h3>
              <div className="grid grid-cols-5 gap-2">
                {(product.colors || ["White", "Black"]).map((color) => (
                  <div key={color} className="text-center space-y-1">
                    <div
                      className="w-full aspect-square rounded-md border shadow-sm mx-auto"
                      style={{
                        backgroundColor: color.toLowerCase(),
                        border:
                          color.toLowerCase() === "white"
                            ? "1px solid #ddd"
                            : "none",
                      }}
                    />
                    <span className="text-xs">{color}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-muted/40 rounded text-sm">
                <p className="flex items-center">
                  <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                  Product color selection is available on the product page
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col space-y-2 mt-8">
          <Button onClick={handleSave} className="w-full">
            Save Design
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHelpDialog(true)}
            className="w-full"
          >
            How to use
          </Button>
        </div>
      </div>

      {/* Center - Design Canvas */}
      <div className="md:col-span-2">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Design Preview</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={isEditMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-1"
              >
                <Edit className="h-3 w-3" /> Edit
              </Button>
              <Button
                variant={!isEditMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEditMode(false)}
                className="flex items-center gap-1"
              >
                <Eye className="h-3 w-3" /> Preview
              </Button>
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative overflow-hidden border rounded-lg bg-white"
          >
            <canvas ref={canvasRef} className="w-full touch-none" />
          </div>

          <div className="p-4 border rounded-lg bg-muted/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Price Breakdown</h4>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>₹{product.actualPrice || product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customization</span>
                  <span>₹99</span>
                </div>
                {product.shippingCost &&
                  parseFloat(product.shippingCost) > 0 && (
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>₹{product.shippingCost}</span>
                    </div>
                  )}
                {product.discountAmount &&
                  parseFloat(product.discountAmount) > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{product.discountAmount}</span>
                    </div>
                  )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showHelpDialog} onOpenChange={setShowHelpDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to Customize Your Product</DialogTitle>
            <DialogDescription>
              Follow these simple steps to create your custom design
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Upload your image</h4>
              <p className="text-sm text-muted-foreground">
                Click the Upload Design button to select an image from your
                device.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">2. Position your design</h4>
              <p className="text-sm text-muted-foreground">
                Use Edit mode to drag, resize, and rotate your design exactly
                where you want it.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">3. Add custom text</h4>
              <p className="text-sm text-muted-foreground">
                Click the Text tab to add and customize your text message.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">4. Preview your design</h4>
              <p className="text-sm text-muted-foreground">
                Switch to Preview mode to see how your final design will look
                without edit controls.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">5. Select print position</h4>
              <p className="text-sm text-muted-foreground">
                Choose where you want your design to be printed on the product.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">6. Save your design</h4>
              <p className="text-sm text-muted-foreground">
                When you're happy with your design, click Save to apply it to
                your product.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomizationEditor;
