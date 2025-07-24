
import React from "react";
import Breadcrumb from "@/components/products/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Truck, Clock, CheckCircle, Globe, AlertCircle } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: "Home", path: "/" },
          { label: "Shipping Policy" }
        ]} 
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Shipping Policy</h1>
        <p className="text-muted-foreground">
          Information about our shipping processes, delivery times, and handling procedures.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Processing Times</h2>
          <Separator className="mb-4" />
          <div className="flex items-start gap-3">
            <Clock className="text-brand mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="mb-2">Our standard processing times are as follows:</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Standard products: 1-2 business days</li>
                <li>Custom designed products: 2-3 business days</li>
                <li>Bulk orders (10+ items): 3-5 business days</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                Processing begins after payment confirmation. Orders placed on weekends or holidays will begin processing on the next business day.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Delivery Timeframes</h2>
          <Separator className="mb-4" />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Truck className="text-brand mr-2" size={20} />
                <h3 className="text-lg font-medium">Domestic Shipping</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Standard Shipping: 3-7 business days</li>
                <li>Express Shipping: 2-3 business days</li>
                <li>Priority Shipping: 1-2 business days</li>
              </ul>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Globe className="text-brand mr-2" size={20} />
                <h3 className="text-lg font-medium">International Shipping</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Standard International: 7-14 business days</li>
                <li>Express International: 3-5 business days</li>
                <li>May be subject to customs delays or duties</li>
              </ul>
            </div>
          </div>
          
          <p className="mt-4 text-muted-foreground">
            Please note that these timeframes are estimates and may vary based on location, customs processing, and unforeseen circumstances.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Carriers</h2>
          <Separator className="mb-4" />
          <div className="flex items-start gap-3">
            <CheckCircle className="text-brand mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="mb-2">We partner with trusted shipping carriers including:</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>USPS</li>
                <li>FedEx</li>
                <li>UPS</li>
                <li>DHL (primarily for international orders)</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                The carrier used will depend on your location, chosen shipping method, and package size. You'll receive tracking information via email once your order ships.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Shipping Costs</h2>
          <Separator className="mb-4" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2">Shipping Method</th>
                  <th className="text-left px-4 py-2">Cost</th>
                  <th className="text-left px-4 py-2">Free Shipping Minimum</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Standard Domestic</td>
                  <td className="px-4 py-3">$5.99</td>
                  <td className="px-4 py-3">Orders over $50</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Express Domestic</td>
                  <td className="px-4 py-3">$12.99</td>
                  <td className="px-4 py-3">Orders over $100</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Priority Domestic</td>
                  <td className="px-4 py-3">$19.99</td>
                  <td className="px-4 py-3">Not eligible</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Standard International</td>
                  <td className="px-4 py-3">$14.99</td>
                  <td className="px-4 py-3">Orders over $100</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Express International</td>
                  <td className="px-4 py-3">$29.99</td>
                  <td className="px-4 py-3">Not eligible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Delays & Lost Packages</h2>
          <Separator className="mb-4" />
          <div className="flex items-start gap-3">
            <AlertCircle className="text-brand mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="mb-2">In the event of shipping delays or lost packages:</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Domestic orders not received within 10 business days of shipping should be reported to customer service.</li>
                <li>International orders not received within 21 business days of shipping should be reported to customer service.</li>
                <li>We will investigate any lost or significantly delayed packages with the carrier.</li>
                <li>Depending on the circumstances, we may resend your order or provide a refund.</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                Please contact our customer service team for assistance with any shipping issues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingPolicy;
