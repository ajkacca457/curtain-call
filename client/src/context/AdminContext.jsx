import { createContext, useContext, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const { getToken } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);

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

  return (
    <AdminContext.Provider
      value={{
        dashboardData,
        fetchDashboardData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
