
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="bg-background border-t border-border pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <img 
              src={theme === "dark" 
                ? "/lovable-uploads/02f52526-f93a-4a7a-9610-11c030c81728.png" 
                : "/lovable-uploads/856466fe-0f07-4dcb-8930-131feae81c95.png"} 
              alt="Trendy Design" 
              className="h-14 mb-4"
            />
            <p className="text-muted-foreground text-sm mt-4">
              Premium quality fashion that blends style with comfort. Trendy Design brings you the latest in fashion with sustainable materials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-muted-foreground text-sm hover:text-primary/80 transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-muted-foreground mr-2 mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Fashion Street, Trendy Hub, Style City, 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-muted-foreground mr-2 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+1 234 567 8900</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-muted-foreground mr-2 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">info@trendydesign.com</span>
              </li>
            </ul>

            <div className="mt-4">
              <h4 className="text-foreground font-semibold mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary/80 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary/80 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary/80 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary/80 transition-colors">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-border">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Trendy Design. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
