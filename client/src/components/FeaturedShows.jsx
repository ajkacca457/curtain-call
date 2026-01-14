import { dummyShowsData } from "../assets/data";
import ShowCard from "./ShowCard";
import { useState, useEffect } from "react";
import api from "../api/axiosInstance.js";

const FeaturedShows = () => {
  const [featured, setFeatured] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedShows = async () => {
      try {
        const res = await api.get("/api/shows/featured");
        const { shows } = res.data;
        setFeatured(Array.isArray(shows) ? shows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : []);
      } catch (error) {
        console.error("Error fetching featured shows:", error);
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedShows();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleShows = Array.isArray(featured)
    ? featured.slice(0, visibleCount)
    : [];

  if (loading) {
    return <p className="p-6 text-gray-500">Loading featured shows...</p>;
  }

  if (!visibleShows.length) {
    return <p className="p-6 text-gray-500">No featured shows available.</p>;
  }

  return (
    <section className="max-w-[1600px] mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">🎭 Featured Shows</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {visibleShows.map((show) => (
          <ShowCard key={show._id || show.id} show={show} />
        ))}
      </div>

      {visibleCount < featured.length && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 text-sm font-medium bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedShows;
