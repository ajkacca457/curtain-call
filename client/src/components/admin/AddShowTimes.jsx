import { useState } from "react";
import { dummyShowsData } from "../../assets/data";

const AddShows = () => {
  const [selectedShow, setSelectedShow] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">🎭 Add a New Showtime</h1>
      <p className="text-sm text-gray-600 mb-4">Select a show to add a new time slot for.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyShowsData.map((show) => (
          <div
            key={show._id}
            onClick={() => setSelectedShow(show)}
            className={`border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition ${
              selectedShow?._id === show._id ? "border-sky-500" : "border-gray-200"
            }`}
          >
            <img src={show.poster_path} alt={show.title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{show.title}</h2>
              <p className="text-sm text-gray-500 italic mb-2">{show.tagline}</p>
              <div className="text-sm text-gray-700">
                ⭐ <span className="text-yellow-500 font-semibold">{show.vote_average}</span>{" "}
                <span className="text-gray-400">({show.vote_count} votes)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedShow && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-sky-600 mb-2">Selected Show:</h3>
          <p className="text-md font-medium">{selectedShow.title}</p>
        </div>
      )}
    </div>
  );
};

export default AddShows;
