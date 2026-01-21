import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useAppContext } from "../context/AppContext";
import Loading from "./Loading.jsx";
import { formatDate } from "../lib/utils.js";

const UpcomingShowsCarousel = () => {
  const { upcomingShows, loadingShows } = useAppContext();

  if (loadingShows) return <Loading />;
  if (!upcomingShows?.length) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Upcoming Shows
        </h2>
        <p className="text-gray-500">No upcoming shows available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Upcoming Shows
      </h2>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {upcomingShows.map((show) => (
          <SwiperSlide key={show._id}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden h-full">
              <img
                src={show.backdrop_path}
                alt={show.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {show.title}
                </h3>

                {show.tagline && (
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {show.tagline}
                  </p>
                )}

                <p className="text-gray-600 text-sm">
                  Release Date:{" "}
                  <span className="font-medium">
                    {formatDate(show.release_date)}
                  </span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingShowsCarousel;
