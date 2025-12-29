import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "./../api/adminAxios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

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

  // get all users

  const getAllUsers = async () => {
    try {
      setLoadingUsers(true);
      const allUsers = await api.get("/admin/users");
      setAllUsers(allUsers.data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const getUserById = async (id) => {
    try {
      const res = await api.get(`/admin/users/${id}`);
      return res.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
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

  const deleteUser = async (userId) => {
    try {
      await api.delete(`/admin/users/${userId}`);
      // Optionally, refresh the user list or update state here
      getAllUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
      throw error;
    }
  };

  const value = {
    user,
    loading,
    getAllUsers,
    getUserById,
    allUsers,
    loadingUsers,
    logout,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
