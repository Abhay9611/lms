import React, { useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import {
  Star,
  Cloud,
  Sun,
  Moon,
  BookOpen,
  Icon,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types";

const Login = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Login page mounted, auth state:", {
      isAuthenticated,
      user,
      loading,
    });
  }, [isAuthenticated, user, loading]);

  // If user is already authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    console.log("User authenticated, redirecting...", {
      role: user.role,
      user,
    });

    // Get the intended destination or default to role-based dashboard
    let from = location.state?.from?.pathname;
    if (!from) {
      switch (user.role) {
        case "ADMIN":
          from = "/admin/dashboard";
          break;
        case "TEACHER":
          from = "/teacher/dashboard";
          break;
        case "STUDENT":
          from = "/student/dashboard";
          break;
        default:
          console.warn("Unknown role:", user.role);
          from = "/dashboard";
      }
    }

    console.log("Redirecting to:", from, "for role:", user.role);
    return <Navigate to={from} replace />;
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary/5 to-primary/20 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <ArrowLeft
        className="absolute top-5 left-5 z-20"
        onClick={() => {
          navigate("/");
        }}
      ></ArrowLeft>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial="hidden"
        animate="visible"
      >
        {/* Floating Clouds */}
        <motion.div
          className="absolute top-[10%] left-[10%]"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        >
          <Cloud className="h-20 w-20 text-white/70" />
        </motion.div>

        <motion.div
          className="absolute top-[15%] right-[15%]"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 26,
            ease: "easeInOut",
          }}
        >
          <Cloud className="h-16 w-16 text-white/60" />
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[5%]"
          animate={{
            x: [0, 35, 0],
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 22,
            ease: "easeInOut",
          }}
        >
          <Cloud className="h-24 w-24 text-white/50" />
        </motion.div>

        {/* Twinkling Stars */}
        <motion.div
          className="absolute top-[25%] right-[25%]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }}
        >
          <Star
            className="h-8 w-8 text-lms-yellow fill-lms-yellow"
            strokeWidth={1}
          />
        </motion.div>

        <motion.div
          className="absolute top-[40%] left-[20%]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Star
            className="h-6 w-6 text-lms-yellow fill-lms-yellow"
            strokeWidth={1}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[30%] right-[15%]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.5,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Star
            className="h-10 w-10 text-lms-yellow fill-lms-yellow"
            strokeWidth={1}
          />
        </motion.div>

        {/* Sun */}
        <motion.div
          className="absolute top-[5%] right-[5%]"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        >
          <Sun
            className="h-28 w-28 text-lms-yellow fill-lms-yellow/50"
            strokeWidth={1}
          />
        </motion.div>

        {/* Moon */}
        <motion.div
          className="absolute bottom-[5%] left-[5%]"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        >
          <Moon
            className="h-24 w-24 text-blue-300 fill-blue-200/70"
            strokeWidth={1}
          />
        </motion.div>

        {/* Floating Bubbles */}
        <motion.div
          className="absolute h-12 w-12 top-[60%] right-[30%] rounded-full bg-primary/10"
          animate={{
            y: [0, -100],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute h-8 w-8 top-[70%] right-[40%] rounded-full bg-lms-pink/20"
          animate={{
            y: [0, -80],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        <motion.div
          className="absolute h-16 w-16 bottom-[10%] right-[20%] rounded-full bg-lms-blue/20"
          animate={{
            y: [0, -120],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </motion.div>

      <motion.div
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center">
            <img
              src="/logo.png"
              alt="Aspiring Gems Logo"
              className="h-32 w-80 md:h-32 md:w-80 object-contain"
            />
          </div>

          <motion.p
            className="text-xl text-foreground/80 font-round"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Unlock your learning potential today!
          </motion.p>
        </div>

        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-primary/20 p-8 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <LoginForm />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
