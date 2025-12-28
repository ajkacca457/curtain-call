import { createContext, useContext } from "react";
import api from "../api/axiosInstance";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [shows, setShows] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchAdminStatus = async () => {
    try {
      const { data } = await api.get(`/api/admin/is-admin`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setIsAdmin(data.isAdmin);
      console.log("Admin status:", data);
    } catch (error) {
      console.error("Error fetching admin status:", error);
      setIsAdmin(false);
    } finally {
      setCheckingAdmin(false); 
    }
  };

  const fetchFavorites = async () => {
    try {
      const data = await api.get(`/api/users/favorites`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setFavorites(data.favorites);
        toast.success("Favorites fetched successfully!");
      } else {
        toast.error("Failed to fetch favorites.");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchAllShows= async()=> {
    try {
      const {data}= await api.get("/api/shows/all-shows");
      if(data.success){
        const activeShows= data.shows.filter(show=> show.isActive);
      setShows(activeShows);
      toast.success("Shows fetched successfully!");
      } else {
        toast.error("Failed to fetch shows.");
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to fetch shows.");
    }
  }

  useEffect(() => {
    if (user) {
      fetchAdminStatus();
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        shows,
        favorites,
        user,
        checkingAdmin,
        fetchAdminStatus,
        fetchFavorites,
        fetchAllShows
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
