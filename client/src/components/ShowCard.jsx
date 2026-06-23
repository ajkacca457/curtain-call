import { Link } from 'react-router-dom';

const ShowCard = ({ show }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[#222] bg-[#111] hover:border-[#333] hover:-translate-y-1 transition-all duration-200">
      
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={show?.poster_path}
          alt={show?.title}
          className="w-full h-72 object-cover block hover:scale-105 transition-transform duration-500"
        />
        {/* Rating badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-[#0a0a0a]/80 border border-[#333] rounded px-2 py-1">
          <span className="text-[#d4af37] text-xs">★</span>
          <span className="text-[#f5f5f5] text-xs font-medium">{show?.vote_average?.toFixed(1)}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-serif text-base font-semibold text-[#f5f5f5] mb-2 leading-snug line-clamp-2">
          {show?.title}
        </h3>

        {/* Genres */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {show?.genres?.slice(0, 2).map((genre) => (
            <span key={genre.name} className="text-[10px] uppercase tracking-wider text-[#d4af37] border border-[#a8892a] rounded px-2 py-0.5">
              {genre.name}
            </span>
          ))}
        </div>

        {/* Year */}
        <p className="text-xs text-[#555] mb-4">
          {new Date(show?.release_date).getFullYear()}
        </p>

        {/* CTA */}
        <Link to={`/shows/${show._id}`} className="mt-auto no-underline">
          <button className="w-full py-2.5 text-xs uppercase tracking-widest border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-200">
            Buy Tickets
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShowCard;