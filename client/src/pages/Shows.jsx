import { dummyShowsData } from "../assets/data";
import ShowCard from "../components/ShowCard";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Shows = () => {
  const { shows, fetchAllShows } = useAppContext();

  useEffect(() => {
    fetchAllShows();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-left my-8">
        All Shows and Events:
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default Shows;
