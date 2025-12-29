import React, { useState } from "react";
import {
  Home,
  Users,
  UserCog,
  Palette,
  ChevronDown,
  LogOut,
} from "lucide-react";

// Mock Link component - replace with your actual React Router Link
const Link = ({ to, children, className }) => {
  return (
    <a
      href={to}
      className={className}
    >
      {children}
    </a>
  );
};

export default function AdminDashboard({ children }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Get current path to highlight active menu item
  const currentPath = window.location.pathname;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50">
        <div className="flex items-center">
          <div className="text-2xl font-bold">LOGO</div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded"
          >
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-semibold">
              A
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
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex pt-16 h-full">
        {/* Fixed Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Link
              to="/admin/dashboard"
              className={`block rounded-lg transition ${
                currentPath === "/admin/dashboard" ||
                currentPath === "/admin" ||
                currentPath === "/admin/"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3 px-4 py-3">
                <Home size={20} />
                <span>Dashboard</span>
              </div>
            </Link>

            <Link
              to="/admin/users"
              className={`block rounded-lg transition ${
                currentPath === "/admin/users"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3 px-4 py-3">
                <Users size={20} />
                <span>Users</span>
              </div>
            </Link>

            <Link
              to="/admin/manage-users"
              className={`block rounded-lg transition ${
                currentPath === "/admin/manage-users"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3 px-4 py-3">
                <UserCog size={20} />
                <span>Manage Users</span>
              </div>
            </Link>

            <Link
              to="/admin/theme"
              className={`block rounded-lg transition ${
                currentPath === "/admin/theme"
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center space-x-3 px-4 py-3">
                <Palette size={20} />
                <span>Theme</span>
              </div>
            </Link>
          </nav>
        </aside>

        {/* Dynamic Content Area - Children will render here */}
        <main className="flex-1 ml-64 p-8 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
