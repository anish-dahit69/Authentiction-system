import { createContext, useEffect, useState } from "react";
import { api } from "../api/axiosInstance";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Check authentication status (cookie → JWT → user)
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchProfile();
  }, []);

  // 🔹 Register
  const registerUser = async (data) => {
    try {
      const res = await api.post("/auth/register", data);
      sessionStorage.setItem("email", data.email);
      toast.success("Registered successfully!", {
        icon: "✅",
        style: {
          background: "#22c55e", // Tailwind green-500
          color: "#fff",
          fontWeight: "600",
        },
      });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!", {
        icon: "❌",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: "500",
        },
      });
      throw error;
    }
  };

  // 🔹 Verify email OTP
  const verifyOtp = async ({ email, otp }) => {
    try {
      const res = await api.post("/auth/verifyotp", { email, otp });

      toast.success("OTP verified successfully!", {
        icon: "✅",
        style: { background: "#22c55e", color: "#fff", fontWeight: "600" },
      });

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed!", {
        icon: "❌",
        style: { background: "#ef4444", color: "#fff", fontWeight: "500" },
      });
      throw error;
    }
  };
  const login = async (data) => {
    try {
      const res = await api.post("/auth/login", data);
      await fetchProfile(); // refresh auth state

      toast.success("Logged in successfully!", {
        icon: "✅",
        style: { background: "#22c55e", color: "#fff", fontWeight: "600" },
      });

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        icon: "❌",
        style: { background: "#ef4444", color: "#fff", fontWeight: "500" },
      });
      throw error;
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);

      toast("Logged out successfully!", {
        icon: "🔓",
        style: { background: "#f59e0b", color: "#fff", fontWeight: "600" }, // Tailwind amber-500
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed!", {
        icon: "❌",
        style: { background: "#ef4444", color: "#fff", fontWeight: "500" },
      });
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    registerUser,
    verifyOtp,
    login,
    logout,
    refreshUser: fetchProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
