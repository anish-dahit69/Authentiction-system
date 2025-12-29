import { useState, useRef, useEffect } from "react";
import { User, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // console.log("Authenticated User:", user.name, user.email);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
              SecureAuth
            </h1>
          </div>

          {/* Profile Icon with Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden"
              aria-label="Profile menu"
            >
              <span className="text-sm sm:text-base font-semibold">
                {getInitials(user.name)}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
                {/* User Info Section */}
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {user.email}
                  </p>
                </div>

                {/* Admin Dashboard */}

                {user.role === "admin" && (
                  <button
                    onClick={() => {
                      window.location.href =
                        "http://localhost:5174/admin/dashboard";
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 text-sm sm:text-base text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <LayoutDashboard className="w-5 h-5 mr-3 text-blue-600" />
                    <span className="font-medium">Admin Dashboard</span>
                  </button>
                )}

                {/* Divider */}
                <div className="border-t border-gray-200 my-1"></div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm sm:text-base text-gray-700 hover:bg-red-50 transition-colors duration-150"
                >
                  <LogOut className="w-5 h-5 mr-3 text-red-600" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
