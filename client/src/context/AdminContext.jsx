import { createContext, useContext, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { getToken } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const res = await api.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(res.data.dashboardData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to fetch dashboard data");
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const token = await getToken();
      const res = await api.get("/api/admin/all-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecentBookings(res.data.bookings.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recent bookings:", error);
      toast.error("Failed to fetch recent bookings");
    }
  };

  const fetchAllAdminData = async () => {
    await Promise.all([fetchDashboardData(), fetchRecentBookings()]);
  };

  return (
    <AdminContext.Provider
      value={{
        dashboardData,
        recentBookings,
        fetchDashboardData,
        fetchRecentBookings,
        fetchAllAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
