import React from 'react'
import HeroImg from '../assets/hero-display.jpg'

const Hero = () => {
  return (
    <div
      className='relative h-[80vh] bg-cover bg-center bg-no-repeat max-w-[1600px] mx-auto rounded-2xl'
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-20 rounded-2xl'></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-end justify-end h-full p-8'>
        <h4 className='text-gray-300 font-semibold'>Now Showing:</h4>
        <h1 className='text-white text-4xl font-semibold tracking-wide drop-shadow-md'>
          Revontulten Alla
        </h1>
        <p className='mt-4 text-md text-gray-200 max-w-xl drop-shadow-sm text-right'>
          A poetic journey through Lapland’s soul – live music, dance, and light under the northern skies.
        </p>

        <div className='mt-6 flex gap-4'>
          <button className='bg-white text-black px-6 py-2 rounded-full text-sm hover:bg-gray-200 transition'>
            Varaa liput
          </button>
          <button className='bg-transparent border border-white text-white px-6 py-2 rounded-full text-sm hover:bg-white hover:text-black transition'>
            Katso traileri
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
