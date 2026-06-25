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
import { useUser } from "@clerk/clerk-react";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [showTimes, setShowTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { favorites, toggleFavorite, favoritesLoaded, suggestedShowsPool } = useAppContext();

  const SuggestedShows = suggestedShowsPool.filter((item) => item._id !== id).slice(0, 4);

  useEffect(() => {
    const fetchShowAndTimes = async () => {
      setLoading(true);
      try {
        const { data: showRes } = await api.get(`/api/shows/${id}`);
        if (!showRes.success) { toast.error("Failed to fetch show details."); setLoading(false); return; }
        setShow(showRes.show);
        const { data: timesRes } = await api.get(`/api/admin/show-times/${id}`);
        if (timesRes.success && timesRes.showTimes.length > 0) {
          setShowTimes(timesRes.showTimes.filter((s) => new Date(s.showDateTime) >= new Date()));
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
      toast.success(isFavorite ? "Removed from favourites" : "Added to favourites");
    } catch {
      toast.error("Failed to update favourite");
    }
  };

  if (loading || !show) return <Loading />;
  if (user && !favoritesLoaded) return <Loading />;

  const groupedShowTimes = showTimes.reduce((acc, item) => {
    const date = new Date(item.showDateTime).toISOString().split("T")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push({
      time: new Date(item.showDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      price: item.showPrice,
    });
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Backdrop hero */}
      <div
        className="relative h-[480px] flex items-end bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.1) 100%), url(${show.backdrop_path})` }}
      >
        <div className="max-w-[1000px] mx-auto w-full px-6 pb-10 flex gap-8 items-end">

          {/* Poster */}
          <div className="relative flex-shrink-0">
            <img
              src={show.poster_path}
              alt={show.title}
              className="w-40 rounded-lg border-2 border-[#333] shadow-[0_8px_32px_rgba(0,0,0,0.6)] block"
            />
            <button
              onClick={handleToggleFavorite}
              disabled={!user || !favoritesLoaded}
              className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center
                bg-[#0a0a0a]/70 border border-[#333] transition-colors duration-200
                ${!user ? "cursor-not-allowed" : "cursor-pointer"}
                ${isFavorite ? "text-[#e05252]" : "text-[#888] hover:text-[#e05252]"}`}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {/* Title area */}
          <div>
            {show.tagline && (
              <p className="text-sm italic text-[#d4af37] mb-2">{show.tagline}</p>
            )}
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#f5f5f5] leading-tight mb-4">
              {show.title}
            </h1>
            <div className="flex gap-2 flex-wrap">
              {[
                new Date(show.release_date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" }),
                `${show.runtime} min`,
                `★ ${show.vote_average.toFixed(1)}`,
              ].map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1.5 bg-white/5 border border-[#333] rounded text-[#888]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1000px] mx-auto px-6 py-12">

        {/* Overview */}
        <div className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-[#f5f5f5] mb-3">Overview</h2>
          <div className="w-8 h-0.5 bg-[#d4af37] mb-4" />
          <p className="text-sm leading-relaxed text-[#888]">{show.overview}</p>
        </div>

        {/* Genres */}
        <div className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-[#f5f5f5] mb-3">Genres</h2>
          <div className="w-8 h-0.5 bg-[#d4af37] mb-4" />
          <div className="flex gap-2 flex-wrap">
            {show.genres.map((genre) => (
              <span key={genre.name} className="text-xs uppercase tracking-wider text-[#d4af37] border border-[#a8892a] rounded px-3 py-1">
                {genre.name}
              </span>
            ))}
          </div>
        </div>

        {/* Cast */}
        {(show.casts || []).length > 0 && (
          <div className="mb-12">
            <h2 className="font-serif text-xl font-semibold text-[#f5f5f5] mb-3">Cast</h2>
            <div className="w-8 h-0.5 bg-[#d4af37] mb-5" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-4">
              {(show.casts || []).slice(0, 12).map((cast, index) => (
                <div key={index} className="text-center">
                  <img
                    src={cast.profile_path}
                    alt={cast.name}
                    className="w-full aspect-[3/4] object-cover rounded-lg mb-2 border border-[#222]"
                  />
                  <p className="text-xs text-[#888] leading-snug">{cast.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date selection */}
        {user ? (
          Object.keys(groupedShowTimes).length > 0 ? (
            <DateSelect id={id} dateTime={groupedShowTimes} />
          ) : (
            <div className="p-6 text-center border border-[#222] rounded-lg bg-[#111] text-sm text-[#888]">
              No upcoming showtimes available for this show.
            </div>
          )
        ) : (
          <div className="p-6 text-center border border-[#a8892a] rounded-lg bg-[#d4af37]/10 text-sm text-[#d4af37]">
            Sign in to book tickets for this show.
          </div>
        )}
      </div>

      {/* Suggested shows */}
      {SuggestedShows.length > 0 && (
        <div className="border-t border-[#222] py-12">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-serif text-2xl font-bold text-[#f5f5f5]">You May Also Like</h2>
              <Link to="/shows" className="flex items-center gap-2 text-sm text-[#d4af37] no-underline hover:opacity-80 transition-opacity">
                All Shows <FaArrowRightLong />
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
              {SuggestedShows.map((s) => <ShowCard key={s._id} show={s} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;