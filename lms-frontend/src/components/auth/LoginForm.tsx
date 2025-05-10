import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import RegistrationModal from "@/components/auth/RegistrationModal";
import { UserRole } from "@/types";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import api from "@/lib/api";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showRegistration, setShowRegistration] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRegistration(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('Attempting login with:', { email });
      const response = await api.post('/auth/login', { email, password });
      console.log('Login response:', response.data);
      
      if (response.data.message === 'Login successful') {
        const { token, user: userData } = response.data;
        
        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.firstName}!`,
        });

        // Navigate based on role
        let dashboardPath = "/dashboard";
        switch (userData.role.toUpperCase()) {
          case "ADMIN":
            dashboardPath = "/admin/dashboard";
            break;
          case "TEACHER":
            dashboardPath = "/teacher/dashboard";
            break;
          case "STUDENT":
            dashboardPath = "/student/dashboard";
            break;
          default:
            dashboardPath = "/dashboard";
        }

        console.log('Navigating to:', dashboardPath);
        navigate(dashboardPath);
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      setError(errorMessage);
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="text-sm text-red-500">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center">
          <Button
            variant="link"
            className="p-0"
            onClick={() => setShowForgotPassword(true)}
          >
            Forgot your password?
          </Button>
        </div>
        <div className="text-sm text-center">
          Don't have an account?{" "}
          <Button
            variant="link"
            className="p-0"
            onClick={() => setShowRegistration(true)}
          >
            Sign up
          </Button>
        </div>
      </CardFooter>

      {showRegistration && (
        <RegistrationModal
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
          role={selectedRole || UserRole.STUDENT}
        />
      )}

      {showForgotPassword && (
        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      )}
    </Card>
  );
};

export default LoginForm;
