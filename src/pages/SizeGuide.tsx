
import React from "react";
import Breadcrumb from "@/components/products/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Ruler, Shirt } from "lucide-react";

const SizeGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: "Home", path: "/" },
          { label: "Size Guide" }
        ]} 
      />

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Size Guide</h1>
        <p className="text-muted-foreground">
          Find your perfect fit with our detailed size charts and measurement guides.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-start mb-4">
          <Ruler className="text-brand mr-3 mt-1" size={20} />
          <div>
            <h2 className="text-xl font-semibold">How to Measure</h2>
            <p className="text-muted-foreground">For the best fit, measure yourself as follows:</p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Chest / Bust</h3>
                  <p className="text-muted-foreground">Measure around the fullest part of your chest, keeping the measuring tape horizontal.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Waist</h3>
                  <p className="text-muted-foreground">Measure around your natural waistline, at the narrowest part of your torso.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Hips</h3>
                  <p className="text-muted-foreground">Measure around the fullest part of your hips, keeping the tape horizontal.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Length</h3>
                  <p className="text-muted-foreground">For tops, measure from the highest point of your shoulder to desired length.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground italic">Note: For the most accurate results, have someone else take your measurements while wearing minimal clothing.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center mb-4">
            <Shirt className="text-brand mr-3" size={20} />
            <h2 className="text-2xl font-semibold">T-Shirt Size Charts</h2>
          </div>
          <Separator className="mb-6" />

          <Tabs defaultValue="mens">
            <TabsList className="mb-4">
              <TabsTrigger value="mens">Men's</TabsTrigger>
              <TabsTrigger value="womens">Women's</TabsTrigger>
              <TabsTrigger value="unisex">Unisex</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mens" className="pt-2">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="border px-4 py-2 text-left">Size</th>
                      <th className="border px-4 py-2 text-left">Chest (inches)</th>
                      <th className="border px-4 py-2 text-left">Waist (inches)</th>
                      <th className="border px-4 py-2 text-left">Length (inches)</th>
                      <th className="border px-4 py-2 text-left">Sleeve (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">S</td>
                      <td className="border px-4 py-2">36-38</td>
                      <td className="border px-4 py-2">30-32</td>
                      <td className="border px-4 py-2">28</td>
                      <td className="border px-4 py-2">8.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">M</td>
                      <td className="border px-4 py-2">38-40</td>
                      <td className="border px-4 py-2">32-34</td>
                      <td className="border px-4 py-2">29</td>
                      <td className="border px-4 py-2">9</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">L</td>
                      <td className="border px-4 py-2">40-42</td>
                      <td className="border px-4 py-2">34-36</td>
                      <td className="border px-4 py-2">30</td>
                      <td className="border px-4 py-2">9.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">XL</td>
                      <td className="border px-4 py-2">42-44</td>
                      <td className="border px-4 py-2">36-38</td>
                      <td className="border px-4 py-2">31</td>
                      <td className="border px-4 py-2">10</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">2XL</td>
                      <td className="border px-4 py-2">44-46</td>
                      <td className="border px-4 py-2">38-40</td>
                      <td className="border px-4 py-2">32</td>
                      <td className="border px-4 py-2">10.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">3XL</td>
                      <td className="border px-4 py-2">46-48</td>
                      <td className="border px-4 py-2">40-42</td>
                      <td className="border px-4 py-2">33</td>
                      <td className="border px-4 py-2">11</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Men's t-shirts have a standard fit. If you prefer a looser fit, we recommend sizing up.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="womens" className="pt-2">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="border px-4 py-2 text-left">Size</th>
                      <th className="border px-4 py-2 text-left">Bust (inches)</th>
                      <th className="border px-4 py-2 text-left">Waist (inches)</th>
                      <th className="border px-4 py-2 text-left">Length (inches)</th>
                      <th className="border px-4 py-2 text-left">Sleeve (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">XS</td>
                      <td className="border px-4 py-2">31-32</td>
                      <td className="border px-4 py-2">24-25</td>
                      <td className="border px-4 py-2">25.5</td>
                      <td className="border px-4 py-2">7</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">S</td>
                      <td className="border px-4 py-2">33-34</td>
                      <td className="border px-4 py-2">26-27</td>
                      <td className="border px-4 py-2">26</td>
                      <td className="border px-4 py-2">7.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">M</td>
                      <td className="border px-4 py-2">35-36</td>
                      <td className="border px-4 py-2">28-29</td>
                      <td className="border px-4 py-2">26.5</td>
                      <td className="border px-4 py-2">7.75</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">L</td>
                      <td className="border px-4 py-2">37-38</td>
                      <td className="border px-4 py-2">30-31</td>
                      <td className="border px-4 py-2">27</td>
                      <td className="border px-4 py-2">8</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">XL</td>
                      <td className="border px-4 py-2">39-40</td>
                      <td className="border px-4 py-2">32-33</td>
                      <td className="border px-4 py-2">27.5</td>
                      <td className="border px-4 py-2">8.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">2XL</td>
                      <td className="border px-4 py-2">41-43</td>
                      <td className="border px-4 py-2">34-36</td>
                      <td className="border px-4 py-2">28</td>
                      <td className="border px-4 py-2">9</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Women's t-shirts have a more fitted silhouette. If you prefer a relaxed fit, consider sizing up.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="unisex" className="pt-2">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-muted/30">
                      <th className="border px-4 py-2 text-left">Size</th>
                      <th className="border px-4 py-2 text-left">Chest (inches)</th>
                      <th className="border px-4 py-2 text-left">Length (inches)</th>
                      <th className="border px-4 py-2 text-left">Sleeve (inches)</th>
                      <th className="border px-4 py-2 text-left">Shoulder (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">XS</td>
                      <td className="border px-4 py-2">34-36</td>
                      <td className="border px-4 py-2">27</td>
                      <td className="border px-4 py-2">8</td>
                      <td className="border px-4 py-2">16.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">S</td>
                      <td className="border px-4 py-2">36-38</td>
                      <td className="border px-4 py-2">28</td>
                      <td className="border px-4 py-2">8.5</td>
                      <td className="border px-4 py-2">17.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">M</td>
                      <td className="border px-4 py-2">38-40</td>
                      <td className="border px-4 py-2">29</td>
                      <td className="border px-4 py-2">9</td>
                      <td className="border px-4 py-2">18.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">L</td>
                      <td className="border px-4 py-2">40-42</td>
                      <td className="border px-4 py-2">30</td>
                      <td className="border px-4 py-2">9.5</td>
                      <td className="border px-4 py-2">19.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">XL</td>
                      <td className="border px-4 py-2">42-44</td>
                      <td className="border px-4 py-2">31</td>
                      <td className="border px-4 py-2">10</td>
                      <td className="border px-4 py-2">20.5</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">2XL</td>
                      <td className="border px-4 py-2">44-46</td>
                      <td className="border px-4 py-2">32</td>
                      <td className="border px-4 py-2">10.5</td>
                      <td className="border px-4 py-2">21.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Unisex t-shirts have a standard fit that works well for most body types. Typically runs closer to men's sizing.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="text-2xl font-semibold mb-4">International Size Conversion</h2>
          <Separator className="mb-6" />
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-muted/30">
                  <th className="border px-4 py-2 text-left">US/UK</th>
                  <th className="border px-4 py-2 text-left">EU</th>
                  <th className="border px-4 py-2 text-left">Australia</th>
                  <th className="border px-4 py-2 text-left">Japan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">XS</td>
                  <td className="border px-4 py-2">42</td>
                  <td className="border px-4 py-2">8</td>
                  <td className="border px-4 py-2">S</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">S</td>
                  <td className="border px-4 py-2">44-46</td>
                  <td className="border px-4 py-2">10</td>
                  <td className="border px-4 py-2">M</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">M</td>
                  <td className="border px-4 py-2">48-50</td>
                  <td className="border px-4 py-2">12</td>
                  <td className="border px-4 py-2">L</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">L</td>
                  <td className="border px-4 py-2">52-54</td>
                  <td className="border px-4 py-2">14</td>
                  <td className="border px-4 py-2">LL</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">XL</td>
                  <td className="border px-4 py-2">56</td>
                  <td className="border px-4 py-2">16</td>
                  <td className="border px-4 py-2">3L</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">2XL</td>
                  <td className="border px-4 py-2">58</td>
                  <td className="border px-4 py-2">18</td>
                  <td className="border px-4 py-2">4L</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-10 border-t border-border pt-6">
        <h2 className="text-xl font-semibold mb-4">Still Unsure About Your Size?</h2>
        <p className="text-muted-foreground mb-4">
          If you're between sizes or have questions about specific products, our customer service team is happy to help.
        </p>
        <a 
          href="/contact" 
          className="bg-brand text-brand-foreground px-6 py-2 rounded-md hover:bg-brand/90 inline-block transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default SizeGuide;
