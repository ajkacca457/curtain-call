import { useState, useEffect } from "react";
import api from "../api/axiosInstance.js";
import { format } from "date-fns";

const NewsAndAnnouncements = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/api/news");
        const { news } = response.data;
        setNewsItems(news);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  if (!newsItems.length) return null;

  return (
    <section className="max-w-[1600px] mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-8 h-0.5 bg-[#d4af37]" />
          <span className="text-xs uppercase tracking-widest text-[#d4af37]">Latest</span>
        </div>
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#f5f5f5]">
          News & Announcements
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {newsItems.map((item) => (
          <div
            key={item._id || item.id}
            className="bg-[#111] border border-[#222] rounded-lg p-6 hover:border-[#333] transition-colors duration-200"
          >
            <p className="text-xs uppercase tracking-wider text-[#d4af37] mb-3">
              {format(new Date(item.date), "MMM d, yyyy")}
            </p>
            <h3 className="font-serif text-lg font-semibold text-[#f5f5f5] mb-2 leading-snug">
              {item.title}
            </h3>
            <p className="text-sm text-[#888] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsAndAnnouncements;