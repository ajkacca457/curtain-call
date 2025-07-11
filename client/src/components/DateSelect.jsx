import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const DateSelect = ({ dateTime, id }) => {
  const [selected, setSelected] = useState(null);

  const navigate= useNavigate();

  const handleBooking = () => {
    if (!selected) {
        return toast("please select a date for booking");
    } 
    navigate(`/shows/${id}/${selected}`);
  };

  return (
    <div className="h-auto w-full bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 p-10 rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Select show date:</h2>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        <FaArrowCircleLeft size={40} className="text-gray-700 cursor-pointer" />

        <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl">
          {Object.keys(dateTime).map((item) => {
            const isActive = selected === item;

            return (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`px-5 py-6 rounded-xl transition-all duration-200 border-2 cursor-pointer ${
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

        <FaArrowCircleRight size={40} className="text-gray-700 cursor-pointer" />
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleBooking}
          className="px-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition cursor-pointer"
        >
          Book Show
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
