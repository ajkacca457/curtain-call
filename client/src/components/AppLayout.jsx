import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {!isAdmin && <Navbar />}
      <Outlet />
      {!isAdmin && <Footer />}
    </>
  );
};

export default AppLayout;
