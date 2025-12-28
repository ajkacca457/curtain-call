import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const dummyShows = [
  {
    id: 1,
    title: "Phantom of the Opera",
    date: "2026-01-15",
    time: "19:00",
    venue: "Grand Theater, NYC",
    image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?_gl=1*jgo6lp*_ga*MTY0NTM4NTA1OC4xNzY2OTYyOTgy*_ga_8JE65Q40S6*czE3NjY5NjI5ODIkbzEkZzEkdDE3NjY5NjMwMDIkajQwJGwwJGgw"
  },
  {
    id: 2,
    title: "Hamilton",
    date: "2026-01-20",
    time: "20:00",
    venue: "Broadway, NYC",
    image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?_gl=1*jgo6lp*_ga*MTY0NTM4NTA1OC4xNzY2OTYyOTgy*_ga_8JE65Q40S6*czE3NjY5NjI5ODIkbzEkZzEkdDE3NjY5NjMwMDIkajQwJGwwJGgw"
  },
  {
    id: 3,
    title: "Les Misérables",
    date: "2026-01-25",
    time: "18:30",
    venue: "Imperial Theater, NYC",
    image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?_gl=1*jgo6lp*_ga*MTY0NTM4NTA1OC4xNzY2OTYyOTgy*_ga_8JE65Q40S6*czE3NjY5NjI5ODIkbzEkZzEkdDE3NjY5NjMwMDIkajQwJGwwJGgw"
  },
  {
    id: 4,
    title: "Wicked",
    date: "2026-02-01",
    time: "19:30",
    venue: "Majestic Theater, NYC",
    image: "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?_gl=1*jgo6lp*_ga*MTY0NTM4NTA1OC4xNzY2OTYyOTgy*_ga_8JE65Q40S6*czE3NjY5NjI5ODIkbzEkZzEkdDE3NjY5NjMwMDIkajQwJGwwJGgw"
  },
]

const UpcomingShowsCarousel = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Upcoming Shows</h2>
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
        {dummyShows.map(show => (
          <SwiperSlide key={show.id}>
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
              <img src={show.image} alt={show.title} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{show.title}</h3>
                <p className="text-gray-600 mb-1">{show.date} at {show.time}</p>
                <p className="text-gray-600 mb-4">{show.venue}</p>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                  Book Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default UpcomingShowsCarousel
