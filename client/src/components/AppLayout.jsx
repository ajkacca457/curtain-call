import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "../context/AppContext.jsx";

const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <AppProvider>
      <Toaster position="top-right" reverseOrder={false} />
      {!isAdmin && <Navbar />}
      <Outlet />
      {!isAdmin && <Footer />}
    </AppProvider>
  );
};

export default AppLayout;
