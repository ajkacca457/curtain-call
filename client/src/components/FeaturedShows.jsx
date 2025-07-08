import { dummyShowsData } from "../assets/data"
import ShowCard from "./ShowCard"
import { useState } from "react"
const FeaturedShows = () => {
  const [visibleCount, setVisibleCount] = useState(4)

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4)
  }

  const visibleShows = dummyShowsData.slice(0, visibleCount)

  return (
    <section className="max-w-[1600px] mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">🎭 Featured Shows</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {visibleShows.map(show => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>

      {visibleCount < dummyShowsData.length && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 text-sm font-medium bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  )
}

export default FeaturedShows