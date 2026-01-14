import { createContext, useContext } from "react";
import api from "../api/axiosInstance";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { sortShows, SORT_TYPES } from "../lib/utils.js";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [shows, setShows] = useState([]);
  const [sortBy, setSortBy] = useState(SORT_TYPES.NEWEST);
  const [rawShows, setRawShows] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

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
      const { data } = await api.get("/api/user/favorites", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setFavorites(data.shows);
      }
    } catch (error) {
      console.error("Failed to fetch favorites", error);
    } finally {
      setFavoritesLoaded(true);
    }
  };

  const fetchAllShows = async () => {
    try {
      const { data } = await api.get("/api/shows/all-shows");
      if (data.success) {
        const activeShows = data.shows.filter((show) => show.isActive);
        setRawShows(activeShows);
        setShows(sortShows(activeShows, sortBy));
        toast.success("Shows fetched successfully!");
      } else {
        toast.error("Failed to fetch shows.");
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to fetch shows.");
    }
  };

  const toggleFavorite = async (showId) => {
    try {
      const { data } = await api.post(
        "/api/user/favorite",
        { showId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setFavorites((prev) => {
          const exists = prev.some((s) => s._id === showId);
          return exists
            ? prev.filter((s) => s._id !== showId)
            : [...prev, { _id: showId }];
        });
      }
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAdminStatus();
      fetchFavorites(); // added here
    } else {
      setFavorites([]);
      setFavoritesLoaded(false);
    }
  }, [user]);

  useEffect(() => {
    setShows(sortShows(rawShows, sortBy));
  }, [rawShows, sortBy]);

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        shows,
        favorites,
        favoritesLoaded,
        user,
        checkingAdmin,
        sortBy,
        setSortBy,
        fetchAdminStatus,
        fetchFavorites,
        fetchAllShows,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
