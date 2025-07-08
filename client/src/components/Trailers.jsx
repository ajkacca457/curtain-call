import { useState } from "react";
import { dummyTrailers } from "../assets/data";
import ReactPlayer from "react-player";

const Trailers = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🎬 Trailers</h2>
      <div className="flex justify-center mb-6">
        <ReactPlayer
          src={currentTrailer.videoUrl}
          controls={false}
          width="960px"
          height="540px"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[1000px] mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.id}
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="Trailer Thumbnail"
              className="w-full h-full object-cover rounded mr-4"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trailers;
