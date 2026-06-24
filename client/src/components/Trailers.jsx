import { useState, useEffect } from "react";
import { dummyTrailers } from "../assets/data";
import ReactPlayer from "react-player";
import api from "../api/axiosInstance";

const Trailers = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const [trailerList, setTrailerList] = useState([]);

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await api.get("/api/trailers");
        const { trailers } = response.data;
        console.log("Fetched trailers:", trailers);
        setCurrentTrailer(trailers[0]);
        setTrailerList(trailers);
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    };
    fetchTrailers();
  }, []);

  return (
    <section className="bg-[#111] border-t border-[#222] py-16">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-0.5 bg-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37]">Preview</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#f5f5f5]">
            Trailers
          </h2>
        </div>

        {/* Player + sidebar layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start max-w-[1200px] mx-auto">

          {/* Main player */}
          <div className="w-full lg:flex-1">
            <ReactPlayer
              src={currentTrailer.videoUrl}
              controls={false}
              width="100%"
              height="480px"
            />
          </div>

          {/* Sidebar thumbnails */}
          {trailerList.length > 0 && (
            <div className="w-full lg:w-64 flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest text-[#555] mb-1">
                More Trailers
              </p>
              {trailerList.map((trailer) => {
                const isActive = currentTrailer?.videoUrl === trailer.videoUrl;
                return (
                  <div
                    key={trailer.id}
                    onClick={() => setCurrentTrailer(trailer)}
                    className={`cursor-pointer rounded-lg border-2 transition-all duration-200
                      ${isActive
                        ? "border-[#d4af37] opacity-100"
                        : "border-[#222] opacity-60 hover:opacity-100 hover:border-[#333]"
                      }`}
                  >
                    <img
                      src={trailer.thumbnail}
                      alt="Trailer Thumbnail"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Trailers;