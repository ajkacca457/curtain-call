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
        await fetchActiveShows(); // fetch shows from API
      } catch (err) {
        setError("Failed to fetch shows. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getShows();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-left my-8">
        All Shows and Events:
      </h1>

      {isLoading && (
        <p className="text-gray-600 text-lg text-center py-12">
          Loading shows...
        </p>
      )}

      {error && (
        <p className="text-red-600 text-lg text-center py-12">{error}</p>
      )}

      {!isLoading && !error && activeShows.length === 0 && (
        <p className="text-gray-600 text-lg text-center py-12">
          No shows available at the moment. Please check back later.
        </p>
      )}

      {!isLoading && !error && activeShows.length > 0 && (
        <>
        <ShowSorting />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {activeShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
        </>
      )}
    </div>
  );
};

export default Shows;
