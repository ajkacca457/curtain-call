import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dummyShowsData, dummyDateTimeData } from "../assets/data";
import DateSelect from "../components/DateSelect";
import ShowCard from "../components/ShowCard";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const ShowDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const SuggestedShows = dummyShowsData
    .filter((item) => item._id !== id)
    .slice(0, 4);

  useEffect(() => {
    const showData = dummyShowsData.find((show) => show._id === id);
    setShow({
      showInfo: showData,
      dateTime: dummyDateTimeData,
    });
  }, [id]);

  if (!show) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading show details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[450px] flex items-end"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url(${show.showInfo.backdrop_path})`,
        }}
      >
        <div className="max-w-6xl mx-auto w-full px-6 py-6 flex gap-6 items-end">
          <img
            src={show.showInfo.poster_path}
            alt={show.showInfo.title}
            className="w-40 md:w-52 rounded-xl shadow-lg border-4 border-white"
          />
          <div className="text-white space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              {show.showInfo.title}
            </h1>
            <p className="italic text-sm">{show.showInfo.tagline}</p>
            <div className="flex gap-3 flex-wrap text-sm">
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                {new Date(show.showInfo.release_date).toLocaleDateString()}
              </span>
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                {show.showInfo.runtime} min
              </span>
              <span className="px-2 py-1 rounded bg-white/10 border border-white/20">
                Rating: {show.showInfo.vote_average.toFixed(1)}
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
          <p className="text-gray-700">{show.showInfo.overview}</p>
        </div>

        {/* Genres */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {show.showInfo.genres.map((genre) => (
              <span
                key={genre.id}
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
            {show.showInfo.casts.slice(0, 12).map((cast, index) => (
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
        {/*date select*/}
        <DateSelect dateTime={show.dateTime} id={show.showInfo._id} />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-left my-8">
          Other shows you can watch:
        </h1>
        <div className="grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SuggestedShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>

        <div className="flex justify-end">
          <Link to="/shows" className="text-xl flex items-center gap-x-2 transition-colors duration-100 hover:underline hover:text-blue-950">
            All Shows <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
