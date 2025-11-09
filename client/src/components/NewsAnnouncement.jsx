import { useState, useEffect } from "react"
import api from "../api/axiosInstance.js"
import {format} from "date-fns"

const NewsAndAnnouncements = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/api/news");
        const {news}= response.data;
        setNewsItems(news);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="max-w-[1600px] mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-left">
        📰 News & Announcements
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsItems.length>0 && newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition"
          >
            <p className="text-sm text-gray-400 mb-2">{format(new Date(item.date), "EEEE, MMMM do, yyyy")}</p>
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
