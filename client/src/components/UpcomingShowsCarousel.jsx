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
  if (!upcomingShows?.length) return null;

  return (
    <section className="bg-[#111] border-t border-b border-[#222] py-16">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-8 h-0.5 bg-[#d4af37]" />
            <span className="text-xs uppercase tracking-widest text-[#d4af37]">Coming Soon</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#f5f5f5]">
            Upcoming Shows
          </h2>
        </div>

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
              <div className="rounded-lg border border-[#222] bg-[#111] hover:border-[#333] transition-colors duration-200 overflow-hidden">

                {/* Image */}
                <div className="relative">
                  <img
                    src={show.backdrop_path}
                    alt={show.title}
                    className="w-full h-44 object-cover block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold text-[#f5f5f5] mb-2">
                    {show.title}
                  </h3>
                  {show.tagline && (
                    <p className="text-sm text-[#888] leading-relaxed mb-3 line-clamp-2">
                      {show.tagline}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-px bg-[#d4af37]" />
                    <span className="text-xs text-[#d4af37] tracking-wide">
                      {formatDate(show.release_date)}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UpcomingShowsCarousel;