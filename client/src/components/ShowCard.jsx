import React from 'react'

const ShowCard = ({ show }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition flex flex-col justify-between">
      <img
        src={show.poster_path}
        alt={show.title}
        className="w-full h-72 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{show.title}</h3>
        <div className="text-sm text-gray-500 mb-2">
          {show.genres.slice(0, 2).map((genre, index) => (
            <span key={genre.id}>
              {genre.name}
              {index < show.genres.slice(0, 2).length - 1 && ' • '}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>⭐ {show.vote_average.toFixed(1)}</span>
          <span>{new Date(show.release_date).getFullYear()}</span>
        </div>

        <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition cursor-pointer">
           Buy Tickets
        </button>
        
      </div>
    </div>
  )
}

export default ShowCard
