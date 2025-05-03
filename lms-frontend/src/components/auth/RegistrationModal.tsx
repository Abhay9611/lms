import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GraduationCap, BookText, School, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

const RegistrationModal = ({
  isOpen,
  onClose,
  role,
}: RegistrationModalProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    activationCode: "",
    schoolId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [schoolsList, setSchoolsList] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await axios.get(`https://${import.meta.env.VITE_API_URL}/schools`);
      setSchoolsList(response.data);
      console.log("Fetched schools:", response.data);
    };
    fetchSchools();
  }, []);


  const grades = [
    { value: "Play Home", label: "Play Group" },
    { value: "Pre-nursery", label: "Nursery" },
    { value: "LKG", label: "LKG" },
    { value: "UKG", label: "UKG" },
  ];

  const getRoleIcon = () => {
    switch (role) {
      case UserRole.STUDENT:
        return <GraduationCap className="h-8 w-8 text-lms-blue" />;
      case UserRole.TEACHER:
        return <BookText className="h-8 w-8 text-lms-green" />;
      case UserRole.ADMIN:
        return <School className="h-8 w-8 text-lms-pink" />;
      default:
        return null;
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case UserRole.STUDENT:
        return "bg-lms-blue";
      case UserRole.TEACHER:
        return "bg-lms-green";
      case UserRole.ADMIN:
        return "bg-lms-pink";
      default:
        return "bg-primary";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError("First name and last name are required");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (role === UserRole.STUDENT && !formData.activationCode) {
      setError("Activation code is required for students");
      return false;
    }
    if (role === UserRole.TEACHER && !formData.activationCode) {
      setError("School code is required for teachers");
      return false;
    }
    if (role === UserRole.STUDENT && !formData.grade) {
      setError("Grade level is required for students");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://${import.meta.env.VITE_API_URL}/auth/register`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: role,
          grade: formData.grade,
          // grade: formData.grade === 'Nursery' ? 'Pre-nursery' : formData.grade,
          activationCode: formData.activationCode,
          schoolId: formData.schoolId,
        }
      );

      if (response.data.status === "success") {
        toast({
          title: "Registration successful",
          description: "Welcome to Aspiring Gems!",
        });

        // Login the user after successful registration
        await login(formData.email, formData.password);
        navigate("/");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
      toast({
        title: "Registration failed",
        description: error.response?.data?.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl border-4 border-dashed">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {getRoleIcon()}
          </div>
          <DialogTitle className="text-2xl font-bubbly text-center">
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </DialogTitle>
          <DialogDescription className="text-center">
            Create your account to access personalized learning resources.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="font-round">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="font-round">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="rounded-xl"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-round">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-round">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min. 6 characters)"
              className="rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-round">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="rounded-xl"
              required
            />
          </div>

          {role === UserRole.STUDENT && (
            <div className="space-y-2">
              <Label htmlFor="grade" className="font-round">
                Grade Level
              </Label>
              <Select
                value={formData.grade}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, grade: value }))
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {grades.map((g) => (
                    <SelectItem
                      key={g.value}
                      value={g.value}
                      className="font-round"
                    >
                      {g.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {role === UserRole.STUDENT && (
            <div className="space-y-2">
              <Label htmlFor="schoolId" className="font-round">
                School Name
              </Label>
              <Select
                value={formData.schoolId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, schoolId: value }))
                }
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select school" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {schoolsList.map((g) => (
                    <SelectItem
                      key={g.value}
                      value={g.name}
                      className="font-round"
                    >
                      {g.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {role === UserRole.STUDENT && (
            <div className="space-y-2">
              <Label htmlFor="activationCode" className="font-round">
                Activation Code
              </Label>
              <Input
                id="activationCode"
                name="activationCode"
                value={formData.activationCode}
                onChange={handleChange}
                placeholder="Enter your activation code"
                className="rounded-xl"
                required
              />
              <p className="text-xs text-muted-foreground">
                Please refer the scratch card behind the book for the activation code.
              </p>
            </div>
          )}

          {role === UserRole.TEACHER && (
            <div className="space-y-2">
              <Label htmlFor="activationCode" className="font-round">
                School Code
              </Label>
              <Input
                id="activationCode"
                name="activationCode"
                value={formData.activationCode}
                onChange={handleChange}
                placeholder="Enter your school code"
                className="rounded-xl"
                required
              />
              <p className="text-xs text-muted-foreground">
                Please refer school administrator for the school code.
              </p>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive p-2 rounded-lg bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className={`w-full rounded-xl ${getRoleColor()} font-bubbly text-white`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Create Account"}
            </Button>
          </DialogFooter>

          <div className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto font-medium text-primary"
              onClick={() => {
                onClose();
                navigate("/login");
              }}
            >
              Sign In
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
