import { useState, useEffect } from "react";
import ShowCard from "../components/ShowCard";
import api from "../api/axiosInstance";
import { useAuth } from "@clerk/clerk-react";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = await getToken();
        const { data } = await api.get("/api/user/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setFavorites(data.shows);
        } else {
          toast.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to fetch favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [getToken]);

  if (loading) return <Loading />;

  if (!favorites || favorites.length === 0)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        You have no favorite shows yet.
      </div>
    );

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-left my-8">
        Your Favorite Shows and Events:
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((show) => (
          <ShowCard key={show._id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
