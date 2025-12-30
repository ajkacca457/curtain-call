import ShowCard from "../components/ShowCard";
import { useAppContext } from "../context/AppContext.jsx";
import { useEffect } from "react";

const Favorite = () => {
  const { favorites, favoritesLoaded, fetchFavorites } = useAppContext();

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (!favoritesLoaded)
    return <div className="text-center py-20">Loading...</div>;

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
        {favorites
          .filter(show => show && show._id) // ensure show is valid
          .map(show => (
            <ShowCard key={show._id} show={show} />
          ))}
      </div>
    </div>
  );
};

export default Favorite;
