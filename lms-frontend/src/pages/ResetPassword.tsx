import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match." });
      return;
    }

    const token = new URLSearchParams(location.search).get("token");
    if (!token) {
      toast({ title: "Error", description: "Invalid or missing token." });
      return;
    }

    try {
      const response = await axios.post(`https://${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        token,
        newPassword,
      });

      if (response.status === 200) {
        toast({ title: "Success", description: "Password reset successfully." });
        navigate("/login");
      } else {
        toast({ title: "Error", description: "Failed to reset password." });
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast({ title: "Error", description: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-primary/20 p-4 overflow-hidden relative">
      <motion.div
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>

        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-primary/20 p-8 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full bg-primary text-white">
              Reset Password
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResetPassword; 