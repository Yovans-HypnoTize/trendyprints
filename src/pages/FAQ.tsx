
import React from "react";
import Breadcrumb from "@/components/products/Breadcrumb";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const faqItems = [
    {
      question: "How can I customize a product?",
      answer: "You can customize our products through our online design tool. Simply select the product you'd like to personalize, click on 'Customize', and use our intuitive editor to add text, upload images, or choose from our library of design elements."
    },
    {
      question: "Can I upload my own design?",
      answer: "Yes! We welcome your creativity. You can upload your own images, logos, or complete designs in various formats (PNG, JPEG, SVG). Our system will automatically check if your design meets our printing requirements."
    },
    {
      question: "What types of products do you offer?",
      answer: "We offer a wide range of customizable products including t-shirts, hoodies, mugs, phone cases, tote bags, posters, and more. Our catalog is regularly updated with new items based on trends and customer requests."
    },
    {
      question: "What are the payment methods?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "Can I cancel or modify my order after purchase?",
      answer: "Orders can be cancelled or modified within 1 hour of placing them. After this window, we begin processing orders for production and cannot guarantee changes. Please contact our customer service team immediately if you need to make changes."
    },
    {
      question: "How long will delivery take?",
      answer: "Standard delivery typically takes 3-7 business days for domestic orders and 7-14 business days for international orders. We also offer express shipping options at checkout for faster delivery. Note that custom-designed products may require 1-2 additional days for production."
    },
    {
      question: "Do you offer bulk or wholesale orders?",
      answer: "Yes, we offer special pricing for bulk orders. If you're interested in ordering 10+ items, please contact our sales team through the contact form for a custom quote."
    },
    {
      question: "What is your quality guarantee?",
      answer: "We stand behind the quality of our products. If you're not completely satisfied with the print quality or if there's any defect, we'll replace the item or provide a full refund within 30 days of purchase."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: "Home", path: "/" },
          { label: "FAQ" }
        ]} 
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Find answers to common questions about our products and services.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="mt-10 border-t border-border pt-6">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-4">
          Our customer service team is here to help. Contact us through our support channels for assistance.
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

export default FAQ;
