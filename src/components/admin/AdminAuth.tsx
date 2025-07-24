
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AdminAuthProps {
  children: React.ReactNode;
}

const AdminAuth = ({ children }: AdminAuthProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    
    if (!adminLoggedIn) {
      toast({
        title: "Access denied",
        description: "Please log in to access the admin dashboard",
        variant: "destructive",
      });
      navigate('/admin/login');
    }
  }, [navigate, toast]);

  return <>{children}</>;
};

export default AdminAuth;
