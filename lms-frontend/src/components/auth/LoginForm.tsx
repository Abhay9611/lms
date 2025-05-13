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
      console.log("Attempting login...", { email });
      const user = await login(email, password);
      console.log("Login successful, user:", { id: user.id, role: user.role });

      // Show success message
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.firstName}!`,
      });

      // Navigate based on role
      let dashboardPath = "/dashboard";
      switch (user.role) {
        case "ADMIN":
          dashboardPath = "/admin";
          break;
        case "TEACHER":
          dashboardPath = "/teacher";
          break;
        case "STUDENT":
          dashboardPath = "/student";
          break;
        default:
          console.warn("Unknown role:", user.role);
          dashboardPath = "/dashboard";
      }

      console.log("Navigating to:", dashboardPath, "for role:", user.role);
      navigate(dashboardPath);
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
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
              disabled={loading}
              className="bg-white"
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
              disabled={loading}
              className="bg-white"
            />
            <Button
              variant="link"
              className="text-sm text-primary"
              onClick={() => setShowForgotPassword(true)}
              disabled={loading}
            >
              Forgot Password?
            </Button>
          </div>
          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center">
        <p className="text-sm text-gray-500 text-current">
          Don't have an account?{" "}
        </p>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="px-8"
            onClick={() => handleRoleSelect(UserRole.STUDENT)}
            disabled={loading}
          >
            Register as Student
          </Button>
          <Button
            variant="link"
            className="px-8"
            onClick={() => handleRoleSelect(UserRole.TEACHER)}
            disabled={loading}
          >
            Register as Teacher
          </Button>
        </CardFooter>
      </CardFooter>
      {showRegistration && selectedRole && (
        <RegistrationModal
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
          role={selectedRole}
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
