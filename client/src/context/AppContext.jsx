import { createContext, useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;


const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favorites, setFavorites] = useState([]);


  return (
    <AppContext.Provider value={{ isAdmin, shows, favorites }}>
      {children}
    </AppContext.Provider>
  );
};



export const useAppContext = () => {
  return useContext(AppContext);
};