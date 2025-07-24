
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

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: "Home", path: "/" },
          { label: "Terms & Conditions" }
        ]} 
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-muted-foreground">
          Please read these terms and conditions carefully before using our services.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Order Process</h2>
          <Separator className="mb-4" />
          <p className="mb-4">
            By placing an order with Trendy Design, you agree to the following terms:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>All orders are subject to acceptance and availability.</li>
            <li>Once an order is placed, you will receive an order confirmation email.</li>
            <li>We reserve the right to refuse any order without giving reason.</li>
            <li>Prices shown are inclusive of applicable taxes unless stated otherwise.</li>
            <li>Payment must be received in full before products are shipped.</li>
            <li>Estimated delivery times are not guaranteed and may vary.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Refund and Return Policies</h2>
          <Separator className="mb-4" />
          <p className="mb-4">
            Our return and refund policies are designed to ensure your satisfaction while protecting both parties:
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="return-policy">
              <AccordionTrigger className="text-lg font-medium">Return Policy</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Returns must be initiated within 14 days of receiving your order.</li>
                  <li>Items must be unused, unworn, and in their original packaging.</li>
                  <li>Custom-designed products cannot be returned unless they are defective.</li>
                  <li>Return shipping costs are the responsibility of the customer unless the product is defective.</li>
                  <li>All returns must be approved by our customer service team before shipping.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="refund-policy">
              <AccordionTrigger className="text-lg font-medium">Refund Policy</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Refunds will be processed within 7-14 business days after receiving and inspecting the returned item.</li>
                  <li>Refunds will be issued to the original payment method used for the purchase.</li>
                  <li>Shipping costs are non-refundable unless the return is due to our error.</li>
                  <li>For defective products, we offer full refunds or replacements at our discretion.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property Rights</h2>
          <Separator className="mb-4" />
          <p className="mb-4 text-muted-foreground">
            When using our custom design services, the following intellectual property terms apply:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>You retain ownership of your original designs submitted for printing.</li>
            <li>By submitting designs, you warrant that you own the rights to use any content, images, or logos in the design.</li>
            <li>You agree to indemnify Trendy Design against any claims related to copyright infringement for designs you submit.</li>
            <li>Trendy Design retains all rights to its own logos, website content, and product images.</li>
            <li>Trendy Design may showcase photos of your custom-designed products for marketing purposes unless otherwise requested.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
          <Separator className="mb-4" />
          <p className="mb-4 text-muted-foreground">
            Trendy Design limits liability as follows:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>We are not liable for any indirect or consequential losses arising from use of our products.</li>
            <li>Our total liability shall not exceed the price paid for the products.</li>
            <li>We do not guarantee that colors will exactly match what is displayed on your screen.</li>
            <li>We are not responsible for delays or failures to fulfill obligations due to factors outside our control.</li>
            <li>Claims for damaged products must be made within 48 hours of receipt with photographic evidence.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground mt-8">
        <p>Last updated: April 5, 2025. These terms and conditions are subject to change without notice.</p>
      </div>
    </div>
  );
};

export default Terms;
