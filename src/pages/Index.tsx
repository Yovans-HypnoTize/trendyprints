import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Pencil, Box, Leaf, Users, MousePointer, Coffee, Shirt, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";

const whyChooseUsFeatures = [
  {
    icon: <Box className="h-12 w-12 text-red-500" />,
    title: "Single-piece orders accepted",
    description: "No order is too small for us! Order just one item or as many as you need."
  },
  {
    icon: <Pencil className="h-12 w-12 text-red-500" />,
    title: "Custom or pre-designed options",
    description: "Choose a design from our amazing collection or bring your unique idea to life."
  },
  {
    icon: <Leaf className="h-12 w-12 text-red-500" />,
    title: "Eco-Friendly Materials",
    description: "We use sustainable materials and eco-friendly printing techniques for all our products."
  },
  {
    icon: <Users className="h-12 w-12 text-red-500" />,
    title: "Bulk Orders Available",
    description: "Need items for your team, event, or business? We offer special pricing for bulk orders."
  }
];

const processSteps = [
  {
    icon: <MousePointer className="h-10 w-10 text-red-500" />,
    title: "Choose Your Product",
    description: "Browse our catalog and select the perfect product for your needs"
  },
  {
    icon: <Pencil className="h-10 w-10 text-red-500" />,
    title: "Upload Your Design",
    description: "Upload your artwork or create a design with our online tools"
  },
  {
    icon: <Box className="h-10 w-10 text-red-500" />,
    title: "Place Your Order",
    description: "Add to cart, choose your quantity, and complete checkout"
  },
  {
    icon: <Box className="h-10 w-10 text-red-500" />,
    title: "Get It Delivered",
    description: "Sit back and relax while we produce and ship your order"
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const mockProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    if (mockProducts.length === 0) {
      const defaultProducts = [
      ];
      setProducts(defaultProducts);
    } else {
      setProducts(mockProducts);
    }
  }, []);

  const handleQuickView = (id: string) => {
    navigate(`/products/${id}`);
  };

  const getProductRows = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 5) {
      rows.push(products.slice(i, i + 5));
    }
    return rows;
  };

  return (
    <div className="flex flex-col">
      <section className="relative h-[650px] bg-black">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/1628e829-4419-4a2f-8cd6-062159a8c034.png')] bg-cover bg-left opacity-70"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-end text-right">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Custom Apparel Experience</h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Create unique, personalized designs on premium quality apparel and accessories
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button size="lg" asChild>
                <Link to="/products">Design Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>*/}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Trendy Design</h2>
            <p className="text-muted-foreground mb-8">
             Trendy Design is a leading custom printing service provider in Chennai, India, dedicated to delivering high-quality personalized products. We specialize in customizing T-shirts, cups, keychains, and a wide range of printed merchandise that seamlessly blend contemporary aesthetics with timeless elegance. Our designs are crafted for comfort, confidence, and style, making them perfect for any season or occasion. Whether you're placing a single order or ordering in bulk, we provide seamless nationwide delivery across India, ensuring exceptional quality and craftsmanship to elevate your personal or business branding.
            </p>
            <Button variant="outline" className="mt-2" asChild>
              <Link to="/about">Read Our Story <ArrowRight size={16} className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Customizable Products</h2>
            <p className="text-muted-foreground mb-8">
              We offer a wide range of high-quality products that can be personalized with your designs. 
              From apparel to accessories, we've got everything you need to express your unique style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <Card className="overflow-hidden shadow-md">
              <div className="p-6">
                <Shirt className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Apparel</h3>
                <p className="text-muted-foreground mb-4">
                  Our premium quality t-shirts, hoodies, and other clothing items are made from soft, 
                  durable fabric that's perfect for DTF (Direct to Film) printing. The result is vibrant, 
                  long-lasting designs that won't crack or fade easily with washing.
                </p>
              </div>
            </Card>
            
            <Card className="overflow-hidden shadow-md">
              <div className="p-6">
                <Coffee className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Drinkware</h3>
                <p className="text-muted-foreground mb-4">
                  Our mugs and water bottles are made from high-grade ceramics and stainless steel, 
                  designed to keep your beverages at the perfect temperature. We use specialized 
                  sublimation printing techniques that ensure your designs remain vivid and dishwasher-safe.
                </p>
              </div>
            </Card>
            
            <Card className="overflow-hidden shadow-md">
              <div className="p-6">
                <Key className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Accessories</h3>
                <p className="text-muted-foreground mb-4">
                  From mouse pads to keychains, our accessories are crafted with attention to detail 
                  and functionality. We use high-quality materials that are durable and perfect for 
                  everyday use, while our printing techniques ensure crisp, detailed designs.
                </p>
              </div>
            </Card>
          </div>
          
          <div className="text-center">
            <Button asChild>
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-primary font-semibold">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">The Trendy Design Difference</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We're committed to excellence in every aspect of our service, from design to delivery. 
              Here's what sets us apart.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {whyChooseUsFeatures.map((feature, index) => (
              <div key={index} className="bg-background border border-border rounded-lg p-6 shadow-sm">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-center mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-center">{feature.description}</p>
                {index === 3 && (
                  <div className="mt-4 text-center">
                    <Button variant="link" size="sm" className="text-primary">
                      Learn more
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-primary font-semibold">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">How It Works</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Creating your custom products is quick and easy with our streamlined process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-center mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-center">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(100%/2)] w-[calc(100%/2)] h-0.5 border-t-2 border-dashed border-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Our Products</h2>
            <p className="text-muted-foreground">Browse our collection of customizable products</p>
          </div>
          
          <div className="space-y-8">
            {getProductRows().slice(0, 5).map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {row.map((product) => (
                  <div key={product.id} className="group">
                    <div className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                          {product.category}
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                            onClick={() => handleQuickView(product.id)}
                          >
                            Quick View
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-foreground mb-1">{product.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{product.price}</p>
                        <div className="mt-auto flex justify-between items-center">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/products/${product.id}?customize=true`)}
                          >
                            Customize
                          </Button>
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-primary"
                            onClick={() => handleQuickView(product.id)}
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Stay updated with the latest trends and exclusive offers</p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md border border-white/20 bg-black/50 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button className="bg-white text-black hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HomePage;
