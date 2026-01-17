import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Loading from "../components/Loading";
import ShowCard from "../components/ShowCard";
import api from "../api/axiosInstance.js";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext.jsx";
import DateSelect from "../components/DateSelect.jsx";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    favorites,
    toggleFavorite,
    favoritesLoaded,
    activeShows,
  } = useAppContext();

  // Suggested shows (dummy for now)
  const SuggestedShows = activeShows
    .filter((item) => item._id !== id)
    .slice(0, 4);

  useEffect(() => {
    const fetchShowAndTimes = async () => {
      setLoading(true);
      try {
        // 1️⃣ Fetch show first
        const { data: showRes } = await api.get(`/api/shows/${id}`);
        if (!showRes.success) {
          toast.error("Failed to fetch show details.");
          setLoading(false);
          return;
        }
        setShow(showRes.show);

        // 2️⃣ Fetch showTimes explicitly
        const { data: timesRes } = await api.get(`/api/admin/show-times/${id}`);
        if (timesRes.success && timesRes.showTimes.length > 0) {
          // Only future showTimes
          const futureShowTimes = timesRes.showTimes.filter(
            (s) => new Date(s.showDateTime) >= new Date()
          );
          setShowTimes(futureShowTimes);
        } else {
          setShowTimes([]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchShowAndTimes();
  }, [id]);

  const isFavorite = favorites.some((s) => s._id === id);

  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(id);
      toast.success(
        isFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } catch (error) {
      console.error("Failed to toggle favorite", error);
      toast.error("Failed to update favorite");
    }
  };

  if (loading || !show || !favoritesLoaded) return <Loading />;

  // Group showTimes by date
  const groupedShowTimes = showTimes.reduce((acc, item) => {
    const date = new Date(item.showDateTime).toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push({
      time: new Date(item.showDateTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      price: item.showPrice,
    });
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[450px] flex items-end"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url(${show.backdrop_path})`,
        }}
      >
        <div className="max-w-6xl mx-auto w-full px-6 py-6 flex gap-6 items-end">
          <div className="relative">
            <img
              src={show.poster_path}
              alt={show.title}
              className="w-40 md:w-52 rounded-xl shadow-lg border-4 border-white"
            />
            {/* Favorite Heart */}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-2 right-2 text-2xl p-2 rounded-full hover:scale-110 transition-transform text-red-500"
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className="text-white space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">{show.title}</h1>
            <p className="italic text-sm">{show.tagline}</p>
            <div className="flex gap-3 flex-wrap text-sm">
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                {new Date(show.release_date).toLocaleDateString()}
              </span>
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                {show.runtime} min
              </span>
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                Rating: {show.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="text-gray-700">{show.overview}</p>
        </div>

        {/* Genres */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {show.genres.map((genre) => (
              <span
                key={genre.name}
                className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* Cast */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {show.casts.slice(0, 12).map((cast, index) => (
              <div key={index} className="text-center">
                <img
                  src={cast.profile_path}
                  alt={cast.name}
                  className="w-full aspect-[3/4] object-cover rounded-xl shadow"
                />
                <p className="mt-2 text-sm">{cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DateSelect */}
      <div className="p-6 max-w-6xl mx-auto">
        {Object.keys(groupedShowTimes).length > 0 ? (
          <DateSelect id={id} dateTime={groupedShowTimes} />
        ) : (
          <div className="p-6 text-center text-red-600 font-semibold text-lg rounded bg-red-100">
            No upcoming showtimes available for this show.
          </div>
        )}
      </div>

      {/* Suggested Shows */}
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-left my-8">
          Other shows you can watch:
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {SuggestedShows.map((s) => (
            <ShowCard key={s._id} show={s} />
          ))}
        </div>

        <div className="flex justify-end">
          <Link
            to="/shows"
            className="text-xl flex items-center gap-x-2 transition-colors duration-100 hover:underline hover:text-blue-950"
          >
            All Shows <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
