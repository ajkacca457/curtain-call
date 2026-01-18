import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();

  const dates = useMemo(
    () => Object.keys(dateTime).sort(),
    [dateTime]
  );

  const [selected, setSelected] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  const VISIBLE_COUNT = 3;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(prev + 1, dates.length - VISIBLE_COUNT)
    );
  };

  const handleBooking = () => {
    if (!selected) {
      return toast("please select a date for booking");
    }
    navigate(`/shows/${id}/${selected}`);
  };

  const visibleDates = dates.slice(
    startIndex,
    startIndex + VISIBLE_COUNT
  );

  return (
    <div className="w-full bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-10 rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Select show date
      </h2>

      <div className="flex items-center justify-center gap-6">
        {/* LEFT ARROW */}
        <FaArrowCircleLeft
          size={40}
          onClick={handlePrev}
          className={`cursor-pointer ${
            startIndex === 0
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700"
          }`}
        />

        {/* DATE CARDS */}
        <div className="flex gap-4">
          {visibleDates.map((item) => {
            const isActive = selected === item;

            return (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`px-6 py-6 rounded-xl border-2 transition-all ${
                  isActive
                    ? "bg-amber-400 text-white border-amber-500"
                    : "bg-white/80 text-gray-800 hover:bg-white border-gray-300"
                }`}
              >
                <span className="text-2xl font-bold block">
                  {new Date(item).getDate()}
                </span>
                <span className="text-sm uppercase tracking-wide">
                  {new Date(item).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>
              </button>
            );
          })}
        </div>

        {/* RIGHT ARROW */}
        <FaArrowCircleRight
          size={40}
          onClick={handleNext}
          className={`cursor-pointer ${
            startIndex >= dates.length - VISIBLE_COUNT
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700"
          }`}
        />
      </div>

      {/* BOOK BUTTON */}
      <div className="mt-12 text-center">
        <button
          onClick={handleBooking}
          className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition"
        >
          Book Show
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
