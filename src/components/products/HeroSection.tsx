
import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative mb-12 rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#FFF3F3] to-[#F5F5F5] py-16 px-8 rounded-xl dark:bg-gradient-to-r dark:from-[#1F1F1F] dark:to-[#333333]">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/lovable-uploads/b8ec29c5-fd5e-4ee1-a6dc-c7f0582d81bd.png" 
            alt="Custom Products Background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side content */}
          <div className="max-w-xl w-full">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#B80000] dark:text-white">Custom Products</h1>
            <p className="text-lg text-[#333333] mb-6 dark:text-[#D3D3D3]">
              Express yourself with our high-quality customizable products. 
              We use premium materials and cutting-edge DTF (Direct to Film) printing 
              technology to bring your designs to life with exceptional detail and durability.
            </p>
            <Button 
              size="lg" 
              className="bg-[#FF5733] hover:bg-[#D62F2F] text-white dark:bg-[#F4A4AF] dark:hover:bg-[#666666] dark:text-white"
            >
              Start Creating
            </Button>
          </div>
          
          {/* Right side image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-2xl border border-[#E6E6E6] dark:border-[#333333]">
              <img 
                src="/lovable-uploads/c84250fd-283e-4023-9fc3-144a1cb706b2.png" 
                alt="Custom Product Design Experience" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
