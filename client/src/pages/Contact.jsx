import React from 'react'

const Contact = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Contact <span className="text-indigo-600">Us</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Have questions or need assistance? Reach out to us and we’ll get back to you as soon as possible.
        </p>
      </header>

      {/* Contact Form */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">
          Get in Touch
        </h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 ring-indigo-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 ring-indigo-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              placeholder="Your message..."
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring-2 ring-indigo-600 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition text-lg font-medium"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Info */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">
          Our Contact Info
        </h2>
        <div className="space-y-4 text-gray-600">
          <p><span className="font-medium text-gray-800">Address:</span> 123 Main Street, City, Country</p>
          <p><span className="font-medium text-gray-800">Email:</span> support@curtainscall.com</p>
          <p><span className="font-medium text-gray-800">Phone:</span> +1 234 567 8900</p>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-l-4 border-indigo-600 pl-4">
          Find Us Here
        </h2>
        <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center text-gray-500">
          Map Placeholder
        </div>
      </section>
    </div>
  )
}

export default Contact
