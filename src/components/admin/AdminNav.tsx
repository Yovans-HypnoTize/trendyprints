
import { Link, useLocation } from "react-router-dom";
import { User, Lock, PlusCircle, Package, LogOut, Palette, Paintbrush } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      title: "My Profile",
      icon: User,
      href: "/admin/dashboard?tab=profile",
      active: path.includes("/admin/dashboard") && (location.search.includes("tab=profile") || !location.search),
    },
    {
      title: "Change Password",
      icon: Lock,
      href: "/admin/dashboard?tab=change-password",
      active: path.includes("/admin/dashboard") && location.search.includes("tab=change-password"),
    },
    {
      title: "Create Product",
      icon: PlusCircle,
      href: "/admin/dashboard?tab=add-product",
      active: path.includes("/admin/dashboard") && location.search.includes("tab=add-product"),
    },
    {
      title: "View Products",
      icon: Package,
      href: "/admin/dashboard?tab=products",
      active: path.includes("/admin/dashboard") && location.search.includes("tab=products"),
    },
    {
      title: "Customization Templates",
      icon: Paintbrush,
      href: "/admin/dashboard?tab=customization-templates",
      active: path.includes("/admin/dashboard") && location.search.includes("tab=customization-templates"),
    },
  ];

  return (
    <div className="bg-card shadow-md rounded-lg p-4 h-full dark:bg-card">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#B80000] dark:text-white">Admin Panel</h2>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-3 text-sm font-medium rounded-md transition-colors",
              item.active
                ? "bg-[#FF3B3F]/10 text-[#FF3B3F] hover:bg-[#FF3B3F]/20 dark:bg-[#444444]/30 dark:text-white"
                : "text-[#333333] hover:bg-[#F5F5F5] hover:text-[#FF3B3F] dark:text-[#D3D3D3] dark:hover:bg-[#333333] dark:hover:text-white"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
        ))}
        
        <div className="pt-6 mt-6 border-t border-[#E6E6E6] dark:border-[#333333]">
          <Link
            to="/admin/login"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("isAdminAuthenticated");
              window.location.href = "/admin/login";
            }}
            className="flex items-center px-3 py-3 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;
