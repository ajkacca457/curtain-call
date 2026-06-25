import { useEffect, useState } from "react";
import ShowCard from "../components/ShowCard";
import { useAppContext } from "../context/AppContext";
import ShowSorting from "../components/ShowSorting";

const Shows = () => {
  const { activeShows, fetchActiveShows } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getShows = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await fetchActiveShows();
      } catch (err) {
        setError("Failed to fetch shows. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getShows();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12">

      {/* Page header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-8 h-0.5 bg-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37]">Browse</span>
        </div>
        <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#f5f5f5]">
          All Shows & Events
        </h1>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 rounded-full border-2 border-[#333] border-t-[#d4af37] animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-[#e05252] py-16">{error}</p>
      )}

      {/* Empty */}
      {!isLoading && !error && activeShows.length === 0 && (
        <p className="text-center text-[#888] py-16">
          No shows available at the moment. Please check back later.
        </p>
      )}

      {/* Shows grid */}
      {!isLoading && !error && activeShows.length > 0 && (
        <>
          <ShowSorting />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
            {activeShows.map((show) => (
              <ShowCard key={show._id || show.id} show={show} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Shows;