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

  const visibleShows = featured.slice(0, visibleCount);

  if (loading) {
    return (
      <section className="max-w-[1600px] mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-0.5 bg-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37]">Featured</span>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-96 bg-[#1a1a1a] rounded-lg animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!visibleShows.length) return null;

  return (
    <section className="max-w-[1600px] mx-auto px-6 py-16">
      {/* Section heading */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-8 h-0.5 bg-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37]">Featured</span>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#f5f5f5]">
          Featured Shows
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6 mb-10">
        {visibleShows.map((show) => (
          <ShowCard key={show._id || show.id} show={show} />
        ))}
      </div>

      {visibleCount < featured.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-8 py-2.5 text-xs uppercase tracking-widest border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default FeaturedShows;