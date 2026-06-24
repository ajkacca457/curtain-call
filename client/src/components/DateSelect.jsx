import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const dates = useMemo(() => Object.keys(dateTime).sort(), [dateTime]);
  const [selected, setSelected] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_COUNT = 3;

  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, dates.length - VISIBLE_COUNT));

  const handleBooking = () => {
    if (!selected) return toast("Please select a date to continue");
    navigate(`/shows/${id}/${selected}`);
  };

  const visibleDates = dates.slice(startIndex, startIndex + VISIBLE_COUNT);

  const getDateParts = (iso) => {
    const [year, month, day] = iso.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return {
      day: day.toString().padStart(2, "0"),
      month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    };
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded-lg px-8 py-10">
      <h2 className="font-serif text-2xl font-semibold text-[#f5f5f5] text-center mb-8">
        Select a Date
      </h2>

      <div className="flex items-center justify-center gap-4">

        {/* Prev arrow */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={`p-2 bg-transparent border-none transition-colors duration-200
            ${startIndex === 0 ? "text-[#333] cursor-not-allowed" : "text-[#d4af37] cursor-pointer hover:text-[#a8892a]"}`}
        >
          <FaChevronLeft size={16} />
        </button>

        {/* Date cards */}
        <div className="flex gap-3">
          {visibleDates.map((item) => {
            const { day, month, weekday } = getDateParts(item);
            const isActive = selected === item;
            return (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`w-24 py-5 px-2 rounded-lg text-center cursor-pointer transition-all duration-200
                  ${isActive
                    ? "border border-[#d4af37] bg-[#d4af37]/10"
                    : "border border-[#333] bg-[#1a1a1a] hover:border-[#555]"
                  }`}
              >
                <span className={`block text-[10px] tracking-widest mb-1 uppercase
                  ${isActive ? "text-[#d4af37]" : "text-[#555]"}`}>
                  {weekday}
                </span>
                <span className={`block font-serif text-4xl font-bold leading-none
                  ${isActive ? "text-[#d4af37]" : "text-[#f5f5f5]"}`}>
                  {day}
                </span>
                <span className={`block text-xs tracking-wide mt-1
                  ${isActive ? "text-[#d4af37]" : "text-[#888]"}`}>
                  {month}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next arrow */}
        <button
          onClick={handleNext}
          disabled={startIndex >= dates.length - VISIBLE_COUNT}
          className={`p-2 bg-transparent border-none transition-colors duration-200
            ${startIndex >= dates.length - VISIBLE_COUNT ? "text-[#333] cursor-not-allowed" : "text-[#d4af37] cursor-pointer hover:text-[#a8892a]"}`}
        >
          <FaChevronRight size={16} />
        </button>
      </div>

      <div className="mt-9 text-center">
        <button
          onClick={handleBooking}
          className="px-12 py-3.5 text-xs uppercase tracking-widest border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-colors duration-200"
        >
          Continue to Seats
        </button>
      </div>
    </div>
  );
};

export default DateSelect;