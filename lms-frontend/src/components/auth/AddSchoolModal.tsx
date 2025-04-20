import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { AlertCircle } from "lucide-react";

interface AddSchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSchoolModal = ({ isOpen, onClose }: AddSchoolModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    schoolName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.schoolName) {
      setError("School name is required");
      return false;
    }

    if (!formData.address) {
      setError("Address is required");
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
      const response = await axios.post("http://localhost:3000/api/schools", formData);

      if (response.data.status === "success") {
        toast({
          title: "School added successfully",
          description: "The school has been added to the list.",
        });
        onClose();
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Failed to add school. Please try again."
      );
      toast({
        title: "Failed to add school",
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
          <DialogTitle className="text-2xl font-bubbly text-center">
            Add New School
          </DialogTitle>
          <DialogDescription className="text-center">
            Enter the details of the new school to add it to the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="schoolName" className="font-round">
              School Name
            </Label>
            <Input
              id="schoolName"
              name="schoolName"
              value={formData.schoolName}
              onChange={handleChange}
              placeholder="Enter school name"
              className="rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="font-round">
              Address
            </Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="rounded-xl"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-destructive p-2 rounded-lg bg-destructive/10">
              <AlertCircle className="h-4 w-4" />
              <p>{error}</p>
            </div>
          )}

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full rounded-xl bg-primary font-bubbly text-white"
              disabled={loading}
            >
              {loading ? "Adding School..." : "Add School"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSchoolModal; 