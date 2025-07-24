
import React, { useState } from "react";
import Breadcrumb from "@/components/products/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { TruckIcon, Package, CheckCheck, Clock } from "lucide-react";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<null | {
    status: string;
    orderDate: string;
    estimatedDelivery: string;
    trackingNumber: string;
    currentLocation: string;
    statusUpdates: { date: string; status: string; location: string }[];
  }>(null);
  
  const { toast } = useToast();

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      toast({
        title: "Order number is required",
        description: "Please enter a valid order number to track your order",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, show tracking info for any input
      // In a real app, this would verify against actual orders
      setTrackingResult({
        status: "In Transit",
        orderDate: "April 2, 2025",
        estimatedDelivery: "April 8, 2025",
        trackingNumber: "TRK" + orderNumber.padStart(8, "0"),
        currentLocation: "Regional Distribution Center",
        statusUpdates: [
          {
            date: "April 4, 2025, 10:30 AM",
            status: "Package in transit",
            location: "Regional Distribution Center"
          },
          {
            date: "April 3, 2025, 2:15 PM",
            status: "Package processed",
            location: "Shipping Partner Facility"
          },
          {
            date: "April 2, 2025, 6:45 PM",
            status: "Order processed",
            location: "Trendy Design Warehouse"
          },
          {
            date: "April 2, 2025, 11:20 AM",
            status: "Order confirmed",
            location: "Trendy Design"
          }
        ]
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "In Transit":
        return <TruckIcon className="text-brand" size={24} />;
      case "Delivered":
        return <CheckCheck className="text-green-500" size={24} />;
      case "Processing":
        return <Clock className="text-amber-500" size={24} />;
      default:
        return <Package className="text-brand" size={24} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: "Home", path: "/" },
          { label: "Track Order" }
        ]} 
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Track Your Order</h1>
        <p className="text-muted-foreground">
          Enter your order details below to check the status of your purchase.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
                Order Number*
              </label>
              <Input
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number"
                className="max-w-md"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                You can find this in your order confirmation email.
              </p>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address (optional)
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email used for your order"
                className="max-w-md"
              />
            </div>
            
            <div>
              <Button 
                type="submit" 
                variant="brand"
                disabled={isLoading}
              >
                {isLoading ? "Tracking..." : "Track Order"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {trackingResult && (
        <Card className="mb-8 border-t-4" style={{ borderTopColor: 'hsl(var(--brand))' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
              <div className="flex items-center">
                {getStatusIcon(trackingResult.status)}
                <div className="ml-3">
                  <h2 className="text-2xl font-semibold">Order Status: {trackingResult.status}</h2>
                  <p className="text-muted-foreground">Tracking #: {trackingResult.trackingNumber}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Order Date: {trackingResult.orderDate}</p>
                <p className="text-sm font-medium">Est. Delivery: {trackingResult.estimatedDelivery}</p>
              </div>
            </div>
            
            <div className="relative mb-10 mt-8">
              <div className="absolute top-0 left-0 h-1 bg-muted w-full rounded">
                {/* Progress bar styling based on status */}
                <div className="h-full bg-brand rounded" style={{ width: '60%' }}></div>
              </div>
              
              <div className="flex justify-between mt-6">
                <div className="text-center">
                  <div className="w-5 h-5 bg-brand rounded-full mx-auto"></div>
                  <p className="text-xs mt-1">Order Placed</p>
                </div>
                <div className="text-center">
                  <div className="w-5 h-5 bg-brand rounded-full mx-auto"></div>
                  <p className="text-xs mt-1">Processing</p>
                </div>
                <div className="text-center">
                  <div className="w-5 h-5 bg-brand rounded-full mx-auto"></div>
                  <p className="text-xs mt-1">Shipped</p>
                </div>
                <div className="text-center">
                  <div className="w-5 h-5 bg-muted rounded-full mx-auto"></div>
                  <p className="text-xs mt-1">Out For Delivery</p>
                </div>
                <div className="text-center">
                  <div className="w-5 h-5 bg-muted rounded-full mx-auto"></div>
                  <p className="text-xs mt-1">Delivered</p>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
            <div className="space-y-4">
              {trackingResult.statusUpdates.map((update, index) => (
                <div key={index} className={`border-l-2 pl-4 pb-4 ${index === 0 ? 'border-brand' : 'border-muted'}`}>
                  <p className="text-sm font-medium">{update.status}</p>
                  <p className="text-xs text-muted-foreground">{update.date}</p>
                  <p className="text-xs text-muted-foreground">{update.location}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                If you have any questions about your order, please <a href="/contact" className="text-brand hover:underline">contact our support team</a> for assistance.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrackOrder;
