import { createContext, useContext, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { getToken } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [showTimes, setShowTimes] = useState([]);

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

  const fetchListShows = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.warn("No token found, skipping fetch.");
        return;
      }

      const response = await api.get("/api/admin/all-shows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Fetched shows:", response.data);
      setShowTimes(response.data.showTimes || []);
    } catch (error) {
      console.error("❌ Error fetching shows:", error);
    } 
  };

  return (
    <AdminContext.Provider
      value={{
        showTimes,
        fetchListShows,
        dashboardData,
        fetchDashboardData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
