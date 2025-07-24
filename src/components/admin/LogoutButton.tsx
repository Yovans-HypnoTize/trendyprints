
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // Clear admin login state
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('role');
    
    // Show success message
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    
    // Redirect to login page
    navigate('/admin/login');
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
