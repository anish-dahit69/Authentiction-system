import React from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AdminHeader />
      <main className="container flex-1 overflow-auto pt-16">
        <div className="flex h-full">
          <AdminSidebar />
          <div className="flex-1 ml-64 p-8 ">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
