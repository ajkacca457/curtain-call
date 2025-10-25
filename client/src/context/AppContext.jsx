import { createContext, useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;


const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const { user } = useUser();
    const {getToken} = useAuth(); 

    const fetchAdminStatus = async () => {
       try {
           const data = await axios.get(`/users/${user.id}/admin-status`, {
               headers: {
                   Authorization: `Bearer ${await getToken()}`,
               },
           });
           setIsAdmin(data.isAdmin);

           if(!data.isAdmin && location.pathname.startsWith("/admin")) {
               <Navigate to="/" />;
               toast.error("Access denied. Admins only.");
           }

       } catch (error) {
            console.error("Error fetching admin status:", error);
       }
    };


  return (
    <AppContext.Provider value={{ isAdmin, shows, favorites }}>
      {children}
    </AppContext.Provider>
  );
};



export const useAppContext = () => {
  return useContext(AppContext);
};