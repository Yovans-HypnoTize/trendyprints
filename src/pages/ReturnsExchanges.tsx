
import React from "react";
import Breadcrumb from "@/components/products/Breadcrumb";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RefreshCcw, ShieldCheck, BadgeAlert, ArrowLeftRight, CreditCard } from "lucide-react";

const ReturnsExchanges = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: "Home", path: "/" },
          { label: "Returns & Exchanges" }
        ]} 
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Returns & Exchanges</h1>
        <p className="text-muted-foreground">
          Our policies and procedures for returning or exchanging products.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Return Policy Overview</h2>
          <Separator className="mb-4" />
          <div className="flex items-start gap-3">
            <ShieldCheck className="text-brand mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="mb-4 text-muted-foreground">
                We want you to be completely satisfied with your purchase. If you're not entirely happy with your order, we're here to help.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li><span className="font-medium text-foreground">Return Window:</span> Within 30 days of receiving your order</li>
                <li><span className="font-medium text-foreground">Condition Requirements:</span> Items must be unused, unworn, and in original packaging</li>
                <li><span className="font-medium text-foreground">Proof of Purchase:</span> Original receipt or order confirmation required</li>
                <li><span className="font-medium text-foreground">Custom/Personalized Items:</span> Only returnable if defective</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Eligible Return Conditions</h2>
          <Separator className="mb-4" />
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="defective">
              <AccordionTrigger className="text-lg font-medium">
                <span className="flex items-center">
                  <BadgeAlert className="mr-2 text-brand" size={18} />
                  Defective Products
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>If you receive a product with manufacturing defects, print errors, or damage that occurred prior to delivery:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>We offer a full refund or replacement at our expense</li>
                  <li>Please provide photos of the defect when initiating your return</li>
                  <li>Return shipping costs will be covered by us</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="incorrect">
              <AccordionTrigger className="text-lg font-medium">
                <span className="flex items-center">
                  <BadgeAlert className="mr-2 text-brand" size={18} />
                  Incorrect Items
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>If you receive an item that doesn't match what you ordered:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>We will send the correct item immediately</li>
                  <li>We'll provide a prepaid return shipping label for the incorrect item</li>
                  <li>No additional charges will apply</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="size">
              <AccordionTrigger className="text-lg font-medium">
                <span className="flex items-center">
                  <BadgeAlert className="mr-2 text-brand" size={18} />
                  Size/Fit Issues
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>If the item doesn't fit as expected:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Exchange for a different size is available</li>
                  <li>Return for refund is accepted</li>
                  <li>Customer is responsible for return shipping costs unless exchanging</li>
                  <li>We recommend referring to our size guide before purchasing</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="changed-mind">
              <AccordionTrigger className="text-lg font-medium">
                <span className="flex items-center">
                  <BadgeAlert className="mr-2 text-brand" size={18} />
                  Changed Your Mind
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>If you no longer want the product (no defects):</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Return for refund accepted within 30 days</li>
                  <li>Item must be unused with all tags and original packaging</li>
                  <li>Customer is responsible for return shipping costs</li>
                  <li>A 10% restocking fee may apply for non-defective returns</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Return Process</h2>
          <Separator className="mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-border rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand mb-3">1</div>
              <h3 className="font-medium mb-2">Contact Us</h3>
              <p className="text-sm text-muted-foreground">Email or call our customer service to request a return authorization.</p>
            </div>
            
            <div className="border border-border rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand mb-3">2</div>
              <h3 className="font-medium mb-2">Package Item</h3>
              <p className="text-sm text-muted-foreground">Securely pack the item(s) in original packaging with return form.</p>
            </div>
            
            <div className="border border-border rounded-lg p-4 text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand mb-3">3</div>
              <h3 className="font-medium mb-2">Ship & Track</h3>
              <p className="text-sm text-muted-foreground">Send the package using the provided label or your preferred carrier.</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-4">
            After receiving your return, we'll inspect the item and process your refund or exchange within 5-7 business days.
          </p>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-medium mb-2 flex items-center">
              <CreditCard className="mr-2 text-brand" size={18} />
              Refund Information
            </h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Refunds will be issued to the original payment method</li>
              <li>Processing time: 3-5 business days for credit card refunds</li>
              <li>Original shipping costs are non-refundable unless item was defective</li>
              <li>You will receive an email confirmation when your refund is processed</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
          <Separator className="mb-4" />
          <div className="flex items-start gap-3">
            <ArrowLeftRight className="text-brand mt-1 flex-shrink-0" size={20} />
            <div>
              <p className="mb-2">Prefer to exchange your item instead of returning it?</p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>Exchanges are available for different sizes or colors of the same product</li>
                <li>For exchanges, we'll waive the restocking fee</li>
                <li>If exchanging for a higher-priced item, you'll need to pay the price difference</li>
                <li>If exchanging for a lower-priced item, we'll refund the difference</li>
                <li>We provide a prepaid shipping label for size exchanges</li>
              </ul>
              <p className="mt-4 text-muted-foreground">
                To request an exchange, please contact our customer service team with your order number and exchange details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-10 border-t border-border pt-6">
        <h2 className="text-xl font-semibold mb-4">Need Help With Returns?</h2>
        <p className="text-muted-foreground mb-4">
          Our customer service team is here to assist with any questions or concerns about returns and exchanges.
        </p>
        <a 
          href="/contact" 
          className="bg-brand text-brand-foreground px-6 py-2 rounded-md hover:bg-brand/90 inline-block transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default ReturnsExchanges;
