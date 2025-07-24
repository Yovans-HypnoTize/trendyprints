
import React from "react";

const ProductInfoCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-16">
      <div className="bg-muted/10 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-2">Premium Materials</h3>
        <p className="text-muted-foreground text-sm">
          We use only high-quality materials for all our products to ensure durability and comfort.
        </p>
      </div>
      <div className="bg-muted/10 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-2">DTF Printing</h3>
        <p className="text-muted-foreground text-sm">
          Our Direct to Film technology provides vibrant, long-lasting prints that won't fade or peel.
        </p>
      </div>
      <div className="bg-muted/10 p-6 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
        <p className="text-muted-foreground text-sm">
          Most custom orders are processed within 2-3 business days and shipped with tracking.
        </p>
      </div>
    </div>
  );
};

export default ProductInfoCards;
