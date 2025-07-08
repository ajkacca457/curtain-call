const newsItems = [
  {
    id: 1,
    title: "New Season Lineup Announced",
    date: "July 6, 2025",
    description: "We're thrilled to unveil our upcoming season filled with fresh productions, beloved classics, and a few surprises!",
  },
  {
    id: 2,
    title: "Backstage Tour Returns",
    date: "July 2, 2025",
    description: "Ever wondered what happens behind the curtains? Book a behind-the-scenes tour and explore the magic up close.",
  },
  {
    id: 3,
    title: "Student Discounts Expanded",
    date: "June 30, 2025",
    description: "We’ve extended student ticket discounts to all weekday performances. Just bring a valid ID!",
  },
  {
    id: 4,
    title: "Now Accepting Group Bookings",
    date: "June 28, 2025",
    description: "Planning a group outing? Enjoy exclusive rates and VIP perks for parties of 10 or more.",
  },
]

const NewsAndAnnouncements = () => {
  return (
    <section className="max-w-[1600px] mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-left">
        📰 News & Announcements
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition"
          >
            <p className="text-sm text-gray-400 mb-2">{item.date}</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default NewsAndAnnouncements
