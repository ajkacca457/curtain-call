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
  const [activeShows, setActiveShows] = useState([]);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [suggestedShowsPool, setSuggestedShowsPool] = useState([]);
  const [loadingShows, setLoadingShows] = useState(true);
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

  const fetchActiveShows = async () => {
    try {
      const { data } = await api.get("/api/shows/active-shows");
      if (data.success) {
        setRawShows(data.shows);
        setActiveShows(sortShows(data.shows, sortBy));
      } else {
        toast.error("Failed to fetch shows.");
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to fetch shows.");
    }
  };

  const fetchAllShows = async () => {
    try {
      const { data } = await api.get("/api/shows/all-shows");
      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error("Failed to fetch shows.");
      }
    } catch (error) {
      console.error("Error fetching shows:", error);
      toast.error("Failed to fetch shows.");
    }
  };

  const fetchUpcomingAndSuggestedPool = async () => {
    setLoadingShows(true);
    try {
      const { data: upcomingData } = await api.get("/api/shows/upcoming-shows");
      if (upcomingData.success) {
        setUpcomingShows(upcomingData.shows);
      }

      const { data: allData } = await api.get("/api/shows/all-shows");
      if (allData.success) {
        setSuggestedShowsPool(allData.shows);
      }
    } catch (error) {
      console.error("Failed to fetch upcoming or all shows:", error);
      toast.error("Failed to fetch shows.");
    } finally {
      setLoadingShows(false);
    }
  };

  // const toggleFavorite = async (showId) => {
  //   try {
  //     const { data } = await api.post(
  //       "/api/user/favorite",
  //       { showId },
  //       { headers: { Authorization: `Bearer ${await getToken()}` } },
  //     );

  //     if (data.success) {
  //       setFavorites((prev) => {
  //         const exists = prev.some((s) => s._id === showId);
  //         return exists
  //           ? prev.filter((s) => s._id !== showId)
  //           : [...prev, { _id: showId }];
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to toggle favorite", error);
  //   }
  // };

  const toggleFavorite = async (showId) => {
    try {
      const { data } = await api.post(
        "/api/user/favorite",
        { showId },
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );

      if (data.success) {
        await fetchFavorites(); // re-fetch instead of optimistic update
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
    setActiveShows(sortShows(rawShows, sortBy));
  }, [rawShows, sortBy]);

  useEffect(() => {
    fetchUpcomingAndSuggestedPool();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAdmin,
        activeShows,
        favorites,
        favoritesLoaded,
        user,
        checkingAdmin,
        sortBy,
        shows,
        upcomingShows,
        loadingShows,
        suggestedShowsPool,
        setSortBy,
        fetchAdminStatus,
        fetchFavorites,
        fetchActiveShows,
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
