import React from "react";
import { Users, Shield, LogOut } from "lucide-react";
import { useSession } from "../hooks/authAdmin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();
  const { getAllUsers, allUsers, loadingUsers, logout } = useSession();
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleLogOut = async () => {
    await logout();
    navigate("/login");
  };

  if (loadingUsers) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading users...</p>
      </div>
    );
  }

  const totalUsers = allUsers.length;
  const totalAdmins = allUsers.filter((u) => u.role === "admin").length;
  return (
    <div className="min-h-screen bg-gray-50 container">
      {/* 
        CONSTRAINT APPLIED: 
        Using only 'container' class. No mx-auto, no padding on the wrapper.
      */}
      <div className="">
        {/* Header Section */}
        <header className="flex items-center justify-between py-8 mb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Authentication Overview</p>
          </div>
          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </header>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Total Users */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Users
              </p>
              <h2 className="text-3xl font-bold text-gray-900">{totalUsers}</h2>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          {/* Card 2: Total Admins */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Administrators
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {totalAdmins}
              </h2>
            </div>
            <div className="p-3 bg-indigo-50 rounded-full">
              <Shield className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
