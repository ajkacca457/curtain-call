import HeroImg from '../assets/hero-display.jpg'
import { useAppContext } from '../context/AppContext'

const Hero = () => {
  const {isAdmin } = useAppContext();

console.log("Is Admin:", isAdmin);
  return (
    <div
      className='relative h-[80vh] bg-cover bg-center bg-no-repeat max-w-[1600px] mx-auto rounded-2xl'
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-70 rounded-2xl'></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-end justify-end h-full p-8'>
        <h4 className='text-purple-300 font-bold text-lg tracking-wider drop-shadow-md mb-4'>
          NOW SHOWING
        </h4>
               {/* Small details */}
        <div className='text-gray-300 text-sm tracking-wide space-x-4 mb-2 drop-shadow-sm text-right'>
          <span className='text-purple-300'>Genre: Musical Drama</span>
          <span className='text-purple-300'>•</span>
          <span className='text-purple-300'>Runtime: 2h 30m</span>
          <span className='text-purple-300'>•</span>
          <span className='text-purple-300'>Writer: Andrew Lloyd Webber</span>
        </div>
        <h1 className='text-purple-400 text-4xl font-semibold tracking-wide drop-shadow-md'>
          Phantom of the Opera
        </h1>
        <p className='mt-4 text-md text-gray-200 max-w-xl drop-shadow-sm text-right'>
          Dive into the hauntingly beautiful tale of love and mystery beneath the Paris Opera House.  
          Featuring iconic music and unforgettable performances, this classic musical continues to captivate audiences worldwide.
        </p>

        <div className='mt-6 flex gap-4'>
          <button className='bg-transparent border border-purple-400 text-purple-400 px-6 py-2 rounded-full text-sm hover:bg-purple-400 hover:text-black transition cursor-pointer'>
            Book Tickets
          </button>
          <button className='bg-transparent border border-purple-400 text-purple-400 px-6 py-2 rounded-full text-sm hover:bg-purple-400 hover:text-black transition cursor-pointer'>
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
