import HeroImg from '../assets/hero-display.jpg';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-6 pt-6">
      <div
        className="relative min-h-[82vh] rounded-xl overflow-hidden bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url(${HeroImg})` }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/60 to-[#0a0a0a]/10 rounded-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent rounded-xl" />

        {/* Content — pinned to bottom */}
        <div className="relative z-10 pb-14 px-14 max-w-2xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#d4af37]" />
            <span className="text-[#d4af37] text-xs font-medium uppercase tracking-[0.16em]">
              Now Showing
            </span>
          </div>

          {/* Meta */}
          <div className="flex gap-5 mb-4 flex-wrap">
            {["Musical Drama", "2h 30m", "Andrew Lloyd Webber"].map((tag, i) => (
              <span key={i} className="text-[#888] text-xs tracking-wide">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#f5f5f5] leading-tight mb-5">
            Phantom of<br />the Opera
          </h1>

          {/* Description */}
          <p className="text-[#888] text-sm leading-relaxed mb-8 max-w-md">
            A haunting tale of love and mystery beneath the Paris Opera House.
            Iconic music, unforgettable performances — a timeless classic.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap">
            <Link to="/shows">
              <button className="bg-[#d4af37] text-[#0a0a0a] font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:opacity-90 transition-opacity">
                Book Tickets
              </button>
            </Link>
            <button className="border border-[#d4af37] text-[#d4af37] text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;