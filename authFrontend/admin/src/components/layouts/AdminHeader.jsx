import React, { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useSession } from "../../hooks/authAdmin";
import { getUserInitials } from "./../../utils/userInitial";

const AdminHeader = () => {
  const { user, loading, logout } = useSession();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-2xl font-bold">LOGO</div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded"
          >
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              {getUserInitials(user?.name)}
            </div>
            <ChevronDown size={16} />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-gray-50 text-left"
                onClick={() => alert("Logout clicked")}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
