import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, UserCog, Palette } from "lucide-react";

const AdminSidebar = () => {
  const baseClass = "block rounded-lg transition";

  const itemClass = ({ isActive }) =>
    `${baseClass} ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`;

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        <NavLink
          to="/admin/dashboard"
          className={itemClass}
        >
          <div className="flex items-center space-x-3 px-4 py-3">
            <Home size={20} />
            <span>Dashboard</span>
          </div>
        </NavLink>

        <NavLink
          to="/admin/users"
          className={itemClass}
        >
          <div className="flex items-center space-x-3 px-4 py-3">
            <Users size={20} />
            <span>Users</span>
          </div>
        </NavLink>

        <NavLink
          to="/admin/manage-users"
          className={itemClass}
        >
          <div className="flex items-center space-x-3 px-4 py-3">
            <UserCog size={20} />
            <span>Manage Users</span>
          </div>
        </NavLink>

        <NavLink
          to="/admin/theme"
          className={itemClass}
        >
          <div className="flex items-center space-x-3 px-4 py-3">
            <Palette size={20} />
            <span>Theme</span>
          </div>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
