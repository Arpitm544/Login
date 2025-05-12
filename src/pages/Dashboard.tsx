
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Invalid token
          localStorage.removeItem("authToken");
          setToken(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, [token]);
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };
  
  if (!token) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome to your protected dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="space-y-2">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
          
          <Button 
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
