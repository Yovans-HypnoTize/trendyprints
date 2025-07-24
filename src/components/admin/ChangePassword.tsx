
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Lock } from "lucide-react";

const ChangePassword = () => {
  const { toast } = useToast();
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      current: "",
      new: "",
      confirm: ""
    };

    if (!passwords.current) {
      newErrors.current = "Current password is required";
      isValid = false;
    }

    if (!passwords.new) {
      newErrors.new = "New password is required";
      isValid = false;
    } else if (passwords.new.length < 8) {
      newErrors.new = "Password must be at least 8 characters";
      isValid = false;
    }

    if (passwords.new !== passwords.confirm) {
      newErrors.confirm = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // In a real app, this would be an API call to change password
    // For demo purposes, we're just checking if the current password is "admin123"
    if (passwords.current !== "admin123") {
      setErrors(prev => ({
        ...prev,
        current: "Current password is incorrect"
      }));
      return;
    }

    toast({
      title: "Password updated",
      description: "Your password has been changed successfully."
    });

    // Reset form
    setPasswords({
      current: "",
      new: "",
      confirm: ""
    });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account password
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input
              id="current"
              name="current"
              type="password"
              value={passwords.current}
              onChange={handleInputChange}
            />
            {errors.current && (
              <p className="text-sm font-medium text-destructive">{errors.current}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new">New Password</Label>
            <Input
              id="new"
              name="new"
              type="password"
              value={passwords.new}
              onChange={handleInputChange}
            />
            {errors.new && (
              <p className="text-sm font-medium text-destructive">{errors.new}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              value={passwords.confirm}
              onChange={handleInputChange}
            />
            {errors.confirm && (
              <p className="text-sm font-medium text-destructive">{errors.confirm}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            <Lock className="h-4 w-4 mr-2" /> Update Password
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ChangePassword;
