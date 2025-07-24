
import { useTheme } from "./ThemeProvider";
import { Link } from "react-router-dom";
import { Menu, User, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-[#FFF3F3] border-b border-[#E6E6E6] py-4 dark:bg-[#1F1F1F] dark:border-[#333333]">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={theme === "dark" 
              ? "/lovable-uploads/02f52526-f93a-4a7a-9610-11c030c81728.png" 
              : "/lovable-uploads/856466fe-0f07-4dcb-8930-131feae81c95.png"} 
            alt="Trendy Design" 
            className="h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white">
            Home
          </Link>
          <Link to="/products" className="text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white">
            Products
          </Link>
          <Link to="/about" className="text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white">
            About
          </Link>
          <Link to="/contact" className="text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white">
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-[#333333] hover:text-[#FF3B3F] dark:text-[#D3D3D3] dark:hover:text-white">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="border-[#FF3B3F] hover:bg-[#FF3B3F] hover:text-white dark:border-[#444444] dark:hover:bg-[#444444]"
          >
            <Link to="/admin/login">
              <User size={18} className="mr-2" /> Admin Login
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Button onClick={toggleTheme} variant="ghost" size="icon" className="text-[#333333] hover:text-[#FF3B3F] dark:text-[#D3D3D3] dark:hover:text-white">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          <Button onClick={toggleMobileMenu} variant="ghost" size="icon" className="text-[#333333] hover:text-[#FF3B3F] dark:text-[#D3D3D3] dark:hover:text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF3F3] border-t border-[#E6E6E6] animate-fade-in dark:bg-[#1F1F1F] dark:border-[#333333]">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white" onClick={toggleMobileMenu}>
              Home
            </Link>
            <Link to="/products" className="py-2 text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white" onClick={toggleMobileMenu}>
              Products
            </Link>
            <Link to="/about" className="py-2 text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white" onClick={toggleMobileMenu}>
              About
            </Link>
            <Link to="/contact" className="py-2 text-[#333333] hover:text-[#FF3B3F] transition-colors dark:text-[#D3D3D3] dark:hover:text-white" onClick={toggleMobileMenu}>
              Contact
            </Link>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start border-[#FF3B3F] hover:bg-[#FF3B3F] hover:text-white dark:border-[#444444] dark:hover:bg-[#444444]" 
              asChild
            >
              <Link to="/admin/login">
                <User size={18} className="mr-2" /> Admin Login
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
