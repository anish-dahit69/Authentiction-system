import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-outfit">
      <Header />
      <main className="container flex flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
