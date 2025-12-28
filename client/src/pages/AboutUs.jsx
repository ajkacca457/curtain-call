import React from 'react'

const AboutUs = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          About Curtains<span className="text-indigo-600">Call</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          CurtainsCall is your seamless platform to discover, book, and enjoy live theater, concerts, and shows.
          We bring the magic of performance arts right to your fingertips.
        </p>
      </header>

      {/* Our Mission */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          At CurtainsCall, our mission is to make live entertainment accessible and enjoyable for everyone.
          We connect audiences with the best shows, streamline the booking experience, and ensure every visit is memorable.
          Our platform empowers theaters and performers to reach wider audiences efficiently.
        </p>
      </section>

      {/* Our Vision */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">
          Our Vision
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          We envision a world where attending live performances is effortless, inspiring, and unforgettable.
          CurtainsCall aims to be the leading booking platform that bridges the gap between audiences and
          the performing arts community worldwide. We aim to revolutionize the way people experience live events.
        </p>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-l-4 border-indigo-600 pl-4">
          Core Values
        </h2>
        <div className="grid sm:grid-cols-2 gap-10 text-gray-700">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">User Experience</h3>
            <p>We prioritize an intuitive, seamless booking journey with fast search, easy checkout, and instant confirmations.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Trust & Security</h3>
            <p>Your data and bookings are protected with the latest security standards. We handle payments and personal information safely.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Accessibility</h3>
            <p>Making theater and live shows available to everyone, anytime, anywhere with simple navigation and clear information.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Support Artists</h3>
            <p>Helping performers reach wider audiences and promoting cultural events to nurture the arts community.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Innovation</h3>
            <p>Continuously improving the platform with modern tools and features to enhance the booking experience.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Customer Delight</h3>
            <p>Ensuring every interaction exceeds expectations, making every show a memorable experience.</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">
          Our Team
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg mb-6">
          CurtainsCall is built by a passionate team of theater enthusiasts, tech innovators, and UX designers.  
          We work together to connect audiences with unforgettable live experiences.
        </p>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded shadow">
            <h3 className="font-semibold text-gray-800 mb-2">Jane Doe</h3>
            <p className="text-gray-600 text-sm">Founder & CEO – Passionate about live performances and tech innovation.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded shadow">
            <h3 className="font-semibold text-gray-800 mb-2">John Smith</h3>
            <p className="text-gray-600 text-sm">CTO – Ensures a seamless and secure booking platform.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Join the CurtainsCall Experience</h2>
        <p className="text-gray-600 mb-6 text-lg">
          Discover upcoming shows, reserve your seats, and enjoy unforgettable moments in live entertainment.
        </p>
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition text-lg font-medium">
          Browse Shows
        </button>
      </section>
    </div>
  )
}

export default AboutUs
